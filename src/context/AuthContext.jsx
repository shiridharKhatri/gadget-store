"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axiosInstance from "../axios/axiosInstance"
import Cookies from "js-cookie"
// Create auth context
const AuthContext = createContext()

// Mock user data for demonstration
const mockUsers = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St, City, State, 12345",
    phone: "555-123-4567",
  },
]

export const AuthProvider = ({ children }) => {
  const HOST = import.meta.env.VITE_HOST
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = () => {
      const user = Cookies.get("user_access_token")
      if (user) {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const response = await axiosInstance.post(`${HOST}/api/users/login`, {
        email,
        password,
      })

      if (response.data.success) {
        const token = response.data.token
        Cookies.set("user_access_token", token, { expires: 7 })
        window.location.href = "/"
        return { success: true }
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const response = await axiosInstance.post(`${HOST}/api/users/register`, {
        name: userData.name,
        email: userData.email,
        number: userData.phone,
        password: userData.password,
      })
      if (response.data.success) {
        window.location.href = "/login"
        return { success: true }
      }
    } catch (err) {
      setError(err.response.data.message || err.message)
      return {
        success: false,
        error: err.response.data.message || err.message,
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    Cookies.remove("user_access_token")
    window.location.href = "/"
  }

  const updateProfile = async (updatedData, shippingAddress) => {
    setLoading(true)
    setError(null)
    const data = {
      name: updatedData.name,
      gender: updatedData.gender,
      number: updatedData.phone,
      shippingAddress: shippingAddress,
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const response = await axiosInstance.put(`${HOST}/api/users/edit`, data, {
        headers: {
          "auth-token": `${Cookies.get("user_access_token")}`,
        },
      })
      if (response.data.success) {
        return { success: true }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const response = await axiosInstance.post(`${HOST}/api/users/forget-password`, {
        email: email,
      })
      if (response.data.success) {
        return { success: true, message: response.data.message }
      }
    } catch (err) {
      setError(err.response.data.message || err.message)
      return {
        success: false,
        error: err.response.data.message || err.message,
      }
    } finally {
      setLoading(false)
    }
  }

  const resetPasswordConfirm = async (token, newPassword) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, you would send the token and new password to your backend
      // For demo, we'll just simulate a successful password reset

      // Validate token (in a real app, this would be done by your backend)
      if (!token || token !== "valid-token-12345") {
        throw new Error("Invalid or expired token")
      }

      return { success: true, message: "Password has been reset successfully" }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    if (isAuthenticated) {
      try {
        const response = await axiosInstance.post(
          `${HOST}/api/users/fetch`,
          {},
          {
            headers: {
              "auth-token": `${Cookies.get("user_access_token")}`,
            },
          },
        )
        if (response.data.success) {
          setCurrentUser(response.data.user)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [isAuthenticated, fetchUser])

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    resetPasswordConfirm,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

