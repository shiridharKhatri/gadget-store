"use client"

import { useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/Footer.css"

const Footer = () => {
  const footerRef = useRef(null)

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <h2>TechWave</h2>
            <p>
              Elevate your digital lifestyle with premium tech accessories and wearables. Quality products, innovative
              design, exceptional service.
            </p>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li>
                <Link to="/categories/earbuds">Earbuds</Link>
              </li>
              <li>
                <Link to="/categories/smartwatches">Smartwatches</Link>
              </li>
              <li>
                <Link to="/categories/headphones">Headphones</Link>
              </li>
              <li>
                <Link to="/categories/accessories">Accessories</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns">Returns & Warranty</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/blog">Tech Blog</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul className="footer-social">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest product releases and exclusive offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer-bottom">
          <div className="first">
            <p>&copy; {new Date().getFullYear()} TechWave. All rights reserved.</p>
          </div>

          <div className="footer-links">
            <Link to="/terms">Terms & Conditions</Link>
            <span>|</span>
            <Link to="/privacy">Privacy Policy</Link>
            <span>|</span>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

