"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create cart context
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Load cart items from localStorage on initialization
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
          setCartItems(JSON.parse(storedCart))
        }
      } catch (err) {
        setError("Failed to load cart data")
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, loading])

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item._id === product._id)

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // If item doesn't exist, add to cart
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  // Update cart item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getItemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

