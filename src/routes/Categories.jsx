"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import "../styles/Categories.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Categories = () => {
  const categoriesRef = useRef(null)

  const categories = [
    {
      id: 1,
      name: "Earbuds",
      description: "Premium wireless earbuds with noise cancellation and crystal-clear sound quality.",
      image: "/category/earbuds.jpg",
      count: "120+ products",
      slug: "earbuds",
      featured: true,
    },
    {
      id: 2,
      name: "Smartwatches",
      description: "Stay connected with stylish smartwatches featuring health tracking and smart notifications.",
      image: "/category/smartwatche.jpg",
      count: "85+ products",
      slug: "smartwatches",
      featured: true,
    },
    {
      id: 3,
      name: "Neckbands",
      description: "Comfortable neckband earphones perfect for workouts and all-day listening.",
      image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=500&q=60",
      count: "65+ products",
      slug: "neckbands",
      featured: true,
    },
    {
      id: 4,
      name: "Speakers",
      description: "Powerful Bluetooth speakers with immersive sound for home and outdoor use.",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=60",
      count: "95+ products",
      slug: "speakers",
      featured: true,
    },
    {
      id: 5,
      name: "Earphones",
      description: "Wired earphones with exceptional sound quality and ergonomic design.",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=60",
      count: "110+ products",
      slug: "earphones",
      featured: true,
    },
    {
      id: 6,
      name: "Power Banks",
      description: "Portable power solutions to keep your devices charged on the go.",
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=500&q=60",
      count: "75+ products",
      slug: "power-banks",
      featured: true,
    },
    {
      id: 7,
      name: "Data Cables",
      description: "Durable and fast charging cables for all your devices and connectivity needs.",
      image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=500&q=60",
      count: "130+ products",
      slug: "data-cables",
    },
    {
      id: 8,
      name: "Charging Adapters",
      description: "Fast charging adapters compatible with multiple devices for efficient power delivery.",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=60",
      count: "90+ products",
      slug: "charging-adapters",
    },
  ]

  // Featured categories (first 6)
  const featuredCategories = categories.filter((category) => category.featured)

  // All categories
  const allCategories = categories

  useEffect(() => {
    // Animation for category cards
    if (categoriesRef.current) {
      gsap.fromTo(
        categoriesRef.current.querySelectorAll(".category-card"),
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
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="categories-page">
        <div className="page-header">
          <div className="container">
            <h1>Shop by Category</h1>
            <p>Browse our wide selection of products across various categories</p>
          </div>
        </div>

        {/* Featured Categories Section */}
        <section className="section featured-categories-section">
          <div className="container">
            <h2 className="section-title">Featured Categories</h2>
            <div className="featured-categories-grid" ref={categoriesRef}>
              {featuredCategories.map((category) => (
                <Link to={`/categories/${category.slug}`} className="category-card" key={category.id}>
                  <div className="category-image">
                    <img src={category.image || "/placeholder.svg"} alt={category.name} />
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Categories Section */}
        <section className="section all-categories-section">
          <div className="container">
            <h2 className="section-title">All Categories</h2>
            <div className="all-categories-grid">
              {allCategories.map((category) => (
                <Link to={`/categories/${category.slug}`} className="category-item" key={category.id}>
                  <div className="category-item-image">
                    <img src={category.image || "/placeholder.svg"} alt={category.name} />
                  </div>
                  <div className="category-item-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="category-item-count">{category.count}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Update the promotion section to match the new tech focus */}
        <section className="section category-promotion">
          <div className="container">
            <div className="promotion-card">
              <div className="promotion-content">
                <h2>New Arrivals in Earbuds</h2>
                <p>
                  Discover our latest noise-cancelling earbuds with premium sound quality and extended battery life.
                </p>
                <Link to="/categories/earbuds" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
              <div className="promotion-image">
                <img
                  src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=60"
                  alt="New Earbuds Collection"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Categories

