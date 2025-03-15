"use client";

import { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const footerRef = useRef(null);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <h2>ShopHub</h2>
            <p>
              Your one-stop destination for all your shopping needs. Quality
              products, competitive prices, and exceptional service.
            </p>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li>
                <Link to="/categories/electronics">Electronics</Link>
              </li>
              <li>
                <Link to="/categories/fashion">Fashion</Link>
              </li>
              <li>
                <Link to="/categories/home">Home & Kitchen</Link>
              </li>
              <li>
                <Link to="/categories/beauty">Beauty</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About Us</h4>
            <ul>
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
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
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="first">
            <p>
              &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
          </div>

          <div className="footer-links">
            <Link to="/terms">Terms & Conditions</Link>
            <span>|</span>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
