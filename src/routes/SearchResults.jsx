"use client"

import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { Search, Filter, SlidersHorizontal, Grid, List, ArrowUpDown, ShoppingCart } from "lucide-react"
import { FaStar } from "react-icons/fa"
import "../styles/SearchResults.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const sampleProducts = [
  {
    id: "1",
    title: "Gratitude Journal",
    category: "Journals",
    price: 29.99,
    image: "/placeholder.png",
    description:
      "Start your day with gratitude and positivity. This premium journal helps you cultivate a mindset of thankfulness.",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    title: "Daily Reflection Diary",
    category: "Diaries",
    price: 34.99,
    salePrice: 29.99,
    image: "/placeholder.png",
    description: "Reflect on your day and track your personal growth with this beautifully designed diary.",
    rating: 4.6,
    reviews: 98,
    sale: true,
  },
  {
    id: "3",
    title: "Mindfulness Poster",
    category: "Posters",
    price: 19.99,
    image: "/placeholder.png",
    description: "Bring calm and mindfulness to any space with this inspirational poster.",
    rating: 4.9,
    reviews: 56,
  },
  {
    id: "4",
    title: "Dream Journal",
    category: "Journals",
    price: 24.99,
    image: "/placeholder.png",
    description: "Record and interpret your dreams with this specialized journal featuring guided prompts.",
    rating: 4.7,
    reviews: 87,
  },
  {
    id: "5",
    title: "Self-Care Planner",
    category: "Journals",
    price: 32.99,
    image: "/placeholder.png",
    description: "Prioritize your wellbeing with this comprehensive self-care planner and tracker.",
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "6",
    title: "Goal Setting Journal",
    category: "Journals",
    price: 27.99,
    image: "/placeholder.png",
    description: "Set, track, and achieve your goals with this structured goal-setting system.",
    rating: 4.5,
    reviews: 76,
  },
  {
    id: "7",
    title: "Travel Diary",
    category: "Diaries",
    price: 26.99,
    image: "/placeholder.png",
    description: "Document your adventures and preserve your travel memories in this elegant travel diary.",
    rating: 4.6,
    reviews: 63,
  },
  {
    id: "8",
    title: "Inspirational Quote Poster",
    category: "Posters",
    price: 18.99,
    image: "/placeholder.png",
    description: "Start each day inspired with this beautifully designed motivational quote poster.",
    rating: 4.8,
    reviews: 42,
  },
]

// Categories for filtering
const categories = ["All", "Journals", "Diaries", "Posters", "Planners", "Accessories"]

// Price ranges for filtering
const priceRanges = [
  { label: "Under $20", min: 0, max: 20 },
  { label: "$20 - $30", min: 20, max: 30 },
  { label: "$30 - $40", min: 30, max: 40 },
  { label: "Over $40", min: 40, max: Number.POSITIVE_INFINITY },
]

const SearchResults = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [sortOption, setSortOption] = useState("relevance")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [searchQuery, setSearchQuery] = useState(query)

  // Search function
  useEffect(() => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      let filteredResults = [...sampleProducts]

      // Filter by search query
      if (query) {
        filteredResults = filteredResults.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        )
      }

      // Apply category filter
      if (selectedCategory !== "All") {
        filteredResults = filteredResults.filter((product) => product.category === selectedCategory)
      }

      // Apply price range filter
      if (selectedPriceRange) {
        filteredResults = filteredResults.filter((product) => {
          const price = product.salePrice || product.price
          return price >= selectedPriceRange.min && price <= selectedPriceRange.max
        })
      }

      // Apply rating filter
      if (ratingFilter > 0) {
        filteredResults = filteredResults.filter((product) => product.rating >= ratingFilter)
      }

      // Apply sorting
      if (sortOption === "price-asc") {
        filteredResults.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
      } else if (sortOption === "price-desc") {
        filteredResults.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
      } else if (sortOption === "rating") {
        filteredResults.sort((a, b) => b.rating - a.rating)
      } else if (sortOption === "reviews") {
        filteredResults.sort((a, b) => b.reviews - a.reviews)
      }

      setResults(filteredResults)
      setLoading(false)
    }, 800)
  }, [query, selectedCategory, selectedPriceRange, ratingFilter, sortOption])

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("q", searchQuery)
    window.location.search = params.toString()
  }

  // Toggle filters on mobile
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All")
    setSelectedPriceRange(null)
    setRatingFilter(0)
    setSortOption("relevance")
  }

  // Handle add to cart
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product)
    // In a real app, you would dispatch to your cart context/store
  }

  return (
    <>
      <Navbar />
      <div className="search-results-page">
        <div className="search-results-header">
          <div className="container">
            <h1>Search Results</h1>
            <div className="search-query-info">
              {query ? (
                <p>
                  Showing results for <span>"{query}"</span>
                </p>
              ) : (
                <p>Browse all products</p>
              )}
            </div>

            <form onSubmit={handleSearch} className="search-results-form">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Refine your search..."
                  className="search-input"
                />
              </div>
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="container">
          <div className="search-results-content">
            {/* Mobile filters toggle */}
            <div className="mobile-filters-toggle">
              <button onClick={toggleFilters} className="filter-toggle-btn">
                <Filter size={18} />
                Filters
              </button>

              <div className="view-sort-controls">
                <div className="view-mode-toggle">
                  <button
                    className={viewMode === "grid" ? "active" : ""}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={viewMode === "list" ? "active" : ""}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>

                <div className="sort-dropdown">
                  <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                  <ArrowUpDown size={14} className="sort-icon" />
                </div>
              </div>
            </div>

            <div className="search-results-layout">
              {/* Filters sidebar */}
              <aside className={`filters-sidebar ${filtersOpen ? "open" : ""}`}>
                <div className="filters-header">
                  <h2>
                    <SlidersHorizontal size={18} />
                    Filters
                  </h2>
                  <button onClick={resetFilters} className="reset-filters">
                    Reset All
                  </button>
                </div>

                <div className="filter-section">
                  <h3>Categories</h3>
                  <ul className="filter-options">
                    {categories.map((category) => (
                      <li key={category}>
                        <label className="filter-option">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                          />
                          <span>{category}</span>
                          {category !== "All" && (
                            <span className="count">
                              {sampleProducts.filter((p) => p.category === category).length}
                            </span>
                          )}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h3>Price Range</h3>
                  <ul className="filter-options">
                    <li>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPriceRange === null}
                          onChange={() => setSelectedPriceRange(null)}
                        />
                        <span>All Prices</span>
                      </label>
                    </li>
                    {priceRanges.map((range, index) => (
                      <li key={index}>
                        <label className="filter-option">
                          <input
                            type="radio"
                            name="price"
                            checked={selectedPriceRange === range}
                            onChange={() => setSelectedPriceRange(range)}
                          />
                          <span>{range.label}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h3>Rating</h3>
                  <div className="rating-filter">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="filter-option">
                        <input
                          type="radio"
                          name="rating"
                          checked={ratingFilter === rating}
                          onChange={() => setRatingFilter(rating)}
                        />
                        <div className="stars-container">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < rating ? "star filled" : "star"}>
                                <FaStar />
                              </span>
                            ))}
                          </div>
                          <span>& Up</span>
                        </div>
                      </label>
                    ))}
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === 0}
                        onChange={() => setRatingFilter(0)}
                      />
                      <span>All Ratings</span>
                    </label>
                  </div>
                </div>

                <button className="close-filters-btn" onClick={toggleFilters}>
                  Close Filters
                </button>
              </aside>

              {/* Results */}
              <div className="results-container">
                <div className="desktop-controls">
                  <div className="results-count">
                    <p>{results.length} products found</p>
                  </div>

                  <div className="view-sort-controls">
                    <div className="view-mode-toggle">
                      <button
                        className={viewMode === "grid" ? "active" : ""}
                        onClick={() => setViewMode("grid")}
                        aria-label="Grid view"
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        className={viewMode === "list" ? "active" : ""}
                        onClick={() => setViewMode("list")}
                        aria-label="List view"
                      >
                        <List size={18} />
                      </button>
                    </div>

                    <div className="sort-dropdown">
                      <label htmlFor="sort-select">Sort by:</label>
                      <select
                        id="sort-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="sort-select"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="reviews">Most Reviewed</option>
                      </select>
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="loading-results">
                    <div className="search-spinner"></div>
                    <p>Searching for products...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className={`products-grid ${viewMode}`}>
                    {results.map((product) => (
                      <div key={product.id} className="product-card">
                        <Link to={`/products/${product.id}`} className="product-link">
                          <div className="product-image">
                            <img src={product.image || "/placeholder.svg"} alt={product.title} />
                            {product.sale && <span className="sale-badge">Sale</span>}
                          </div>

                          <div className="product-info">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-category">{product.category}</p>

                            {viewMode === "list" && <p className="product-description">{product.description}</p>}

                            <div className="product-rating">
                              <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                                    <FaStar />
                                  </span>
                                ))}
                              </div>
                              <span className="reviews-count">({product.reviews})</span>
                            </div>

                            <div className="product-price">
                              {product.salePrice ? (
                                <>
                                  <span className="original-price">${product.price.toFixed(2)}</span>
                                  <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                                </>
                              ) : (
                                <span>${product.price.toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                        </Link>

                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                          <ShoppingCart size={16} style={{ marginRight: "8px" }} />
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <h2>No products found</h2>
                    <p>
                      We couldn't find any products matching your search criteria. Try adjusting your filters or search
                      for something else.
                    </p>
                    <button onClick={resetFilters} className="reset-search-btn">
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SearchResults

