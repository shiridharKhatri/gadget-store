"use client"

import { useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/Policy.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const TermsAndConditions = () => {
  const contentRef = useRef(null)

  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="page-header">
          <div className="container">
            <h1>Terms and Conditions</h1>
            <p>Last updated: June 1, 2023</p>
          </div>
        </div>

        <div className="container">
          <div className="policy-content" ref={contentRef}>
            <div className="policy-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Manifest & Elevate ("Company", "we", "our", "us"). These Terms and Conditions govern your use
                of our website located at manifestandelevate.com (together or individually "Service") operated by
                Manifest & Elevate.
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                of the terms, then you may not access the Service.
              </p>
            </div>

            <div className="policy-section">
              <h2>2. Purchases</h2>
              <p>
                If you wish to purchase any product made available through the Service ("Purchase"), you may be asked to
                supply certain information relevant to your Purchase including, without limitation, your credit card
                number, the expiration date of your credit card, your billing address, and your shipping information.
              </p>
              <p>
                You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment
                method(s) in connection with any Purchase; and that (ii) the information you supply to us is true,
                correct and complete.
              </p>
              <p>
                The service may employ the use of third-party services for the purpose of facilitating payment and the
                completion of Purchases. By submitting your information, you grant us the right to provide the
                information to these third parties subject to our Privacy Policy.
              </p>
            </div>

            <div className="policy-section">
              <h2>3. Product Descriptions</h2>
              <p>
                We attempt to be as accurate as possible with descriptions of our products. However, we do not warrant
                that product descriptions or other content of the Service is accurate, complete, reliable, current, or
                error-free.
              </p>
              <p>
                The colors you see will depend on your monitor and we cannot guarantee that your monitor's display of
                any color will be accurate.
              </p>
            </div>

            <div className="policy-section">
              <h2>4. Shipping and Delivery</h2>
              <p>
                Shipping and delivery dates are estimates only and cannot be guaranteed. We are not liable for any
                delays in shipments.
              </p>
            </div>

            <div className="policy-section">
              <h2>5. Returns and Refunds</h2>
              <p>
                We offer a 30-day return policy for most items. To be eligible for a return, your item must be unused
                and in the same condition that you received it. It must also be in the original packaging.
              </p>
              <p>
                Several types of goods are exempt from being returned. Perishable goods such as personalized products
                cannot be returned.
              </p>
              <p>
                To complete your return, we require a receipt or proof of purchase. Please do not send your purchase
                back to the manufacturer.
              </p>
            </div>

            <div className="policy-section">
              <h2>6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of Manifest & Elevate and its licensors. The Service is protected by copyright, trademark, and
                other laws of both the United States and foreign countries. Our trademarks and trade dress may not be
                used in connection with any product or service without the prior written consent of Manifest & Elevate.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
                not limited to a breach of the Terms.
              </p>
              <p>If you wish to terminate your account, you may simply discontinue using the Service.</p>
            </div>

            <div className="policy-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                In no event shall Manifest & Elevate, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct
                or content of any third party on the Service; (iii) any content obtained from the Service; and (iv)
                unauthorized access, use or alteration of your transmissions or content, whether based on warranty,
                contract, tort (including negligence) or any other legal theory, whether or not we have been informed of
                the possibility of such damage.
              </p>
            </div>

            <div className="policy-section">
              <h2>9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What
                constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after any revisions become effective, you agree to be bound
                by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the
                Service.
              </p>
            </div>

            <div className="policy-section">
              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please <Link to="/contact">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TermsAndConditions

