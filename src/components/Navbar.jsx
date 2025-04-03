"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { navigationLinks } from "../data/data"
import "../styles/Navbar.css"
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  User,
  LogOut,
  Search,
  Heart,
  ShoppingCart,
  Headphones,
  Watch,
  Smartphone,
  Package,
  HomeIcon,
  Zap,
} from "lucide-react"
import Avatar from "./Avatar"
import ThemeToggle from "./ThemeToggle"

const Navbar = ({ position }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])

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

  // Popular search tags
  const popularSearches = [
    "Wireless Earbuds",
    "Noise Cancelling",
    "Smart Watch",
    "Bluetooth Speaker",
    "Gaming Headset",
    "USB-C Cable",
  ]

  // Quick access categories
  const quickCategories = [
    { name: "Headphones", icon: <Headphones size={18} />, path: "/categories/headphones" },
    { name: "Smartwatches", icon: <Watch size={18} />, path: "/categories/smartwatches" },
    { name: "Earbuds", icon: <Smartphone size={18} />, path: "/categories/earbuds" },
    { name: "Accessories", icon: <Package size={18} />, path: "/categories/accessories" },
    { name: "Smart Home", icon: <HomeIcon size={18} />, path: "/categories/smart-home" },
    { name: "Deals", icon: <Zap size={18} />, path: "/deals" },
  ]

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

  // Handle clicks outside search container
  useEffect(() => {
    const handleSearchClickOutside = (event) => {
      const searchContainer = document.querySelector(".search-container")
      if (
        searchContainer &&
        !searchContainer.contains(event.target) &&
        !event.target.closest(".navbar-action-btn") &&
        searchOpen
      ) {
        setSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleSearchClickOutside)
    return () => document.removeEventListener("mousedown", handleSearchClickOutside)
  }, [searchOpen])

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 5))
    }
  }, [])

  // Enhanced search functionality
  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchVal(value)

    if (value.length > 2) {
      setIsSearching(true)
      // Simulate search results - in a real app, this would be an API call
      setTimeout(() => {
        const filteredProducts = [
          {
            id: 1,
            name: "SonicWave Pro Earbuds",
            description: "Wireless earbuds with noise cancellation",
            price: "$119.99",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=120&q=60",
          },
          {
            id: 2,
            name: "PulseBeats Headphones",
            description: "Over-ear premium headphones",
            price: "$199.99",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=120&q=60",
          },
          {
            id: 3,
            name: "TechFit Smartwatch",
            description: "Fitness tracking smartwatch",
            price: "$149.99",
            image: "https://images.unsplash.com/photo-1544117519-31a4a39819a0?auto=format&fit=crop&w=120&q=60",
          },
        ].filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase()),
        )

        setSearchResults(filteredProducts)
        setIsSearching(false)
      }, 500)
    } else {
      setSearchResults([])
    }
  }

  const submitSearch = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      // Save to recent searches
      const updatedSearches = [searchVal, ...recentSearches.filter((s) => s !== searchVal)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

      navigate(`/search?q=${searchVal}`)
      setSearchOpen(false)
    }
  }

  const handleSearchTagClick = (tag) => {
    setSearchVal(tag)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }

    // Trigger search
    const updatedSearches = [tag, ...recentSearches.filter((s) => s !== tag)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

    navigate(`/search?q=${tag}`)
    setSearchOpen(false)
  }

  const handleResultClick = (productId) => {
    navigate(`/products/${productId}`)
    setSearchOpen(false)
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

        {/* Enhanced Search UI */}
        <div className={`search-container ${searchOpen ? "open" : ""}`}>
          <div className="search-wrapper">
            <div className="search-header">
              <h3 className="search-title">Search Products</h3>
              <button className="search-close" onClick={toggleSearch}>
                <X size={20} />
              </button>
            </div>

            <div className="search-form">
              <form onSubmit={submitSearch}>
                <div className="search-input-wrapper">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search for products..."
                    ref={searchInputRef}
                    value={searchVal}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>

            <div className="search-suggestions">
              {recentSearches.length > 0 && (
                <>
                  <h4 className="search-suggestions-title">Recent Searches</h4>
                  <div className="search-tags">
                    {recentSearches.map((search, index) => (
                      <div key={`recent-${index}`} className="search-tag" onClick={() => handleSearchTagClick(search)}>
                        {search}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h4 className="search-suggestions-title" style={{ marginTop: "1.5rem" }}>
                Popular Searches
              </h4>
              <div className="search-tags">
                {popularSearches.map((tag, index) => (
                  <div key={`popular-${index}`} className="search-tag" onClick={() => handleSearchTagClick(tag)}>
                    {tag}
                  </div>
                ))}
              </div>

              <h4 className="search-suggestions-title" style={{ marginTop: "1.5rem" }}>
                Quick Categories
              </h4>
              <div className="search-tags">
                {quickCategories.map((category, index) => (
                  <Link
                    key={`category-${index}`}
                    to={category.path}
                    className="search-tag"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    onClick={() => setSearchOpen(false)}
                  >
                    {category.icon}
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {searchVal.length > 2 && (
              <div className="search-results">
                {isSearching ? (
                  <div style={{ textAlign: "center", padding: "2rem" }}>Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div key={product.id} className="search-result-item" onClick={() => handleResultClick(product.id)}>
                      <div className="search-result-image">
                        <img src={product.image || "/placeholder.svg?height=80&width=80"} alt={product.name} />
                      </div>
                      <div className="search-result-content">
                        <div className="search-result-title">{product.name}</div>
                        <div className="search-result-description">{product.description}</div>
                        <div className="search-result-price">{product.price}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "2rem" }}>No results found for "{searchVal}"</div>
                )}
              </div>
            )}
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

