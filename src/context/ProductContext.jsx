"use client"

import { createContext, useContext } from "react"
import axiosInstance from "../axios/axiosInstance"
import Cookies from "js-cookie"
const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
  const HOST = import.meta.env.VITE_HOST
  const fetchProducts = async (query, id = "all") => {
    try {
      let response
      if (id && query === "single") {
        response = await axiosInstance.get(`${HOST}/api/products/get-products/${id}`)
      } else if (query === "All") {
        response = await axiosInstance.get(`${HOST}/api/products/get-products`)
      } else if (query === "isFeatured") {
        response = await axiosInstance.get(`${HOST}/api/products/get-products?featured=true`)
      } else {
        response = await axiosInstance.get(`${HOST}/api/products/get-products?q=${query}`)
      }
      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchReviews = async (id) => {
    try {
      const response = await axiosInstance.get(`${HOST}/api/products/get-reviews/${id}`)
      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const postReview = async (id, data) => {
    try {
      const response = await axiosInstance.post(`${HOST}/api/products/review-product/${id}`, data, {
        headers: {
          "auth-token": Cookies.get("user_access_token"),
        },
      })
      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const value = { fetchProducts, fetchReviews, postReview }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProduct must be used within a ProductContext")
  }
  return context
}

