"use client";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingBag, Truck, Shield, Clock } from "lucide-react";
import { categories, testimonials, products } from "../data/data";
import { useState } from "react";
import { useProduct } from "../context/ProductContext";
import Loader from "../components/Loader";
import Avatar from "../components/Avatar";

const Home = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const categoriesRef = useRef(null);
  const dealsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const testimonialSliderRef = useRef(null);
  const { fetchProducts } = useProduct();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProd = async () => {
      const products = await fetchProducts("isFeatured");
      if (products?.success) {
        setFeaturedProducts(products.products);
        setLoading(false);
      }
    };
    fetchProd();
  }, [fetchProducts]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

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
        "-=0.5"
      )
      .from(
        ".hero-image",
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      );

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
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
  ];

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
                ShopHub is a driving force behind the dreams of emerging
                entrepreneurs, a trusted partner for industry leaders.
              </p>
              <div className="hero-cta">
                <Link to="/products" className="btn btn-primary btn-large">
                  Start Shopping
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
                {products.slice(0,4).map((product) => (
                  <div key={product.id} className="product-card">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <span className="product-name">{product.title}</span>
                      <span className="product-price">
                        ${product.price.toFixed(2)}
                      </span>
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
                <Link
                  to={`/categories/${category.slug}`}
                  className="category-card"
                  key={category.id}
                >
                  <div className="category-image">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                    />
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
{console.log(products)}
        {/* Featured Products */}
        <section className="section featured-products" ref={featuredRef}>
          <div className="container">
            <h2 className="section-title text-center">Featured Products</h2>
            {!loading && products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id || product._id}
                    product={product}
                  />
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

        {/* Deals Section */}
        <section className="section deals-section" ref={dealsRef}>
          <div className="container">
            <div className="deal-card">
              <div className="deal-content">
                <h2 className="deal-title">Summer Sale</h2>
                <p className="deal-description">
                  Up to 50% off on selected items. Limited time offer!
                </p>
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
            <h2 className="section-title text-center">
              What Our Customers Say
            </h2>

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
                Subscribe to receive exclusive offers, new product alerts, and
                special promotions directly to your inbox.
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
  );
};

export default Home;
