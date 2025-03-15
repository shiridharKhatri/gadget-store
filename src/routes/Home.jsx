"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProductCard from "../components/ProductCard"
import "../styles/Home.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ShoppingBag, Truck, Shield, Clock } from "lucide-react"
import { products, categories, testimonials } from "../data/data"
import { useState } from "react"
import { useProduct } from "../context/ProductContext"
import Loader from "../components/Loader"
import Avatar from "../components/Avatar"

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

  // useEffect(() => {
  //   const fetchProd = async () => {
  //     const products = await fetchProducts("isFeatured")
  //     if (products?.success) {
  //       setFeaturedProducts(products.products)
  //       setLoading(false)
  //     }
  //   }
  //   fetchProd()
  // }, [fetchProducts])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero animations
    // const heroTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: heroRef.current,
    //     start: "top center",
    //     end: "bottom center",
    //     scrub: 1,
    //   },
    // })

    // heroTl
    //   .from(".hero-title span", {
    //     y: 100,
    //     opacity: 0,
    //     duration: 1,
    //     stagger: 0.2,
    //   })
    //   .from(
    //     ".hero-features-item",
    //     {
    //       x: -50,
    //       opacity: 0,
    //       duration: 0.8,
    //       stagger: 0.1,
    //     },
    //     "-=0.5",
    //   )
    //   .from(
    //     ".hero-image",
    //     {
    //       scale: 0.8,
    //       opacity: 0,
    //       duration: 1,
    //     },
    //     "-=0.5",
    //   )

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const heroFeatures = [
    {
      icon: <ShoppingBag size={24} />,
      title: "Wide Selection",
      description: "Over 100,000 products",
    },
    {
      icon: <Truck size={24} />,
      title: "Fast Delivery",
      description: "Free shipping over $50",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Shopping",
      description: "100% secure checkout",
    },
    {
      icon: <Clock size={24} />,
      title: "24/7 Support",
      description: "Round the clock assistance",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="home-page">
        {/* Hero Section */}
        <section className="hero" ref={heroRef}>
          <div className="hero-background">
            <div className="hero-gradient"></div>
            <div className="hero-pattern"></div>
          </div>

          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="gradient-text">Discover</span>
                <span>Amazing Products</span>
                <span>Every Day</span>
              </h1>

              <div className="hero-features">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="hero-features-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-text">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hero-cta">
                <Link to="/products" className="btn btn-primary btn-large">
                  Start Shopping
                </Link>
                <Link to="/categories" className="btn btn-outline btn-large">
                  Browse Categories
                </Link>
              </div>
            </div>

            <div className="hero-products">
              {products.slice(0, 3).map((product, index) => (
                <div key={product.id} className={`product-card product-parallax card-${index + 1}`}>
                  <img src={product.image || "/placeholder.svg"} alt={product.title} />
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="product-price">${product.salePrice || product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
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
              <Link to="/products" className="btn btn-primary" style={{
                width: "fit-content",
                margin: "auto",
              }}>
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <section className="section deals-section" ref={dealsRef}>
          <div className="container">
            <div className="deal-card">
              <div className="deal-content">
                <h2 className="deal-title">Summer Sale</h2>
                <p className="deal-description">Up to 50% off on selected items. Limited time offer!</p>
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
          </div>
        </section>

        {/* Testimonials */}
        <section className="section testimonials" ref={testimonialsRef}>
          <div className="container">
            <h2 className="section-title text-center">What Our Customers Say</h2>

            <div className="testimonials-slider" ref={testimonialSliderRef}>
              <div className="testimonials-slider-content">
                {testimonials.map((testimonial) => (
                  <div className="testimonial-card" key={testimonial.id}>
                    <div className="testimonial-avatar">
                      <Avatar seed={testimonial.author} type="customer" />
                    </div>
                    <div className="testimonial-content">
                      <p>"{testimonial.content}"</p>
                    </div>
                    <div className="testimonial-author">
                      <span className="author-name">{testimonial.author}</span>
                      <span className="author-role">{testimonial.role}</span>
                    </div>
                  </div>
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

