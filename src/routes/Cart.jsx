"use client"

import { useRef } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { useCart } from "../context/CartContext"
import "../styles/Cart.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const cartRef = useRef(null)

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    // Animate item removal
    const itemElement = document.querySelector(`[data-product-id="${productId}"]`)

    gsap.to(itemElement, {
      x: -100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        removeFromCart(productId)
      },
    })
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 0 ? 5.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="page-header">
          <div className="container">
            <h1>Your Cart</h1>
            <p>Review your items and proceed to checkout</p>
          </div>
        </div>

        <section className="section">
          <div className="container" ref={cartRef}>
            {cartItems.length > 0 ? (
              <div className="cart-content">
                <div className="cart-items">
                  <div className="cart-header">
                    <div className="cart-header-product">Product</div>
                    <div className="cart-header-price">Price</div>
                    <div className="cart-header-quantity">Quantity</div>
                    <div className="cart-header-total">Total</div>
                    <div className="cart-header-actions"></div>
                  </div>

                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.id} data-product-id={item.id}>
                      <div className="cart-item-product">
                        <div className="cart-item-image">
                          <img
                            src={`${import.meta.env.VITE_HOST}/image/products/${item.image[0]}` || "/placeholder.svg"}
                            alt={item.title}
                          />
                        </div>
                        <div className="cart-item-details">
                          <h3 className="cart-item-title">{item.title}</h3>
                          <div className="cart-item-meta">
                            <span className="cart-item-category">{item.category}</span>
                            {item.selectedColor && <span className="cart-item-color">Color: {item.selectedColor}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="cart-item-price">${(item.salePrice || item.price).toFixed(2)}</div>

                      <div className="cart-item-quantity">
                        <div className="quantity-selector">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="quantity-btn"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                            readOnly
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="quantity-btn"
                            disabled={item.quantity >= 10}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-total">
                        ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </div>

                      <div className="cart-item-actions">
                        <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h2>Order Summary</h2>

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

                  <div className="cart-actions">
                    <Link to="/checkout" className="btn btn-large">
                      Proceed to Checkout
                    </Link>
                    <Link to="/products" className="btn btn-secondary">
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="cart-notes">
                    <p>Shipping costs calculated at checkout</p>
                    <p>Free shipping on orders over $75</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="empty-cart"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="emoty-cart-icon">
                  <lord-icon
                    src="https://cdn.lordicon.com/jprtoagx.json"
                    trigger="hover"
                    colors="primary:#121331,secondary:#8458b3"
                    style={{ width: "90px", height: "90px" }}
                  ></lord-icon>
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <Link
                  to="/products"
                  className="btn btn-large"
                  style={{
                    width: "fit-content",
                    margin: "auto",
                  }}
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Cart

