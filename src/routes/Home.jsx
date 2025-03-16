"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProductCard from "../components/ProductCard"
import "../styles/Home.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ShoppingBag, Truck, Shield, Clock, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { categories, products } from "../data/data"
import { useProduct } from "../context/ProductContext"
import Loader from "../components/Loader"

const Home = () => {
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const categoriesRef = useRef(null)
  const dealsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const testimonialSliderRef = useRef(null)
  const { fetchProducts } = useProduct()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [dealTimeLeft, setDealTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 45,
    seconds: 30,
  })

  // Dummy products for the product showcase
  const dummyProducts = [
    {
      id: "d1",
      title: "Nike Zoom Overpower",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "d2",
      title: "Clothes",
      price: 80.0,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1005&q=80",
    },
    {
      id: "d3",
      title: "Bag",
      price: 92.0,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    },
    {
      id: "d4",
      title: "T-Shirt",
      price: 80.0,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
  ]

  // Enhanced testimonials with ratings
  const enhancedTestimonials = [
    {
      id: 1,
      author: "Emily Johnson",
      role: "Mindfulness Coach",
      content:
        "I recommend ShopHub to all my clients. The platform is beautifully designed and the customer service is exceptional. I've been using it for over a year now and couldn't be happier!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      author: "David Lee",
      role: "E-commerce Entrepreneur",
      content:
        "The quality of ShopHub's platform is outstanding. Their tools have helped me stay organized and grow my business by 200% in just six months. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      author: "Sarah Williams",
      role: "Retail Store Owner",
      content:
        "ShopHub has transformed my business. The seamless integration between my physical store and online presence has increased my revenue by 45%. The support team is always there when I need them.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 4,
      author: "Michael Chen",
      role: "Digital Marketing Director",
      content:
        "As a marketing professional, I appreciate the analytics and insights ShopHub provides. It's helped us optimize our campaigns and increase conversion rates significantly.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
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

  // Testimonial slider controls
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % enhancedTestimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + enhancedTestimonials.length) % enhancedTestimonials.length)
  }

  useEffect(() => {
    const fetchProd = async () => {
      const products = await fetchProducts("isFeatured")
      if (products?.success) {
        setFeaturedProducts(products.products)
        setLoading(false)
      }
    }
    fetchProd()
  }, [fetchProducts])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })

    heroTl
      .from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      })
      .from(
        ".hero-features-item",
        {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.5",
      )
      .from(
        ".hero-image",
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
        },
        "-=0.5",
      )

    // Parallax effect on product cards
    gsap.to(".product-parallax", {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-products",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      clearInterval(testimonialInterval)
    }
  }, [])

  // Update the hero section to be more professional
  const heroFeatures = [
    {
      icon: <ShoppingBag size={20} />,
      title: "Extensive Selection",
      description: "Over 100,000 quality products",
    },
    {
      icon: <Truck size={20} />,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <Shield size={20} />,
      title: "Secure Shopping",
      description: "100% secure payment processing",
    },
    {
      icon: <Clock size={20} />,
      title: "24/7 Support",
      description: "Expert assistance whenever you need it",
    },
  ]

  // Update the hero section JSX
  return (
    <>
      <Navbar />
      <div className="top-banner">
        🎉 Get a 25% Discount on All Products!
        <Link to="/products">Shop now →</Link>
      </div>

      <main className="home-page">
        <section className="hero" ref={heroRef}>
          <div className="container hero-container">
            <div className="hero-content">
              <div className="hero-badge">#1 ECOMMERCE PLATFORM 2023</div>
              <h1 className="hero-title">Explore, shop, repeat again.</h1>
              <p className="hero-subtitle">
                ShopHub is a driving force behind the dreams of emerging entrepreneurs, a trusted partner for industry
                leaders.
              </p>
              <div className="hero-cta">
                <Link to="/products" className="btn btn-primary btn-large">
                  Start free trial
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-value">$243.89</div>
                  <div className="stat-label">Total Sales</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">50x</div>
                  <div className="stat-label">New customer every week</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">12%</div>
                  <div className="stat-label">Growth vs last year</div>
                </div>
              </div>
            </div>

            <div className="product-showcase">
              <div className="product-grid">
                {dummyProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
                    <div className="product-info">
                      <span className="product-name">{product.title}</span>
                      <span className="product-price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="section featured-categories" ref={categoriesRef}>
          <div className="container">
            <h2 className="section-title text-center">Shop by Category</h2>
            <div className="category-grid">
              {categories.map((category) => (
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

        {/* Featured Products */}
        <section className="section featured-products" ref={featuredRef}>
          <div className="container">
            <h2 className="section-title text-center">Featured Products</h2>
            {!loading && products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            ) : (
              <Loader height={"40vh"} />
            )}
            <div className="text-center mt-5">
              <Link to="/products" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Deals Section */}
        <section className="section deals-section" ref={dealsRef}>
          <div className="container">
            <div className="deals-header">
              <h2>Limited Time Offers</h2>
              <p>Exclusive deals on premium products. Don't miss out!</p>
            </div>

            <div className="deals-slider">
              <div className="deal-card">
                <div className="deal-content">
                  <div className="deal-badge">Summer Collection</div>
                  <h2 className="deal-title">Premium Summer Essentials</h2>
                  <p className="deal-description">
                    Upgrade your summer wardrobe with our exclusive collection. Limited stock available.
                  </p>

                  <div className="deal-price">
                    <span className="deal-original-price">$199.99</span>
                    <span className="deal-sale-price">$129.99</span>
                    <span className="deal-discount">35% OFF</span>
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

                  <Link to="/deals" className="btn btn-large btn-primary">
                    Shop Now
                  </Link>
                </div>
                <div className="deal-image">
                  <img
                    src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=500&q=60"
                    alt="Summer Sale"
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
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="section testimonials" ref={testimonialsRef}>
          <div className="container">
            <div className="testimonials-header">
              <h2>What Our Customers Say</h2>
              <p>Join thousands of satisfied customers who have transformed their businesses with ShopHub</p>
            </div>

            <div className="testimonials-slider-container">
              <div className="testimonials-slider" ref={testimonialSliderRef}>
                <div
                  className="testimonials-slider-content"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {enhancedTestimonials.map((testimonial) => (
                    <div className="testimonial-card" key={testimonial.id}>
                      <div className="testimonial-quote">
                        <Quote size={32} />
                      </div>
                      <div className="testimonial-avatar">
                        <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.author} />
                      </div>
                      <div className="testimonial-content">
                        <p>"{testimonial.content}"</p>
                      </div>
                      <div className="testimonial-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill={i < testimonial.rating ? "#FFB800" : "none"}
                            stroke={i < testimonial.rating ? "#FFB800" : "#D1D5DB"}
                          />
                        ))}
                      </div>
                      <div className="testimonial-author">
                        <span className="author-name">{testimonial.author}</span>
                        <span className="author-role">{testimonial.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="testimonials-navigation">
                <button className="testimonials-nav-btn" onClick={prevTestimonial}>
                  <ChevronLeft size={20} />
                </button>
                <button className="testimonials-nav-btn" onClick={nextTestimonial}>
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="testimonials-dots">
                {enhancedTestimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`testimonials-dot ${index === activeTestimonial ? "active" : ""}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section newsletter">
          <div className="container">
            <div className="newsletter-content">
              <h2>Join Our Community</h2>
              <p>
                Subscribe to receive exclusive offers, new product alerts, and special promotions directly to your
                inbox.
              </p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home

