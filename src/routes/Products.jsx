"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { gsap } from "gsap"
import ProductCard from "../components/ProductCard"
import "../styles/Products.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PageHeader from "../components/PageHeader"
import { useProduct } from "../context/ProductContext"
import Loader from "../components/Loader"

const Products = () => {
  const { fetchProducts } = useProduct()
  const location = useLocation()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [sortOption, setSortOption] = useState("default")
  const productsRef = useRef(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const categoryParam = params.get("category")

    if (categoryParam) {
      setActiveCategory(categoryParam)
    } else {
      setActiveCategory("All")
    }
  }, [location.search])

  useEffect(() => {
    let result = [...allProducts]

    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory)
    }

    if (sortOption === "price-asc") {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    setFilteredProducts(result)
  }, [activeCategory, sortOption, allProducts])

  // Animation for category changes
  useEffect(() => {
    if (productsRef.current) {
      gsap.fromTo(
        productsRef.current.querySelectorAll(".product-card"),
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
      )
    }
  }, [filteredProducts])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  useEffect(() => {
    const fetchProd = async () => {
      let products
      if (activeCategory) {
        products = await fetchProducts(activeCategory)
      } else {
        products = await fetchProducts()
      }
      if (products?.success) {
        setAllProducts(products.products)
        setLoading(false)
      }
    }
    fetchProd()
  }, [])

  const categories = ["All", "Earbuds", "Smartwatches", "Headphones", "Accessories", "Smart Home"]

  return (
    <>
      <Navbar />
      <div className="products-page">
        <PageHeader
          title="Shop Our Collection"
          subtitle="Discover premium tech accessories designed to enhance your digital lifestyle."
          theme="dark"
          size="medium"
        />

        <section className="section">
          <div className="container">
            <div className="filters-row">
              <div className="categories-filter">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${activeCategory === category ? "active" : ""}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="sort-filter">
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="default">Default Sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            <div className="products-count">
              <p>Showing {filteredProducts.length} products</p>
            </div>

            {!loading && filteredProducts.length > 0 && (
              <div className="products-grid" ref={productsRef}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            {loading && <Loader />}
            {!loading && filteredProducts.length === 0 && (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Products

