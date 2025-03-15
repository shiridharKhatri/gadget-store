"use client"

import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import "../styles/Checkout.css"
import Cookies from "js-cookie"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axiosInstance from "../axios/axiosInstance"

const CheckoutForm = ({
  formData,
  handleChange,
  errors,
  handlePrevStep,
  isProcessing,
  setIsProcessing,
  setStep,
  clearCart,
  total,
  getOrderId,
  cartItemsId,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: formData.cardName,
        email: formData.email,
        phone: formData.number,
        address: {
          line1: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zipCode,
          country: "US",
        },
      },
    })
    if (error) {
      setIsProcessing(false)
      alert(`Payment failed: ${error.message}`)
    } else {
      setTimeout(() => {
        setIsProcessing(false)
        setStep(3)
        clearCart()
      }, 2000)

      try {
        const response = await axiosInstance.post(
          "/api/payment/payment-intent",
          {
            paymentMethodId: paymentMethod.id,
            amount: Math.round(total * 100),
            currency: "usd",
            receipt_email: formData.email,
            description: formData.orderNotes || "No additional notes",
            shipping: formData,
            orderItems: cartItemsId,
          },
          {
            headers: {
              "auth-token": `${Cookies.get("user_access_token")}`,
            },
          },
        )

        if (response.data.success) {
          setStep(3)
          clearCart()
          getOrderId(response.data.order_id)
        }
      } catch (err) {
        alert("There was a problem processing your payment. Please try again.")
      } finally {
        setIsProcessing(false)
      }
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardName">Name on Card</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
          className={errors.cardName ? "error" : ""}
        />
        {errors.cardName && <div className="error-message">{errors.cardName}</div>}
      </div>

      <div className="form-group">
        <label>Card Details</label>
        <div className={`stripe-card-element ${errors.cardElement ? "error" : ""}`}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {errors.cardElement && <div className="error-message">{errors.cardElement}</div>}
      </div>

      <div className="payment-security">
        <div className="security-icon">🔒</div>
        <p>Your payment information is secure. We use industry-standard encryption to protect your data.</p>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>
          Back to Shipping
        </button>
        <button type="submit" className="btn" disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </form>
  )
}

// const loadPayPalScript = () => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src =
//       "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD";
//     script.async = true;
//     script.onload = () => resolve();
//     script.onerror = (err) => reject(err);
//     document.body.appendChild(script);
//   });
// };
// const paypalButton = async () => {
//   try {
//     await loadPayPalScript();
//     window.paypal
//       .Buttons({
//         createOrder: async (data, actions) => {
//           let response = axiosInstance.post(
//             "/api/payment/paypal/create-payment",
//             {
//               amount: 100,
//             }
//           );
//           const paymentData = response.data;
//           return paymentData.id;
//         },
//         onApprove: async (data, actions) => {
//           let response = axiosInstance.post(
//             "/api/payment/paypal/execute-payment",
//             {
//               orderID: data.orderID,
//             }
//           );
//           const paymentData = response.data;
//           console.log("Payment Successful:", paymentData.status);
//           alert("Payment Successful: " + paymentData.status);
//         },
//         onError: (err) => {
//           console.error("PayPal Error:", err);
//           alert("There was an issue with the payment");
//         },
//       })
//       .render("#paypal-button-container");
//   } catch (error) {
//     console.error("Failed to load PayPal script:", error);
//   }
// };

const Checkout = () => {
  const stripePromise = React.useMemo(() => loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY), [])
  const [cartItemsId, setCartItemsId] = useState([])
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
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
    cardName: currentUser?.name || "",
    orderNotes: "",
    saveInfo: true,
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const checkoutRef = useRef(null)
  const summaryRef = useRef(null)

  useEffect(() => {
    if (cartItems.length === 0 && step !== 3) {
      navigate("/cart")
    }
  }, [cartItems.length, navigate, step])

  useEffect(() => {
    const cartItemsIds = []
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        cartItemsIds.push(item._id)
      })
    }
    setCartItemsId(cartItemsIds)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateStep = (stepNumber) => {
    const newErrors = {}

    if (stepNumber === 1) {
      // Validate shipping info
      if (!formData.name.trim()) newErrors.name = "First name is required"
      if (!formData.gender.trim()) newErrors.gender = "Last name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.number.trim()) newErrors.number = "number number is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.state.trim()) newErrors.state = "State is required"
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    } else if (stepNumber === 2) {
      // Validate payment info
      if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const subtotal = getCartTotal()
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  const getOrderId = (id) => {
    setOrderId(id)
  }
  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="page-header">
          <div className="container">
            <h1>Checkout</h1>
            <p>Complete your purchase</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="checkout-steps">
              <div className={`checkout-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
                <div className="step-number">1</div>
                <div className="step-title">Shipping</div>
              </div>
              <div className={`checkout-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
                <div className="step-number">2</div>
                <div className="step-title">Payment</div>
              </div>
              <div className={`checkout-step ${step >= 3 ? "active" : ""}`}>
                <div className="step-number">3</div>
                <div className="step-title">Confirmation</div>
              </div>
            </div>

            <div className="checkout-content" style={step === 3 ? { display: "flex" } : {}}>
              <div className="checkout-form-container" ref={checkoutRef} style={step === 3 ? { width: "100%" } : {}}>
                {step === 1 && (
                  <div className="checkout-shipping">
                    <h2>Shipping Information</h2>
                    <form className="checkout-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">First Name</label>
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
                          <label htmlFor="gender">Last Name</label>
                          <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={errors.gender ? "error" : ""}
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
                          />
                          {errors.number && <div className="error-message">{errors.number}</div>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Street Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={errors.address ? "error" : ""}
                        />
                        {errors.address && <div className="error-message">{errors.address}</div>}
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
                            className={errors.city ? "error" : ""}
                          />
                          {errors.city && <div className="error-message">{errors.city}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="state">State/Province</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={errors.state ? "error" : ""}
                          />
                          {errors.state && <div className="error-message">{errors.state}</div>}
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
                            className={errors.zipCode ? "error" : ""}
                          />
                          {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <select id="country" name="country" value={formData.country} onChange={handleChange}>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="orderNotes">Order Notes (Optional)</label>
                        <textarea
                          id="orderNotes"
                          name="orderNotes"
                          rows="3"
                          value={formData.orderNotes}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="form-group checkbox-group">
                        <input
                          type="checkbox"
                          id="saveInfo"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleChange}
                        />
                        <label htmlFor="saveInfo">Save this information for next time</label>
                      </div>

                      <div className="form-actions">
                        <Link to="/cart" className="btn btn-secondary">
                          Back to Cart
                        </Link>
                        <button type="button" className="btn" onClick={handleNextStep}>
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div className="checkout-payment">
                    <h2>Payment Information</h2>
                    {/* <div id="paypal-button-container" onClick={paypalButton}>
                      <span>
                        <GrPaypal />
                      </span>
                      Pay with paypal
                    </div> */}
                    {/* <div
                      className="option"
                      style={{
                        textAlign: "center",
                        margin: "2rem 0",
                        color: "#666",
                      }}
                    >
                      Or
                    </div> */}
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        formData={formData}
                        handleChange={handleChange}
                        errors={errors}
                        handlePrevStep={handlePrevStep}
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                        setStep={setStep}
                        clearCart={clearCart}
                        total={total}
                        getOrderId={getOrderId}
                        cartItemsId={cartItemsId}
                      />
                    </Elements>
                  </div>
                )}

                {step === 3 && (
                  <div className="checkout-confirmation">
                    <div className="confirmation-icon">✓</div>
                    <h2>Order Confirmed!</h2>
                    <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                    <p>
                      Order number: <strong>{orderId}</strong>
                    </p>
                    <p>You will receive a confirmation email shortly with your order details.</p>
                    <div className="confirmation-actions">
                      <Link to="/" className="btn">
                        Return to Home
                      </Link>
                      <Link to="/products" className="btn btn-secondary">
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {step !== 3 && (
                <div className="checkout-summary" ref={summaryRef}>
                  <h2>Order Summary</h2>

                  <div className="summary-items">
                    {cartItems.map((item) => (
                      <div className="summary-item" key={item.id}>
                        <div className="summary-item-image">
                          <img
                            src={`${import.meta.env.VITE_HOST}/image/products/${item.image[0]}` || "/placeholder.png"}
                            alt={item.title}
                          />
                          <span className="summary-item-quantity">{item.quantity}</span>
                        </div>
                        <div className="summary-item-details">
                          <h3>{item.title}</h3>
                          {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                        </div>
                        <div className="summary-item-price">
                          ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="summary-totals">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="summary-row total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="summary-notes">
                    <p>Shipping costs calculated at checkout</p>
                    <p>Free shipping on orders over $75</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Checkout

