"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Auth.css"
import "../styles/ResetPassword.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [token, setToken] = useState("")
  const [isValidToken, setIsValidToken] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  const navigate = useNavigate()
  const location = useLocation()
  const { resetPasswordConfirm } = useAuth()

  // Extract token from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tokenFromUrl = queryParams.get("token")
    const emailFromUrl = queryParams.get("email")
    console.log(emailFromUrl)
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
      validateToken(tokenFromUrl)
    } else {
      setMessage({
        type: "error",
        text: "Invalid or missing reset token. Please request a new password reset link.",
      })
    }
  }, [location])

  // Validate token with backend (mock implementation)
  const validateToken = async (tokenValue) => {
    setIsLoading(true)
    try {
      // In a real implementation, you would verify the token with your backend
      // For demo purposes, we'll simulate a valid token
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsValidToken(true)
    } catch (error) {
      setMessage({
        type: "error",
        text: "Invalid or expired token. Please request a new password reset link.",
      })
      setIsValidToken(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Check password strength and criteria
  const checkPasswordStrength = (value) => {
    const criteria = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value),
    }

    setPasswordCriteria(criteria)

    // Calculate strength (0-4)
    const strength = Object.values(criteria).filter(Boolean).length
    setPasswordStrength(strength)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    checkPasswordStrength(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    // Validate passwords
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." })
      return
    }

    if (passwordStrength < 3) {
      setMessage({ type: "error", text: "Please use a stronger password." })
      return
    }

    setIsLoading(true)
    try {
      // Call the resetPasswordConfirm function from AuthContext
      const result = await resetPasswordConfirm(token, password)

      if (result.success) {
        setMessage({
          type: "success",
          text: "Password has been reset successfully! Redirecting to login...",
        })

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      } else {
        throw new Error(result.error || "Failed to reset password")
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="auth-page reset-password-page">
        <div className="auth-container reset-password-container">
          <div className="auth-header">
            <h1>Reset Your Password</h1>
            <p>Please enter your new password below</p>
          </div>

          {message.text && <div className={`auth-message ${message.type}`}>{message.text}</div>}

          {isLoading && !isValidToken ? (
            <div className="auth-loading">
              <div className="spinner"></div>
              <p>Validating your reset link...</p>
            </div>
          ) : !isValidToken ? (
            <div className="invalid-token-message">
              <p>This password reset link is invalid or has expired.</p>
              <button className="btn primary-btn" onClick={() => navigate("/forgot-password")}>
                Request New Link
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="form-control"
                  disabled={isLoading}
                />

                {/* Password strength indicator */}
                {password && (
                  <div className="password-strength-container">
                    <div className="password-strength-meter">
                      <div
                        className={`password-strength-fill strength-${passwordStrength}`}
                        style={{ width: `${passwordStrength * 25}%` }}
                      ></div>
                    </div>
                    <span className="password-strength-text">
                      {passwordStrength === 0 && "Very Weak"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Medium"}
                      {passwordStrength === 3 && "Strong"}
                      {passwordStrength === 4 && "Very Strong"}
                    </span>
                  </div>
                )}

                {/* Password criteria */}
                {password && (
                  <div className="password-criteria">
                    <p>Password must contain:</p>
                    <ul>
                      <li className={passwordCriteria.length ? "met" : ""}>At least 8 characters</li>
                      <li className={passwordCriteria.uppercase ? "met" : ""}>At least one uppercase letter</li>
                      <li className={passwordCriteria.lowercase ? "met" : ""}>At least one lowercase letter</li>
                      <li className={passwordCriteria.number ? "met" : ""}>At least one number</li>
                      <li className={passwordCriteria.special ? "met" : ""}>At least one special character</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="form-control"
                  disabled={isLoading}
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="password-mismatch">Passwords do not match</p>
                )}
              </div>

              <button type="submit" className="btn primary-btn auth-btn" disabled={isLoading || !isValidToken}>
                {isLoading ? (
                  <>
                    <span className="spinner-small"></span>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>
              Remember your password? <a href="/login">Log in</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResetPassword

