"use client"

import { useState } from "react"
import { Gift, Bell, Clock, Mail } from "lucide-react"
import "../styles/Newsletter.css"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }

    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setName("")
      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay Connected</h2>
          <p className="newsletter-description">
            Subscribe to receive exclusive offers, new product alerts, and tech tips directly to your inbox.
          </p>

          <div className="newsletter-featuress">
            <div className="newsletter-feature">
              <div className="feature-icon">
                <Gift size={24} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Exclusive Offers</h3>
                <p className="feature-description">Be the first to know about special deals</p>
              </div>
            </div>

            <div className="newsletter-feature">
              <div className="feature-icon">
                <Bell size={24} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">New Arrivals</h3>
                <p className="feature-description">Get notified when new products launch</p>
              </div>
            </div>

            <div className="newsletter-feature">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Flash Sales</h3>
                <p className="feature-description">Never miss limited-time promotions</p>
              </div>
            </div>

            <div className="newsletter-feature">
              <div className="feature-icon">
                <Mail size={24} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Tech Tips</h3>
                <p className="feature-description">Helpful guides to maximize your products</p>
              </div>
            </div>
          </div>
        </div>

        <div className="newsletter-form-container">
          <div className="newsletter-form-wrapper">
            <h3 className="form-title">Join Our Newsletter</h3>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="form-error">{error}</p>}
              {isSuccess && <p className="form-success">Thank you for subscribing!</p>}

              <button type="submit" className="subscribe-button" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </button>

              <p className="privacy-notice">
                By subscribing, you agree to our <a href="/privacy-policy">Privacy Policy</a> and consent to receive
                updates from our company.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

