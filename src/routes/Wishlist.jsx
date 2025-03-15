"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { Heart, ShoppingBag, Trash2, AlertCircle } from "lucide-react"
import "../styles/Wishlist.css"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      clearWishlist()
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar position={"relative"} />
        <div className="wishlist-container loading">
          <div className="wishlist-loading">
            <div className="loading-spinner"></div>
            <p>Loading your wishlist...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar position={"relative"} />
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <div className="wishlist-actions">
            {wishlistItems.length > 0 && (
              <button className="clear-wishlist-btn" onClick={handleClearWishlist}>
                <Trash2 size={16} />
                Clear Wishlist
              </button>
            )}
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">
              <Heart size={64} />
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Add items to your wishlist to save them for later.</p>
            <Link to="/products" className="browse-products-btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-count">
              <span>
                {wishlistItems.length} item
                {wishlistItems.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="wishlist-items">
              {wishlistItems.map((item) => (
                <div className="wishlist-item" key={item.id}>
                  <div className="wishlist-item-image">
                    <img
                      src={`${import.meta.env.VITE_HOST}/image/products/${item.image[0]}` || "/placeholder.svg"}
                      alt={item.title}
                    />
                  </div>
                  <div className="wishlist-item-details">
                    <Link to={`/products/${item.id}`} className="wishlist-item-title">
                      {item.title}
                    </Link>
                    <div className="wishlist-item-category">{item.category}</div>
                    <div className="wishlist-item-price">
                      {item.salePrice ? (
                        <>
                          <span className="price-original">${item.price.toFixed(2)}</span>
                          <span className="price-sale">${item.salePrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    {item.stock <= 0 && (
                      <div className="wishlist-item-stock">
                        <AlertCircle size={14} />
                        <span>Out of stock</span>
                      </div>
                    )}
                  </div>
                  <div className="wishlist-item-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock <= 0}
                    >
                      <ShoppingBag size={16} />
                      <span>Add to Cart</span>
                    </button>
                    <button className="remove-from-wishlist-btn" onClick={() => handleRemoveFromWishlist(item.id)}>
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Wishlist

