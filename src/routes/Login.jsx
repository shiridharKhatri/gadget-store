"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Auth.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState(null)

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const formRef = useRef(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || "/"
      navigate(redirectTo)
    }
  }, [isAuthenticated, navigate, location])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }

    // Clear login error when user makes changes
    if (loginError) {
      setLoginError(null)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const result = await login(formData.email, formData.password)
        console.log(result)
        if (!result.success) {
          setLoginError(result.error || "Invalid email or password")
        }
      } catch (error) {
        console.log(error)
        setLoginError("An error occurred. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-container" ref={formRef}>
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {loginError && <div className="auth-error">{loginError}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="auth-options">
              <div className="remember-me" style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={{
                    width: "auto",
                  }}
                />
                <label
                  htmlFor="rememberMe"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-large auth-btn" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login

