"use client"

import { useState, useRef } from "react"
import "../styles/Contact.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaLocationDot, FaPhone } from "react-icons/fa6"
import { IoMail } from "react-icons/io5"
import { RiGlobalLine } from "react-icons/ri"
import axiosInstance from "../axios/axiosInstance"
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
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="page-header">
          <div className="container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Get in touch with our team.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-container" ref={formRef}>
                <h2 className="section-title">Send Us a Message</h2>

                {submitSuccess && (
                  <div className="success-message contact-success">
                    <p>Thank you for your message! We'll get back to you soon.</p>
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
                    <FaLocationDot />
                  </div>
                  <div className="contact-info-content">
                    <h3>Our Location</h3>
                    <p>
                      123 Creativity Lane
                      <br />
                      Portland, OR 97205
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-info-content">
                    <h3>Phone Number</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Monday - Friday: 9am - 5pm PST</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <IoMail />
                  </div>
                  <div className="contact-info-content">
                    <h3>Email Us</h3>
                    <p>hello@manifestandelevate.com</p>
                    <p>support@manifestandelevate.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <RiGlobalLine />
                  </div>
                  <div className="contact-info-content">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                      <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                        Pinterest
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28882862.44660002!2d61.01423266427311!3d19.7307823656301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2z44Kk44Oz44OJ!5e1!3m2!1sja!2snp!4v1741268430819!5m2!1sja!2snp"
                    width="600"
                    height="450"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
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
                <h3>What are your shipping times?</h3>
                <p>
                  We process orders within 1-2 business days. Standard shipping takes 3-5 business days within the US,
                  and 7-14 business days for international orders.
                </p>
              </div>

              <div className="faq-item">
                <h3>Do you offer international shipping?</h3>
                <p>
                  Yes, we ship worldwide! International shipping rates are calculated at checkout based on your
                  location.
                </p>
              </div>

              <div className="faq-item">
                <h3>What is your return policy?</h3>
                <p>
                  We accept returns within 30 days of delivery for unused items in original packaging. Please contact
                  our support team to initiate a return.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I customize my journal?</h3>
                <p>
                  Yes! We offer personalization options for most of our journals. You can add custom text, choose
                  colors, and more during checkout.
                </p>
              </div>

              <div className="faq-item">
                <h3>Do you offer wholesale options?</h3>
                <p>
                  Yes, we work with retailers and businesses. Please contact our wholesale team at
                  wholesale@manifestandelevate.com for more information.
                </p>
              </div>

              <div className="faq-item">
                <h3>How can I track my order?</h3>
                <p>
                  Once your order ships, you'll receive a tracking number via email. You can also check your order
                  status in your account dashboard.
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

