"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Orders.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Package, Truck, Check, AlertCircle, ChevronDown, ChevronUp, Search } from "lucide-react"

const Orders = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const ordersRef = useRef(null)

  // Sample order data
  const sampleOrders = [
    {
      id: "ORD-7829",
      date: "2023-06-15",
      total: 129.97,
      status: "delivered",
      items: [
        {
          id: "1",
          title: "Wireless Bluetooth Earbuds",
          quantity: 1,
          price: 39.99,
          image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=100&q=60",
        },
        {
          id: "2",
          title: "Smart Fitness Tracker",
          quantity: 1,
          price: 59.99,
          image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=100&q=60",
        },
        {
          id: "3",
          title: "Portable Bluetooth Speaker",
          quantity: 1,
          price: 29.99,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=100&q=60",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      trackingInfo: {
        carrier: "FedEx",
        trackingNumber: "FX7891234567",
        estimatedDelivery: "2023-06-18",
        updates: [
          { date: "2023-06-15", time: "08:30 AM", status: "Order Placed", location: "Online" },
          { date: "2023-06-15", time: "02:45 PM", status: "Order Processed", location: "Warehouse" },
          { date: "2023-06-16", time: "09:15 AM", status: "Shipped", location: "Distribution Center" },
          { date: "2023-06-17", time: "10:30 AM", status: "In Transit", location: "Regional Facility" },
          { date: "2023-06-18", time: "11:45 AM", status: "Delivered", location: "New York, NY" },
        ],
      },
    },
    {
      id: "ORD-6543",
      date: "2023-05-28",
      total: 89.99,
      status: "delivered",
      items: [
        {
          id: "4",
          title: "Ergonomic Office Chair",
          quantity: 1,
          price: 89.99,
          image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=100&q=60",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      trackingInfo: {
        carrier: "UPS",
        trackingNumber: "UPS9876543210",
        estimatedDelivery: "2023-06-02",
        updates: [
          { date: "2023-05-28", time: "10:15 AM", status: "Order Placed", location: "Online" },
          { date: "2023-05-28", time: "04:30 PM", status: "Order Processed", location: "Warehouse" },
          { date: "2023-05-29", time: "11:20 AM", status: "Shipped", location: "Distribution Center" },
          { date: "2023-05-31", time: "09:45 AM", status: "In Transit", location: "Regional Facility" },
          { date: "2023-06-01", time: "02:30 PM", status: "Delivered", location: "New York, NY" },
        ],
      },
    },
    {
      id: "ORD-5421",
      date: "2023-06-10",
      total: 149.99,
      status: "in-transit",
      items: [
        {
          id: "5",
          title: "Professional Blender",
          quantity: 1,
          price: 89.99,
          image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=100&q=60",
        },
        {
          id: "6",
          title: "Stainless Steel Cookware Set",
          quantity: 1,
          price: 59.99,
          image: "https://images.unsplash.com/photo-1584990347449-a43d9a9b7975?auto=format&fit=crop&w=100&q=60",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      trackingInfo: {
        carrier: "USPS",
        trackingNumber: "USPS1234567890",
        estimatedDelivery: "2023-06-15",
        updates: [
          { date: "2023-06-10", time: "09:20 AM", status: "Order Placed", location: "Online" },
          { date: "2023-06-10", time: "03:15 PM", status: "Order Processed", location: "Warehouse" },
          { date: "2023-06-11", time: "10:45 AM", status: "Shipped", location: "Distribution Center" },
          { date: "2023-06-13", time: "08:30 AM", status: "In Transit", location: "Regional Facility" },
        ],
      },
    },
    {
      id: "ORD-4398",
      date: "2023-06-05",
      total: 34.99,
      status: "processing",
      items: [
        {
          id: "7",
          title: "Wireless Charging Pad",
          quantity: 1,
          price: 29.99,
          image: "https://images.unsplash.com/photo-1618577608401-46f4a95e0e4d?auto=format&fit=crop&w=100&q=60",
        },
        {
          id: "8",
          title: "USB-C Charging Cable",
          quantity: 1,
          price: 4.99,
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=100&q=60",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      trackingInfo: {
        carrier: "DHL",
        trackingNumber: "DHL5678901234",
        estimatedDelivery: "2023-06-12",
        updates: [
          { date: "2023-06-05", time: "11:30 AM", status: "Order Placed", location: "Online" },
          { date: "2023-06-05", time: "05:20 PM", status: "Order Processed", location: "Warehouse" },
        ],
      },
    },
  ]

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      try {
        // In a real app, you would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        setOrders(sampleOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  // Filter orders based on search query
  const searchedOrders = filteredOrders.filter((order) => {
    if (!searchQuery) return true
    return (
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Package size={18} className="status-icon processing" />
      case "in-transit":
        return <Truck size={18} className="status-icon in-transit" />
      case "delivered":
        return <Check size={18} className="status-icon delivered" />
      default:
        return <AlertCircle size={18} className="status-icon" />
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="orders-page">
          <div className="container">
            <div className="not-authenticated">
              <h2>Please Sign In</h2>
              <p>You need to be logged in to view your orders.</p>
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="orders-page" ref={ordersRef}>
        <div className="page-header">
          <div className="container">
            <h1>My Orders</h1>
            <p>View and track your order history</p>
          </div>
        </div>

        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : (
            <>
              <div className="orders-controls">
                <div className="orders-tabs">
                  <button
                    className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                    onClick={() => setActiveTab("all")}
                  >
                    All Orders
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "processing" ? "active" : ""}`}
                    onClick={() => setActiveTab("processing")}
                  >
                    Processing
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "in-transit" ? "active" : ""}`}
                    onClick={() => setActiveTab("in-transit")}
                  >
                    In Transit
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "delivered" ? "active" : ""}`}
                    onClick={() => setActiveTab("delivered")}
                  >
                    Delivered
                  </button>
                </div>

                <div className="orders-search">
                  <div className="search-input-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {searchedOrders.length > 0 ? (
                <div className="orders-list">
                  {searchedOrders.map((order) => (
                    <div className="order-card" key={order.id}>
                      <div className="order-header">
                        <div className="order-info">
                          <div className="order-id">Order #{order.id}</div>
                          <div className="order-date">Placed on {formatDate(order.date)}</div>
                        </div>
                        <div className="order-status">
                          {getStatusIcon(order.status)}
                          <span className={`status-text ${order.status}`}>
                            {order.status.replace("-", " ").charAt(0).toUpperCase() +
                              order.status.replace("-", " ").slice(1)}
                          </span>
                        </div>
                        <div className="order-total">
                          <span>Total:</span> ${order.total.toFixed(2)}
                        </div>
                        <button
                          className="toggle-details-btn"
                          onClick={() => toggleOrderDetails(order.id)}
                          aria-label={expandedOrder === order.id ? "Hide order details" : "Show order details"}
                        >
                          {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>

                      {expandedOrder === order.id && (
                        <div className="order-details">
                          <div className="order-items">
                            <h3>Items in Your Order</h3>
                            {order.items.map((item) => (
                              <div className="order-item" key={item.id}>
                                <div className="item-image">
                                  <img src={item.image || "/placeholder.svg"} alt={item.title} />
                                </div>
                                <div className="item-details">
                                  <h4>{item.title}</h4>
                                  <div className="item-meta">
                                    <span className="item-quantity">Qty: {item.quantity}</span>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                  </div>
                                </div>
                                <div className="item-actions">
                                  <Link to={`/products/${item.id}`} className="btn btn-small">
                                    View Product
                                  </Link>
                                  <button className="btn btn-small btn-secondary">Buy Again</button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="order-details-grid">
                            <div className="shipping-info">
                              <h3>Shipping Information</h3>
                              <div className="info-card">
                                <p>
                                  <strong>Shipping Address:</strong>
                                </p>
                                <p>{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.street}</p>
                                <p>
                                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                                  {order.shippingAddress.zipCode}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                              </div>
                            </div>

                            <div className="tracking-info">
                              <h3>Tracking Information</h3>
                              <div className="info-card">
                                <p>
                                  <strong>Carrier:</strong> {order.trackingInfo.carrier}
                                </p>
                                <p>
                                  <strong>Tracking Number:</strong> {order.trackingInfo.trackingNumber}
                                </p>
                                <p>
                                  <strong>Estimated Delivery:</strong>{" "}
                                  {formatDate(order.trackingInfo.estimatedDelivery)}
                                </p>

                                <div className="tracking-timeline">
                                  {order.trackingInfo.updates.map((update, index) => (
                                    <div
                                      className={`timeline-item ${index === order.trackingInfo.updates.length - 1 ? "current" : ""}`}
                                      key={index}
                                    >
                                      <div className="timeline-marker"></div>
                                      <div className="timeline-content">
                                        <div className="update-date">
                                          {update.date} at {update.time}
                                        </div>
                                        <div className="update-status">{update.status}</div>
                                        <div className="update-location">{update.location}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="order-actions">
                            <button className="btn btn-secondary">Contact Support</button>
                            {order.status !== "delivered" && <button className="btn">Track Package</button>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-orders">
                  <h2>No orders found</h2>
                  {searchQuery ? (
                    <p>We couldn't find any orders matching "{searchQuery}".</p>
                  ) : (
                    <p>You haven't placed any orders yet.</p>
                  )}
                  <Link to="/products" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Orders

