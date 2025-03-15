"use client"

import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { Heart } from "lucide-react"
import "../styles/ProductCard.css"
import { FaStar } from "react-icons/fa"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [inWishlist, setInWishlist] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    setInWishlist(isInWishlist(product.id))
  }, [isInWishlist, product.id])

  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current
      const image = card.querySelector(".product-image img")
      const content = card.querySelector(".product-content")
      const button = card.querySelector(".add-to-cart-btn")

      const hoverAnimation = gsap.timeline({ paused: true })

      hoverAnimation
        .to(
          image,
          {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          content,
          {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          button,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )

      // Add event listeners for hover
      card.addEventListener("mouseenter", () => hoverAnimation.play())
      card.addEventListener("mouseleave", () => hoverAnimation.reverse())

      return () => {
        // Clean up event listeners
        card.removeEventListener("mouseenter", () => hoverAnimation.play())
        card.removeEventListener("mouseleave", () => hoverAnimation.reverse())
      }
    }
  }, [])

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product)

    // Create a small animation when adding to cart
    gsap.to(cardRef.current, {
      y: -20,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(cardRef.current, {
          y: 0,
          duration: 0.3,
          ease: "bounce.out",
        })
      },
    })
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWishlist) {
      removeFromWishlist(product.id)
      setInWishlist(false)
    } else {
      addToWishlist(product)
      setInWishlist(true)

      // Create a heart animation when adding to wishlist
      const heartIcon = e.currentTarget.querySelector("svg")
      gsap.fromTo(
        heartIcon,
        { scale: 1 },
        {
          scale: 1.5,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            gsap.to(heartIcon, {
              scale: 1,
              duration: 0.2,
            })
          },
        },
      )
    }
  }

  // Determine image source based on whether it's from API or local data
  const getImageSrc = () => {
    if (product.image && Array.isArray(product.image) && product.image[0]) {
      return `${import.meta.env.VITE_HOST}/image/products/${product.image[0]}`
    } else if (product.image && typeof product.image === "string") {
      return product.image
    } else {
      return "/placeholder.svg?height=300&width=300"
    }
  }

  return (
    <Link to={`/products/${product._id || product.id}`} className="product-card" ref={cardRef}>
      <div className="product-image">
        <img src={getImageSrc() || "/placeholder.svg"} alt={product.title} />
        {product.sale && <span className="product-tag">Sale</span>}
        {product.discount && <span className="product-tag">{product.discount}% Off</span>}
        {product.new && <span className="product-tag new">New</span>}
        <button
          className={`wishlist-btn ${inWishlist ? "in-wishlist" : ""}`}
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-category">{product.category}</div>
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
             <span key={i} className={i < product.rating ? "star filled" : "star"}>
                <FaStar />
              </span>
            ))}
          </div>
          <span className="rating-count">({product.reviews || Math.floor(Math.random() * 100) + 5})</span>
        </div>
        <div className="product-price">
          {product.salePrice ? (
            <>
              <span className="price-original">${product.price.toFixed(2)}</span>
              <span className="price-sale">${product.salePrice.toFixed(2)}</span>
            </>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

export default ProductCard

