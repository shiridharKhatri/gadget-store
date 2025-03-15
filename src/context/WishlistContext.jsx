"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create wishlist context
const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const storedWishlist = localStorage.getItem("wishlist")
        if (storedWishlist) {
          setWishlistItems(JSON.parse(storedWishlist))
        }
      } catch (err) {
        setError("Failed to load wishlist data")
      } finally {
        setLoading(false)
      }
    }

    loadWishlist()
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, loading])

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      // Check if item already exists in wishlist
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // If item exists, don't add it again
        return prevItems
      } else {
        // If item doesn't exist, add to wishlist
        return [...prevItems, product]
      }
    })
  }

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([])
  }

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlistItems.length
  }

  const value = {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

