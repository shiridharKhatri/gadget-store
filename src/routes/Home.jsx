"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Headphones, Sparkles, ChevronLeft, ChevronRight, Star, Shield, Truck, RefreshCw, Volume2 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { categories, products, testimonials } from "../data/data"
import ProductCard from "../components/ProductCard"

// Import CSS
import "../styles/Home.css"

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const visualRef = useRef(null)
  const testimonialsRef = useRef(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particlesRef = useRef([])
  const requestRef = useRef()
  const previousTimeRef = useRef()
  const [dealTimeLeft, setDealTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 45,
    seconds: 30,
  })

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

  // Create particles for hero section
  useEffect(() => {
    if (!heroRef.current) return

    // Create particles
    const particles = []
    const colors = ["#FF3E88", "#5b3dfc", "#00F2EA", "#FF7A00"]
    const particleCount = 40

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 6 + 2
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const color = colors[Math.floor(Math.random() * colors.length)]
      const speedX = (Math.random() - 0.5) * 0.5
      const speedY = (Math.random() - 0.5) * 0.5

      particles.push({ x, y, size, color, speedX, speedY })
    }

    particlesRef.current = particles

    // Animation loop for particles
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        particlesRef.current = particlesRef.current.map((particle) => {
          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Bounce off edges
          if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.speedX *= -1
          }

          if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.speedY *= -1
          }

          return particle
        })

        // Render particles
        renderParticles()
      }

      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    const renderParticles = () => {
      const heroElement = heroRef.current
      if (!heroElement) return

      // Clear existing particles
      const particlesContainer = heroElement.querySelector(".hero-particles")
      if (particlesContainer) {
        particlesContainer.innerHTML = ""

        // Create new particles
        particlesRef.current.forEach((particle) => {
          const particleElement = document.createElement("div")
          particleElement.className = "hero-particle"
          particleElement.style.width = `${particle.size}px`
          particleElement.style.height = `${particle.size}px`
          particleElement.style.backgroundColor = particle.color
          particleElement.style.left = `${particle.x}px`
          particleElement.style.top = `${particle.y}px`
          particleElement.style.opacity = "0.6"

          particlesContainer.appendChild(particleElement)
        })
      }
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  // GSAP animations
  useEffect(() => {
    if (!titleRef.current || !visualRef.current) return

    // Split text animation
    const titleElement = titleRef.current
    const titleText = titleElement.textContent
    titleElement.innerHTML = ""

    titleText.split(" ").forEach((word, index) => {
      const wordSpan = document.createElement("span")
      wordSpan.className = "hero-title-word"
      wordSpan.textContent = (index > 0 ? " " : "") + word
      titleElement.appendChild(wordSpan)
    })

    // Animate title words
    gsap.fromTo(
      ".hero-title-word",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      },
    )

    // Animate hero content
    gsap.fromTo(
      ".hero-badge, .hero-subtitle, .hero-cta, .hero-features",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.5,
      },
    )

    // Animate visual elements
    gsap.fromTo(
      ".hero-visual-element, .hero-product",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        delay: 0.7,
      },
    )

    // Continuous animations for visual elements
    gsap.to(".visual-circle-1", {
      scale: 1.1,
      opacity: 0.15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(".visual-circle-2", {
      scale: 1.15,
      opacity: 0.2,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3,
    })

    gsap.to(".visual-circle-3", {
      scale: 1.2,
      opacity: 0.25,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.6,
    })

    // Scroll animations
    const sections = [
      ".featured-categories",
      ".featured-products",
      ".deals-section",
      ".testimonials",
      ".features-section",
      ".newsletter",
    ]

    sections.forEach((section) => {
      gsap.fromTo(
        `${section} .section-title`,
        { y: 50, opacity: 0 },
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

  // Mouse move effect for hero
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width
      const y = (clientY - top) / height

      setMousePosition({ x, y })

      // Move visual elements based on mouse position
      if (visualRef.current) {
        const moveX = (x - 0.5) * 30
        const moveY = (y - 0.5) * 30

        gsap.to(".visual-circle-1", {
          x: moveX * 0.5,
          y: moveY * 0.5,
          duration: 1,
          ease: "power2.out",
        })

        gsap.to(".visual-circle-2", {
          x: moveX * 0.3,
          y: moveY * 0.3,
          duration: 1,
          ease: "power2.out",
        })

        gsap.to(".visual-circle-3", {
          x: moveX * 0.1,
          y: moveY * 0.1,
          duration: 1,
          ease: "power2.out",
        })

        gsap.to(".hero-product img", {
          x: moveX * 0.8,
          y: moveY * 0.8,
          rotationY: moveX * 5,
          rotationX: -moveY * 5,
          duration: 1,
          ease: "power2.out",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Testimonials slider
  useEffect(() => {
    if (!testimonialsRef.current) return

    const positionTestimonials = () => {
      const cards = testimonialsRef.current.querySelectorAll(".testimonial-card")
      const centerIndex = activeTestimonial

      cards.forEach((card, index) => {
        let xPosition = 0
        let scale = 0.8
        let zIndex = 0
        let opacity = 0.5

        if (index === centerIndex) {
          // Center card
          xPosition = 0
          scale = 1
          zIndex = 3
          opacity = 1
        } else if (index < centerIndex) {
          // Cards to the left
          xPosition = -300 - (centerIndex - index - 1) * 60
          scale = 0.8 - (centerIndex - index) * 0.05
          zIndex = 2
          opacity = 0.7
        } else {
          // Cards to the right
          xPosition = 300 + (index - centerIndex - 1) * 60
          scale = 0.8 - (index - centerIndex) * 0.05
          zIndex = 2
          opacity = 0.7
        }

        gsap.to(card, {
          x: xPosition,
          scale: scale,
          zIndex: zIndex,
          opacity: opacity,
          duration: 0.5,
          ease: "power2.out",
        })
      })
    }

    positionTestimonials()
  }, [activeTestimonial])

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToTestimonial = (index) => {
    setActiveTestimonial(index)
  }

  return (
    <>
      <Navbar position="absolute" />
      <div className="top-banner">
        🎧 Limited Time Offer: 20% Off All Audio Products!
        <Link to="/products">Shop now →</Link>
      </div>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-backdrop"></div>
        <div className="hero-particles"></div>
        <div className="hero-glow"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">Premium Audio Experience</div>
            <h1 className="hero-title" ref={titleRef}>
              Elevate Your Sound Experience
            </h1>
            <p className="hero-subtitle">
              Discover our collection of premium audio devices designed to transform your listening experience with
              cutting-edge technology and exceptional sound quality.
            </p>
            <div className="hero-cta">
              <Link to="/products" className="btn-primary btn-large">
                Shop Collection
              </Link>
              <Link to="/categories/headphones" className="btn-outline btn-large">
                Explore Headphones
              </Link>
            </div>
            <div className="hero-features">
              <div className="hero-features-item">
                <div className="hero-feature-icon">
                  <Volume2 size={20} />
                </div>
                <div className="hero-feature-text">
                  <h3>Hi-Fi Audio</h3>
                  <p>Studio-quality sound</p>
                </div>
              </div>
              <div className="hero-features-item">
                <div className="hero-feature-icon">
                  <Shield size={20} />
                </div>
                <div className="hero-feature-text">
                  <h3>2-Year Warranty</h3>
                  <p>Complete protection</p>
                </div>
              </div>
              <div className="hero-features-item">
                <div className="hero-feature-icon">
                  <Truck size={20} />
                </div>
                <div className="hero-feature-text">
                  <h3>Free Shipping</h3>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className="hero-features-item">
                <div className="hero-feature-icon">
                  <RefreshCw size={20} />
                </div>
                <div className="hero-feature-text">
                  <h3>30-Day Returns</h3>
                  <p>Hassle-free policy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-visual" ref={visualRef}>
            <div className="hero-visual-element visual-circle-1"></div>
            <div className="hero-visual-element visual-circle-2"></div>
            <div className="hero-visual-element visual-circle-3"></div>
            <div className="hero-product floating">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                alt="Premium Headphones"
              />
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow"></div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2 className="section-title text-center">Browse Categories</h2>
          <div className="category-grid">
            {categories
              .filter((cat) => cat.featured)
              .slice(0, 3)
              .map((category) => (
                <Link to={`/categories/${category.slug}`} className="category-card" key={category.id}>
                  <div className="category-image">
                    <img src={category.image || "/placeholder.svg?height=250&width=350"} alt={category.name} />
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.count} products</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title text-center">Best Sellers</h2>
          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="deals-section">
        <div className="container">
          <div className="deals-header">
            <h2>Limited Time Offers</h2>
            <p>Exclusive deals on premium tech products. Don't miss out!</p>
          </div>
          <div className="deals-slider">
            <div className="deal-card">
              <div className="deal-content">
                <div className="deal-badge">Flash Sale</div>
                <h2 className="deal-title">SonicWave Pro Earbuds</h2>
                <p className="deal-description">
                  Experience premium sound quality with active noise cancellation and 24-hour battery life. Limited
                  stock available.
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

                <Link to="/products/1" className="btn-primary">
                  Shop Now
                </Link>
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" ref={testimonialsRef}>
        <div className="container">
          <div className="testimonials-header">
            <h2>What Our Customers Say</h2>
            <p>Join thousands of satisfied customers who have enhanced their audio experience with TechWave</p>
          </div>
          <div className="testimonials-slider-container">
            <div className="testimonials-track">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className={`testimonial-card ${index === activeTestimonial ? "active" : ""}`}>
                  <div className="testimonial-quote">"</div>
                  <div className="testimonial-avatar">
                    <img src={testimonial.image || "/placeholder.svg?height=70&width=70"} alt={testimonial.author} />
                  </div>
                  <div className="testimonial-content">
                    <p>{testimonial.content}</p>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <div className="testimonial-author">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              ))}
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
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonials-dot ${index === activeTestimonial ? "active" : ""}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-center">Why Choose TechWave</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Headphones size={32} />
              </div>
              <h3>Premium Quality</h3>
              <p>All our products are crafted with premium materials and undergo rigorous quality testing.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Sparkles size={32} />
              </div>
              <h3>Cutting-Edge Technology</h3>
              <p>Stay ahead with the latest innovations in audio, wearables, and smart accessories.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={32} />
              </div>
              <h3>Fast Shipping</h3>
              <p>Free express shipping on all orders over $50, with delivery in 2-3 business days.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <RefreshCw size={32} />
              </div>
              <h3>30-Day Returns</h3>
              <p>Not satisfied? Return any product within 30 days for a full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Connected</h2>
            <p>Subscribe to receive exclusive offers, new product alerts, and tech tips directly to your inbox.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home

