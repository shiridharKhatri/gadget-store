"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from 'lucide-react'
import "../styles/ThemeToggle.css"

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      // Get theme from localStorage or use system preference
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme
      }

      // Check system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }
    }

    return "light" // Default theme
  })

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme)
    // Save theme to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle
