"use client"

import { useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/NotFound.css"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const NotFound = () => {
  const contentRef = useRef(null)

  return (
    <>
      <Navbar />
      <div className="not-found-page">
        <div className="container" ref={contentRef}>
          <div className="not-found-content">
            <h1 className="not-found-title">404</h1>
            <div className="not-found-text">
              <h2>Page Not Found</h2>
              <p>
                The page you are looking for might have been removed, had its name changed, or is temporarily
                unavailable.
              </p>
            </div>
            <div className="not-found-actions">
              <Link to="/" className="btn">
                Return to Home
              </Link>
              <Link to="/products" className="btn btn-secondary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NotFound

