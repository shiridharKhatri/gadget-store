"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Auth.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { isAuthenticated } = useAuth()
  const { resetPassword } = useAuth()
  const formRef = useRef(null)

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError(null)
  }

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        const result = await resetPassword(email)

        if (result.success) {
          setIsSuccess(true)
        } else {
          setError(result.error || "Failed to send reset instructions")
        }
      } catch (err) {
        setError("An error occurred. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || "/"
      navigate(redirectTo)
    }
  }, [isAuthenticated, navigate, location])

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-container" ref={formRef}>
          <div className="auth-header" style={isSuccess ? { display: "none" } : {}}>
            <h1>Reset Password</h1>
            <p>Enter your email to receive password reset instructions</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {isSuccess ? (
            <div className="auth-success">
              <div
                className="success-icon"
                style={{
                  background: "#90ee90",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "55px",
                  width: "55px",
                  borderRadius: "50%",
                  fontSize: "26px",
                  margin: "27px auto",
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  textAlign: "center",
                }}
              >
                Check Your Email
              </h2>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                We've sent password reset instructions to {email}
              </p>
              <p
                className="small"
                style={{
                  textAlign: "center",
                }}
              >
                If you don't see the email, check your spam folder
              </p>
              <div className="auth-footer">
                <p>
                  Return to <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" value={email} onChange={handleChange} className={error ? "error" : ""} />
              </div>

              <button type="submit" className="btn btn-large auth-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Instructions"}
              </button>

              <div className="auth-footer">
                <p>
                  Remember your password? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ForgotPassword

