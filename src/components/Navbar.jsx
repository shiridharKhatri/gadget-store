"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { navigationLinks } from "../data/data"
import "../styles/Navbar.css"
import { Menu, X, ShoppingBag, ChevronDown, User, LogOut, Search, Heart, ShoppingCart } from 'lucide-react'
import Avatar from "./Avatar"
import ThemeToggle from "./ThemeToggle"

const Navbar = ({ position }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")

  const { isAuthenticated, currentUser, logout } = useAuth()
  const { cartItems } = useCart()
  const { getWishlistCount } = useWishlist()
  const location = useLocation()
  const navigate = useNavigate()

  const navbarRef = useRef(null)
  const menuRef = useRef(null)
  const searchInputRef = useRef(null)
  const navbarMainRef = useRef(null)

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const wishlistCount = getWishlistCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${searchVal}`)
  }

  return (
    <header
      className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`}
      ref={navbarMainRef}
      style={{
        position,
      }}
    >
      <nav className="navbar" ref={navbarRef}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">TechWave</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            <ul className="navbar-menu-list">
              {navigationLinks.main.map((link) => (
                <li key={link.path} className="navbar-menu-item">
                  {link.name === "Shop" ? (
                    <div className="dropdown">
                      <Link to={link.path} className={location.pathname.includes(link.path) ? "active" : ""}>
                        {link.name} <ChevronDown size={16} />
                      </Link>
                      <div className="dropdown-menu">
                        {navigationLinks.categories.map((category) => (
                          <Link key={category.path} to={category.path}>
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path} className={location.pathname === link.path ? "active" : ""}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <ThemeToggle />

            <button className="navbar-action-btn" onClick={toggleSearch} aria-label="Search">
              <Search size={20} />
            </button>

            <Link to="/wishlist" className="navbar-action-btn" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </Link>

            <Link to="/cart" className="navbar-action-btn" aria-label="Shopping cart">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="navbar-user">
                <button className="navbar-user-toggle">
                  <Avatar seed={currentUser?.name} />
                </button>
                <div className="navbar-user-menu">
                  <div className="user-menu-header">
                    <Avatar seed={currentUser?.name} />
                    <div className="user-info">
                      <p className="user-name">{currentUser?.name}</p>
                      <p className="user-email">{currentUser?.email}</p>
                    </div>
                  </div>
                  <div className="user-menu-items">
                    <Link to="/profile" className="user-menu-item">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link to="/orders" className="user-menu-item">
                      <ShoppingBag size={16} />
                      <span>Orders</span>
                    </Link>
                    <button onClick={logout} className="user-menu-item logout">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ marginLeft: "1rem" }}>
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`search-container ${searchOpen ? "open" : ""}`}>
          <div className="search-wrapper">
            <form onSubmit={submitSearch}>
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search for products..."
                ref={searchInputRef}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button type="submit" className="search-submit">
                Search
              </button>
            </form>
            <button className="search-close" onClick={toggleSearch}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`} ref={menuRef}>
          <div className="mobile-menu-container">
            <ul className="mobile-menu-list">
              {navigationLinks.main.map((link) => (
                <li key={link.path} className="mobile-menu-item">
                  {link.name === "Shop" ? (
                    <div className="mobile-dropdown">
                      <button className="mobile-dropdown-toggle">
                        {link.name} <ChevronDown size={16} />
                      </button>
                      <div className="mobile-dropdown-menu">
                        {navigationLinks.categories.map((category) => (
                          <Link key={category.path} to={category.path} onClick={() => setIsMenuOpen(false)}>
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={location.pathname === link.path ? "active" : ""}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {!isAuthenticated && (
              <div className="mobile-menu-footer">
                <Link to="/login" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                  Login / Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
