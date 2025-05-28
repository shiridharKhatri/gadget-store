"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  Shield,
  Truck,
  RefreshCw,
  Star,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Music,
  Package,
  Watch,
  HomeIcon,
  Smartphone,
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { products, testimonials } from "../data/data"
import ProductCard from "../components/ProductCard"

// Import CSS
import "../styles/Home.css"
import Newsletter from "../components/Newsletter"
import { Helmet } from "react-helmet"

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const categoriesSliderRef = useRef(null)
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0)
  const [dealTimeLeft, setDealTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 45,
    seconds: 30,
  })

  // Category data
  const categoryItems = [
    {
      id: 1,
      name: "Earbuds",
      description: "Premium wireless audio",
      image: "/category/earbuds.png",
      icon: <Headphones size={20} />,
      slug: "earbuds",
    },
    {
      id: 2,
      name: "Smartwatches",
      description: "Track your fitness & more",
      image: "/category/smartwatch.png",
      icon: <Watch size={20} />,
      slug: "smartwatches",
    },
    {
      id: 3,
      name: "Headphones",
      description: "Immersive sound experience",
      image: "/category/headphone.png",
      icon: <Music size={20} />,
      slug: "headphones",
    },
    {
      id: 4,
      name: "Accessories",
      description: "Essential tech add-ons",
      image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=500&q=60",
      icon: <Package size={20} />,
      slug: "accessories",
    },
    {
      id: 5,
      name: "Smart Home",
      description: "Connected living solutions",
      image: "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?auto=format&fit=crop&w=500&q=60",
      icon: <HomeIcon size={20} />,
      slug: "smart-home",
    },
    {
      id: 6,
      name: "Smartphones",
      description: "Latest mobile technology",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=60",
      icon: <Smartphone size={20} />,
      slug: "smartphones",
    },
  ]

  // Deal countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDealTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              } else {
                // Reset timer when it reaches zero
                days = 2
                hours = 8
                minutes = 45
                seconds = 30
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Categories slider navigation
  const nextCategory = () => {
    if (!categoriesSliderRef.current) return

    const slider = categoriesSliderRef.current
    const slideWidth = slider.querySelector(".category-slide").offsetWidth + 24 // width + gap
    const scrollLeft = slider.scrollLeft
    const visibleWidth = slider.clientWidth
    const scrollWidth = slider.scrollWidth

    if (scrollLeft + visibleWidth >= scrollWidth) {
      // If at the end, scroll to start
      slider.scrollLeft = 0
      setCurrentCategorySlide(0)
    } else {
      slider.scrollLeft += slideWidth
      setCurrentCategorySlide((prev) => (prev < categoryItems.length - 1 ? prev + 1 : prev))
    }
  }

  const prevCategory = () => {
    if (!categoriesSliderRef.current) return

    const slider = categoriesSliderRef.current
    const slideWidth = slider.querySelector(".category-slide").offsetWidth + 24 // width + gap
    const scrollLeft = slider.scrollLeft

    if (scrollLeft <= 0) {
      // If at the start, scroll to end
      slider.scrollLeft = slider.scrollWidth
      setCurrentCategorySlide(categoryItems.length - 1)
    } else {
      slider.scrollLeft -= slideWidth
      setCurrentCategorySlide((prev) => (prev > 0 ? prev - 1 : 0))
    }
  }

  const scrollToCategory = (index) => {
    if (!categoriesSliderRef.current) return

    const slider = categoriesSliderRef.current
    const slideWidth = slider.querySelector(".category-slide").offsetWidth + 24 // width + gap
    slider.scrollLeft = slideWidth * index
    setCurrentCategorySlide(index)
  }

  // GSAP animations
  useEffect(() => {
    if (!titleRef.current) return

    // Animate hero elements
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    )

    gsap.fromTo(
      ".hero-eyebrow, .hero-subtitle, .hero-cta",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
      },
    )

    gsap.fromTo(
      ".hero-stat",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.6,
      },
    )

    gsap.fromTo(
      ".hero-image-wrapper",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      },
    )

    gsap.fromTo(
      ".hero-floating-item",
      { y: 30, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.8,
      },
    )

    // Scroll animations
    const sections = [".categories-section", ".featured-products", ".deals-section", ".testimonials", ".newsletter"]

    sections.forEach((section) => {
      gsap.fromTo(
        `${section} .section-title, ${section} h2`,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      )
    })

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>TechWave - Premium Tech Accessories & Gadgets</title>
        <meta
          name="description"
          content="Discover premium tech accessories and gadgets at TechWave. Shop our collection of headphones, earbuds, smartwatches and more."
        />
        <meta name="keywords" content="tech accessories, headphones, earbuds, smartwatches, tech gadgets" />
        <link rel="canonical" href="https://techwave.com" />
      </Helmet>
      <Navbar position="relative" />
      <div className="top-banner">
        🎧 Limited Time Offer: 20% Off All Audio Products!
        <Link to="/products">Shop now →</Link>
      </div>

      {/* Hero Section - Completely Redesigned */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-bg-pattern"></div>
          <div className="hero-bg-gradient"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">Premium Audio Experience</div>
            <h1 className="hero-title" ref={titleRef}>
              Elevate Your <span>Sound</span> Experience
            </h1>
            <p className="hero-subtitle">
              Discover our collection of premium audio devices designed to transform your listening experience with
              cutting-edge technology and exceptional sound quality.
            </p>
            <div className="hero-cta">
              <Link to="/products" className="btn btn-primary btn-large">
                Shop Collection
              </Link>
              <Link to="/categories/headphones" className="btn btn-outline btn-large">
                Explore Headphones
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">10K+</span>
                <span className="hero-stat-label">Happy Customers</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">500+</span>
                <span className="hero-stat-label">Products</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">4.9</span>
                <span className="hero-stat-label">Average Rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80"
                alt="Premium headphones"
                className="hero-image"
              />
              <div className="hero-image-overlay"></div>
            </div>

            <div className="hero-floating-elements">
              <div className="hero-floating-item">
                <div className="hero-floating-item-icon">
                  <Shield size={20} />
                </div>
                <div className="hero-floating-item-content">
                  <h4>2-Year Warranty</h4>
                  <p>Complete protection</p>
                </div>
              </div>

              <div className="hero-floating-item">
                <div className="hero-floating-item-icon">
                  <Truck size={20} />
                </div>
                <div className="hero-floating-item-content">
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>

              <div className="hero-floating-item">
                <div className="hero-floating-item-icon">
                  <RefreshCw size={20} />
                </div>
                <div className="hero-floating-item-content">
                  <h4>30-Day Returns</h4>
                  <p>Hassle-free policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-header">
            <h2>Browse Categories</h2>
            <p>Explore our wide range of premium tech products</p>
          </div>

          <div className="categories-slider-container">
            <button className="slider-nav-btn prev" onClick={prevCategory}>
              <ChevronLeft size={20} />
            </button>

            <div className="categories-slider" ref={categoriesSliderRef}>
              {categoryItems.map((category) => (
                <Link to={`/categories/${category.slug}`} className="category-slide" key={category.id}>
                  <div className="category-slide-image">
                    <img src={category.image || "/placeholder.svg?height=320&width=280"} alt={category.name} />
                  </div>
                  <div className="category-slide-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <button className="slider-nav-btn next" onClick={nextCategory}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="slider-dots">
            {categoryItems.map((_, index) => (
              <div
                key={index}
                className={`slider-dot ${index === currentCategorySlide ? "active" : ""}`}
                onClick={() => scrollToCategory(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Best Sellers</h2>
          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
          <div className="view-all-btn">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="deals-section">
        <div className="deals-bg">
          <div className="deals-bg-pattern"></div>
        </div>

        <div className="container deals-container">
          <div className="deals-header">
            <h2>Limited Time Offers</h2>
            <p>Exclusive deals on premium tech products. Don't miss out!</p>
          </div>

          <div className="deal-card">
            <div className="deal-content">
              <div className="deal-badge">Flash Sale</div>
              <h2 className="deal-title">SonicWave Pro Earbuds</h2>
              <p className="deal-description">
                Experience premium sound quality with active noise cancellation and 24-hour battery life. Limited stock
                available.
              </p>

              <div className="deal-price">
                <span className="deal-original-price">$149.99</span>
                <span className="deal-sale-price">$119.99</span>
                <span className="deal-discount">20% OFF</span>
              </div>

              <div className="deal-timer">
                <div className="timer-unit">
                  <span className="timer-value">{dealTimeLeft.days}</span>
                  <span className="timer-label">Days</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-value">{String(dealTimeLeft.hours).padStart(2, "0")}</span>
                  <span className="timer-label">Hours</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-value">{String(dealTimeLeft.minutes).padStart(2, "0")}</span>
                  <span className="timer-label">Mins</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-value">{String(dealTimeLeft.seconds).padStart(2, "0")}</span>
                  <span className="timer-label">Secs</span>
                </div>
              </div>

              {/* <Link to="/products/1" className="btn btn-primary">
                Shop Now
              </Link> */}
            </div>
            <div className="deal-image">
              <img
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="SonicWave Pro Earbuds"
              />
            </div>
          </div>

          <div className="deals-navigation">
            <button className="deals-nav-btn">
              <ChevronLeft size={20} />
            </button>
            <button className="deals-nav-btn">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <h2>What Our Customers Say</h2>
            <p>Join thousands of satisfied customers who have enhanced their audio experience with TechWave</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <div className="testimonial-content">
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src={testimonial.image || "/placeholder.svg?height=60&width=60"} alt={testimonial.author} />
                  </div>
                  <div className="testimonial-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Newsletter />

      <Footer />
    </>
  )
}

export default Home
