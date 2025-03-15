"use client"

import { useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/Policy.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const PrivacyPolicy = () => {
  const contentRef = useRef(null)

  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="page-header">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p>Last updated: June 1, 2023</p>
          </div>
        </div>

        <div className="container">
          <div className="policy-content" ref={contentRef}>
            <div className="policy-section">
              <h2>1. Introduction</h2>
              <p>
                At Manifest & Elevate, we respect your privacy and are committed to protecting your personal data. This
                privacy policy will inform you about how we look after your personal data when you visit our website and
                tell you about your privacy rights and how the law protects you.
              </p>
              <p>
                This privacy policy applies to personal data we collect when you use our website, shop with us, or
                interact with us in other ways.
              </p>
            </div>

            <div className="policy-section">
              <h2>2. Information We Collect</h2>
              <p>We collect several types of information from and about users of our website, including:</p>
              <ul>
                <li>
                  Personal identifiers such as name, postal address, email address, telephone number, and payment
                  information
                </li>
                <li>Information about your purchases and order history</li>
                <li>Information about your preferences and interests</li>
                <li>
                  Information about your interactions with our website, including browsing history, search history, and
                  information regarding your interaction with our website
                </li>
                <li>Device and browser information, IP address, and location data</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. How We Collect Your Information</h2>
              <p>We collect information from you in several ways:</p>
              <ul>
                <li>
                  Directly from you when you provide it to us, such as when you create an account, make a purchase, sign
                  up for our newsletter, or contact us
                </li>
                <li>Automatically as you navigate through our website, using cookies and similar technologies</li>
                <li>From third parties, such as our business partners and service providers</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>4. How We Use Your Information</h2>
              <p>We use the information we collect about you for various purposes, including:</p>
              <ul>
                <li>To process and fulfill your orders</li>
                <li>To provide you with information, products, or services that you request from us</li>
                <li>
                  To provide you with email alerts, event registrations, and other notices concerning our products or
                  services
                </li>
                <li>To improve our website, products, and services</li>
                <li>
                  To personalize your website experience and to deliver content and product offerings relevant to your
                  interests
                </li>
                <li>
                  To communicate with you about promotions, upcoming events, and other news about products and services
                </li>
                <li>To protect the security and integrity of our website and business</li>
                <li>
                  To respond to law enforcement requests and as required by applicable law, court order, or governmental
                  regulations
                </li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and to hold certain
                information. Cookies are files with a small amount of data which may include an anonymous unique
                identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>

            <div className="policy-section">
              <h2>6. Sharing Your Information</h2>
              <p>We may disclose your personal information to the following categories of recipients:</p>
              <ul>
                <li>
                  Service providers and business partners who perform services on our behalf, such as payment
                  processing, shipping, and marketing
                </li>
                <li>Professional advisers, including lawyers, bankers, auditors, and insurers</li>
                <li>
                  Government authorities, law enforcement, and other third parties where we believe disclosure is
                  necessary to comply with legal obligations
                </li>
                <li>
                  In connection with, or during negotiations of, any merger, sale of company assets, financing, or
                  acquisition of all or a portion of our business by another company
                </li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>7. Data Security</h2>
              <p>
                We have implemented measures designed to secure your personal information from accidental loss and from
                unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on
                secure servers behind firewalls.
              </p>
              <p>
                The safety and security of your information also depends on you. Where we have given you (or where you
                have chosen) a password for access to certain parts of our website, you are responsible for keeping this
                password confidential.
              </p>
            </div>

            <div className="policy-section">
              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to rectify inaccurate personal information</li>
                <li>The right to request the deletion of your personal information</li>
                <li>The right to restrict the processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to object to the processing of your personal information</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>
            </div>

            <div className="policy-section">
              <h2>9. Changes to Our Privacy Policy</h2>
              <p>
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new
                privacy policy on this page and updating the "Last updated" date at the top of this policy.
              </p>
              <p>
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy
                policy are effective when they are posted on this page.
              </p>
            </div>

            <div className="policy-section">
              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please{" "}
                <Link to="/contact">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy

