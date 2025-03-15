"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Auth.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupError, setSignupError] = useState(null)

  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const formRef = useRef(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

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

    // Clear signup error when user makes changes
    if (signupError) {
      setSignupError(null)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "First name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        const result = await register(formData)

        if (!result.success) {
          setSignupError(result.error || "Failed to create account")
        }
      } catch (error) {
        setSignupError("An error occurred. Please try again.")
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
            <h1>Create an Account</h1>
            <p>Join our community of mindful journalers</p>
          </div>

          {signupError && <div className="auth-error">{signupError}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>

            <div
              className="form-group checkbox-group"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                }}
              >
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={errors.agreeTerms ? "error" : ""}
                />
                <label htmlFor="agreeTerms">
                  I agree to the <Link to="/terms">Terms & Conditions</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
            </div>

            <button type="submit" className="btn btn-large auth-btn" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signup

