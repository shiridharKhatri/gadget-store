"use client"

import { useState, useRef } from "react"
import "../styles/Contact.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PageHeader from "../components/PageHeader"
import { MapPin, Phone, Mail, Globe } from "lucide-react"
import axiosInstance from "../axios/axiosInstance"
import { storeLocations } from "../data/data"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeLocation, setActiveLocation] = useState(0)

  const formRef = useRef(null)
  const infoRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await axiosInstance.post(`${import.meta.env.VITE_HOST}/api/contact/send-message`, formData)

        if (response.status === 200) {
          setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: "",
            })

            setTimeout(() => {
              setSubmitSuccess(false)
            }, 5000)
          }, 1500)
        }
      } catch (error) {
        console.log(error)
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <PageHeader
          title="Contact Us"
          subtitle="We're here to help with any questions about our products or services."
          theme="dark"
          size="medium"
        />

        <section className="section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-container" ref={formRef}>
                <h2 className="section-title">Send Us a Message</h2>

                {submitSuccess && (
                  <div className="success-message contact-success">
                    <p>Thank you for your message! Our support team will get back to you within 24 hours.</p>
                  </div>
                )}

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
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
                    <label htmlFor="email">Your Email</label>
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
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "error" : ""}
                    />
                    {errors.subject && <div className="error-message">{errors.subject}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? "error" : ""}
                    ></textarea>
                    {errors.message && <div className="error-message">{errors.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-large" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-info" ref={infoRef}>
                <h2 className="section-title">Contact Information</h2>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin />
                  </div>
                  <div className="contact-info-content">
                    <h3>Our Headquarters</h3>
                    <p>
                      123 Tech Boulevard
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Phone />
                  </div>
                  <div className="contact-info-content">
                    <h3>Phone Support</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Monday - Friday: 9am - 6pm PST</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Mail />
                  </div>
                  <div className="contact-info-content">
                    <h3>Email Us</h3>
                    <p>support@techwave.com</p>
                    <p>sales@techwave.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Globe />
                  </div>
                  <div className="contact-info-content">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        Twitter
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Locations Section */}
        <section className="section store-locations-section">
          <div className="container">
            <h2 className="section-title text-center">Our Retail Stores</h2>
            <p className="text-center locations-intro">
              Visit one of our retail locations for personalized service and product demonstrations.
            </p>

            <div className="locations-container">
              <div className="locations-list">
                {storeLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`location-item ${activeLocation === index ? "active" : ""}`}
                    onClick={() => setActiveLocation(index)}
                  >
                    <h3>{location.name}</h3>
                    <p>{location.address}</p>
                    <div className="location-details">
                      <span>{location.phone}</span>
                      <span>{location.hours}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="location-map">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673431806897!2d${storeLocations[activeLocation].coordinates.lng}!3d${storeLocations[activeLocation].coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus`}
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section faq-section">
          <div className="container">
            <h2 className="section-title text-center">Frequently Asked Questions</h2>

            <div className="faq-grid">
              <div className="faq-item">
                <h3>What is your warranty policy?</h3>
                <p>
                  All TechWave products come with a standard 1-year warranty against manufacturing defects. Premium
                  products include an extended 2-year warranty.
                </p>
              </div>

              <div className="faq-item">
                <h3>Do you offer international shipping?</h3>
                <p>
                  Yes, we ship worldwide! International shipping rates are calculated at checkout based on your location
                  and selected products.
                </p>
              </div>

              <div className="faq-item">
                <h3>What is your return policy?</h3>
                <p>
                  We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you
                  can return it for a full refund or exchange.
                </p>
              </div>

              <div className="faq-item">
                <h3>Are your products water-resistant?</h3>
                <p>
                  Most of our earbuds and smartwatches are water-resistant with IPX7 rating, making them suitable for
                  workouts and light water exposure. Check individual product specifications for details.
                </p>
              </div>

              <div className="faq-item">
                <h3>How do I pair my earbuds with my device?</h3>
                <p>
                  Our wireless earbuds feature easy pairing. Simply open the charging case near your device with
                  Bluetooth enabled, and follow the on-screen instructions to connect.
                </p>
              </div>

              <div className="faq-item">
                <h3>How long does shipping take?</h3>
                <p>
                  Domestic orders typically arrive within 2-5 business days. International shipping can take 7-14
                  business days depending on your location and customs processing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Contact

