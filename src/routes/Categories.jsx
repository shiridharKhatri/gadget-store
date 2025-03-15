"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import "../styles/Categories.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Categories = () => {
  const categoriesRef = useRef(null)

  // Sample categories data
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Discover the latest gadgets, smart devices, and tech accessories.",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500&q=60",
      count: "1,200+ products",
      slug: "electronics",
      featured: true,
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothing, footwear, and accessories for all styles and seasons.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=60",
      count: "3,400+ products",
      slug: "fashion",
      featured: true,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Everything you need to make your house a home, from decor to appliances.",
      image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=500&q=60",
      count: "2,100+ products",
      slug: "home",
      featured: true,
    },
    {
      id: 4,
      name: "Beauty",
      description: "Skincare, makeup, and personal care products for your beauty routine.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=60",
      count: "950+ products",
      slug: "beauty",
      featured: true,
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      description: "Gear up for adventures and stay active with our sports equipment.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=60",
      count: "1,800+ products",
      slug: "sports",
      featured: true,
    },
    {
      id: 6,
      name: "Toys & Games",
      description: "Fun for all ages with our selection of toys, games, and entertainment.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=500&q=60",
      count: "750+ products",
      slug: "toys",
      featured: true,
    },
    {
      id: 7,
      name: "Books & Stationery",
      description: "Expand your mind with our collection of books, journals, and stationery.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=500&q=60",
      count: "1,350+ products",
      slug: "books",
    },
    {
      id: 8,
      name: "Health & Wellness",
      description: "Products to support your health journey and wellness goals.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=60",
      count: "890+ products",
      slug: "health",
    },
    {
      id: 9,
      name: "Jewelry & Accessories",
      description: "Elegant jewelry and accessories to complement any outfit.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=60",
      count: "670+ products",
      slug: "jewelry",
    },
    {
      id: 10,
      name: "Automotive",
      description: "Parts, accessories, and tools for your vehicle maintenance needs.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=500&q=60",
      count: "520+ products",
      slug: "automotive",
    },
    {
      id: 11,
      name: "Pet Supplies",
      description: "Everything your furry, feathered, or scaly friends could need.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=60",
      count: "780+ products",
      slug: "pets",
    },
    {
      id: 12,
      name: "Baby & Kids",
      description: "Quality products for babies and children of all ages.",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=60",
      count: "930+ products",
      slug: "baby",
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

        {/* Category Promotion */}
        <section className="section category-promotion">
          <div className="container">
            <div className="promotion-card">
              <div className="promotion-content">
                <h2>New Arrivals in Electronics</h2>
                <p>Discover the latest gadgets and tech accessories that just landed in our store.</p>
                <Link to="/categories/electronics" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
              <div className="promotion-image">
                <img
                  src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=60"
                  alt="New Electronics"
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

