"use client"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/UserProfile.css"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const UserProfile = () => {
  const { currentUser, updateProfile, logout } = useAuth()

  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    gender: currentUser?.gender || "",
    email: currentUser?.email || "",
    number: currentUser?.number || "",
    address: currentUser?.shippingAddress?.street || "",
    city: currentUser?.shippingAddress?.city || "",
    state: currentUser?.shippingAddress?.state || "",
    zipCode: currentUser?.shippingAddress?.zipCode || "",
    country: currentUser?.shippingAddress?.country || "",
  })
  const shippingAddress = {
    street: formData.address,
    city: formData.city,
    state: formData.state,
    zipCode: formData.zipCode,
    country: formData.country,
  }
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showTrackingInfo, setShowTrackingInfo] = useState(false)

  const profileRef = useRef(null)

  const orderHistory = [
    {
      id: "ORD-1234",
      date: "2023-05-15",
      total: 79.97,
      status: "Delivered",
      items: [
        { id: "1", title: "Gratitude Journal", quantity: 1, price: 29.99 },
        { id: "3", title: "Mindfulness Poster", quantity: 2, price: 19.99 },
      ],
    },
    {
      id: "ORD-1189",
      date: "2023-04-02",
      total: 34.99,
      status: "Delivered",
      items: [{ id: "2", title: "Daily Reflection Diary", quantity: 1, price: 34.99 }],
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }

    if (updateSuccess) {
      setUpdateSuccess(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "First name is required"
    if (!formData.gender.trim()) newErrors.gender = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.number.trim()) newErrors.number = "number number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        const result = await updateProfile(formData, shippingAddress)

        if (result.success) {
          setUpdateSuccess(true)

          // Scroll to top to show success message
          window.scrollTo(0, 0)
        }
      } catch (error) {
        console.error("Error updating profile:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
    setShowTrackingInfo(false)
  }

  const handleTrackOrder = (order) => {
    setSelectedOrder(order)
    setShowTrackingInfo(true)
    setShowOrderDetails(false)
  }

  const closeModal = () => {
    setShowOrderDetails(false)
    setShowTrackingInfo(false)
  }

  return (
    <>
      <Navbar />
      <div className="profile-page" ref={profileRef}>
        <div className="page-header">
          <div className="container">
            <div className="profile-header">
              <h1>My Account</h1>
              <button onClick={logout} className="btn btn-secondary">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="profile-tabs">
            <button
              className={`profile-tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`profile-tab ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </button>
          </div>

          <div className="profile-content">
            {activeTab === "profile" && (
              <div className="profile-info">
                {updateSuccess && (
                  <div className="success-message profile-success">Your profile has been updated successfully.</div>
                )}

                <form className="profile-form" onSubmit={handleSubmit}>
                  <h2>Personal Information</h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "error" : ""}
                        placeholder="Enter name"
                      />
                      {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={errors.gender ? "error" : ""}
                        placeholder="Enter your gender"
                      />
                      {errors.gender && <div className="error-message">{errors.gender}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "error" : ""}
                        placeholder="example@gmail.com"
                        disabled
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          cursor: "not-allowed",
                        }}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="number">number Number</label>
                      <input
                        type="tel"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className={errors.number ? "error" : ""}
                        placeholder="123-456-7890"
                      />
                      {errors.number && <div className="error-message">{errors.number}</div>}
                    </div>
                  </div>

                  <h2>Address Information</h2>

                  <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">State/Province</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP/Postal Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="12345"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <select id="country" name="country" value={formData.country} onChange={handleChange}>
                        <option value="United States">United States</option>
                        <option value="Canada">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="order-history">
                <h2>Order History</h2>

                {orderHistory.length > 0 ? (
                  <div className="orders-list">
                    {orderHistory.map((order) => (
                      <div className="order-card" key={order.id}>
                        <div className="order-header">
                          <div className="order-info">
                            <div className="order-id">Order #{order.id}</div>
                            <div className="order-date">Placed on {order.date}</div>
                          </div>
                          <div className="order-status">{order.status}</div>
                        </div>

                        <div className="order-items">
                          {order.items.map((item) => (
                            <div className="order-item" key={item.id}>
                              <div className="item-name">{item.title}</div>
                              <div className="item-quantity">Qty: {item.quantity}</div>
                              <div className="item-price">${item.price.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>

                        <div className="order-footer">
                          <div className="order-total">Total: ${order.total.toFixed(2)}</div>
                          <div className="order-actions">
                            <button className="btn btn-small" onClick={() => handleViewDetails(order)}>
                              View Details
                            </button>
                            <button className="btn btn-small btn-secondary" onClick={() => handleTrackOrder(order)}>
                              Track Order
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-orders">
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/products" className="btn">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {showOrderDetails && selectedOrder && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Order Details</h3>
                <button className="modal-close" onClick={closeModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="order-details">
                  <div className="order-detail-row">
                    <span>Order Number:</span>
                    <span>{selectedOrder.id}</span>
                  </div>
                  <div className="order-detail-row">
                    <span>Order Date:</span>
                    <span>{selectedOrder.date}</span>
                  </div>
                  <div className="order-detail-row">
                    <span>Status:</span>
                    <span className="status-badge">{selectedOrder.status}</span>
                  </div>
                  <div className="order-detail-row">
                    <span>Shipping Address:</span>
                    <span>123 Main St, Anytown, USA 12345</span>
                  </div>
                  <div className="order-detail-row">
                    <span>Payment Method:</span>
                    <span>Credit Card ending in 1234</span>
                  </div>
                </div>

                <h4>Items</h4>
                <div className="order-detail-items">
                  {selectedOrder.items.map((item) => (
                    <div className="order-detail-item" key={item.id}>
                      <div className="item-info">
                        <h5>{item.title}</h5>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>$5.99</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>${(selectedOrder.total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${(selectedOrder.total + 5.99 + selectedOrder.total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showTrackingInfo && selectedOrder && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Track Order</h3>
                <button className="modal-close" onClick={closeModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="tracking-info">
                  <div className="tracking-header">
                    <div>
                      <h4>Order #{selectedOrder.id}</h4>
                      <p>
                        Estimated Delivery:{" "}
                        {new Date(
                          new Date(selectedOrder.date).getTime() + 7 * 24 * 60 * 60 * 1000,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="tracking-number">
                      <span>Tracking Number:</span>
                      <span>
                        TRK
                        {Math.floor(Math.random() * 10000000)
                          .toString()
                          .padStart(7, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="tracking-timeline">
                    <div className="timeline-item completed">
                      <div className="timeline-icon">✓</div>
                      <div className="timeline-content">
                        <h5>Order Placed</h5>
                        <p>{selectedOrder.date}</p>
                      </div>
                    </div>
                    <div className="timeline-item completed">
                      <div className="timeline-icon">✓</div>
                      <div className="timeline-content">
                        <h5>Order Processed</h5>
                        <p>
                          {new Date(
                            new Date(selectedOrder.date).getTime() + 1 * 24 * 60 * 60 * 1000,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item completed">
                      <div className="timeline-icon">✓</div>
                      <div className="timeline-content">
                        <h5>Shipped</h5>
                        <p>
                          {new Date(
                            new Date(selectedOrder.date).getTime() + 2 * 24 * 60 * 60 * 1000,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item active">
                      <div className="timeline-icon">•</div>
                      <div className="timeline-content">
                        <h5>In Transit</h5>
                        <p>Your package is on its way</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-icon">•</div>
                      <div className="timeline-content">
                        <h5>Delivered</h5>
                        <p>
                          Estimated:{" "}
                          {new Date(
                            new Date(selectedOrder.date).getTime() + 7 * 24 * 60 * 60 * 1000,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default UserProfile

