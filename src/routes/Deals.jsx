"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../components/ProductCard";
import "../styles/Deals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Clock,
  Tag,
  Percent,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 59,
  });
  const dealsRef = useRef(null);
  const flashDealsRef = useRef(null);
  const weeklyDealsRef = useRef(null);
  const clearanceRef = useRef(null);

  // Sample deals data
  const flashDeals = [
    {
      id: "f1",
      title: "Wireless Bluetooth Earbuds",
      category: "Electronics",
      price: 79.99,
      salePrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=500&q=60",
      discount: 50,
      rating: 4.5,
      reviews: 128,
      sale: true,
    },
    {
      id: "f2",
      title: "Smart Fitness Tracker",
      category: "Electronics",
      price: 99.99,
      salePrice: 59.99,
      image:
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=500&q=60",
      discount: 40,
      rating: 4.3,
      reviews: 95,
      sale: true,
    },
    {
      id: "f3",
      title: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 69.99,
      salePrice: 34.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=60",
      discount: 50,
      rating: 4.7,
      reviews: 112,
      sale: true,
    },
    {
      id: "f4",
      title: "Stainless Steel Water Bottle",
      category: "Home & Kitchen",
      price: 29.99,
      salePrice: 17.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=60",
      discount: 40,
      rating: 4.8,
      reviews: 76,
      sale: true,
    },
  ];

  const weeklyDeals = [
    {
      id: "w1",
      title: "Ergonomic Office Chair",
      category: "Home & Office",
      price: 199.99,
      salePrice: 149.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=500&q=60",
      discount: 25,
      rating: 4.6,
      reviews: 89,
      sale: true,
    },
    {
      id: "w2",
      title: "Professional Blender",
      category: "Home & Kitchen",
      price: 129.99,
      salePrice: 89.99,
      image:
        "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=500&q=60",
      discount: 30,
      rating: 4.4,
      reviews: 67,
      sale: true,
    },
    {
      id: "w3",
      title: "Wireless Charging Pad",
      category: "Electronics",
      price: 49.99,
      salePrice: 29.99,
      image:
        "https://images.unsplash.com/photo-1618577608401-46f4a95e0e4d?auto=format&fit=crop&w=500&q=60",
      discount: 40,
      rating: 4.2,
      reviews: 54,
      sale: true,
    },
    {
      id: "w4",
      title: "Smart LED Light Bulbs (4-Pack)",
      category: "Home & Kitchen",
      price: 59.99,
      salePrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?auto=format&fit=crop&w=500&q=60",
      discount: 33,
      rating: 4.5,
      reviews: 42,
      sale: true,
    },
  ];

  const clearanceItems = [
    {
      id: "c1",
      title: "Leather Crossbody Bag",
      category: "Fashion",
      price: 89.99,
      salePrice: 44.99,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=60",
      discount: 50,
      rating: 4.3,
      reviews: 38,
      sale: true,
    },
    {
      id: "c2",
      title: "Wireless Keyboard and Mouse Combo",
      category: "Electronics",
      price: 79.99,
      salePrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=60",
      discount: 50,
      rating: 4.1,
      reviews: 29,
      sale: true,
    },
    {
      id: "c3",
      title: "Stainless Steel Cookware Set",
      category: "Home & Kitchen",
      price: 249.99,
      salePrice: 149.99,
      image:
        "https://images.unsplash.com/photo-1584990347449-a43d9a9b7975?auto=format&fit=crop&w=500&q=60",
      discount: 40,
      rating: 4.7,
      reviews: 52,
      sale: true,
    },
    {
      id: "c4",
      title: "Portable External Hard Drive 1TB",
      category: "Electronics",
      price: 119.99,
      salePrice: 69.99,
      image:
        "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=500&q=60",
      discount: 42,
      rating: 4.4,
      reviews: 47,
      sale: true,
    },
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;

        if (newSeconds < 0) {
          const newMinutes = prevTime.minutes - 1;

          if (newMinutes < 0) {
            const newHours = prevTime.hours - 1;

            if (newHours < 0) {
              const newDays = prevTime.days - 1;

              if (newDays < 0) {
                // Timer ended
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }

              return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
            }

            return { ...prevTime, hours: newHours, minutes: 59, seconds: 59 };
          }

          return { ...prevTime, minutes: newMinutes, seconds: 59 };
        }

        return { ...prevTime, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Flash deals animation
    if (flashDealsRef.current) {
      gsap.fromTo(
        flashDealsRef.current.querySelectorAll(".product-card"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: flashDealsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Weekly deals animation
    if (weeklyDealsRef.current) {
      gsap.fromTo(
        weeklyDealsRef.current.querySelectorAll(".product-card"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: weeklyDealsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Clearance animation
    if (clearanceRef.current) {
      gsap.fromTo(
        clearanceRef.current.querySelectorAll(".product-card"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: clearanceRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="deals-page" ref={dealsRef}>
        <PageHeader
          title="Deals & Promotions"
          subtitle="Discover our best offers, discounts, and special promotions"
          theme="gradient"
          size="medium"
        />

        {/* Flash Deals Section */}
        <section className="section flash-deals-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-wrapper">
                <Clock size={28} className="section-icon" />
                <h2 className="section-title">Flash Deals</h2>
              </div>
              <div className="countdown-timer">
                <p>Ends in:</p>
                <div className="timer-units">
                  <div className="timer-unit">
                    <span className="timer-value">{timeLeft.days}</span>
                    <span className="timer-label">Days</span>
                  </div>
                  <div className="timer-separator">:</div>
                  <div className="timer-unit">
                    <span className="timer-value">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </span>
                    <span className="timer-label">Hours</span>
                  </div>
                  <div className="timer-separator">:</div>
                  <div className="timer-unit">
                    <span className="timer-value">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </span>
                    <span className="timer-label">Mins</span>
                  </div>
                  <div className="timer-separator">:</div>
                  <div className="timer-unit">
                    <span className="timer-value">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="timer-label">Secs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="products-grid" ref={flashDealsRef}>
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="section-footer">
              <Link to="/products" className="btn btn-primary">
                View All Flash Deals
              </Link>
            </div>
          </div>
        </section>

        {/* Deal of the Day */}
        <section className="section deal-of-the-day">
          <div className="container">
            <div className="deal-of-day-card">
              <div className="deal-content">
                <div className="deal-badge">Deal of the Day</div>
                <h2>Premium Noise-Cancelling Headphones</h2>
                <div className="deal-price">
                  <span className="original-price">$299.99</span>
                  <span className="sale-price">$179.99</span>
                  <span className="discount-badge">40% OFF</span>
                </div>
                <p>
                  Experience crystal-clear sound and immersive audio with these
                  premium wireless headphones featuring active noise
                  cancellation and 30-hour battery life.
                </p>
                <Link
                  to="/products/headphones-123"
                  className="btn btn-primary btn-large"
                >
                  Shop Now
                </Link>
              </div>
              <div className="deal-image">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=60"
                  alt="Premium Headphones"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Deals Section */}
        <section className="section weekly-deals-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-wrapper">
                <Tag size={28} className="section-icon" />
                <h2 className="section-title">Weekly Deals</h2>
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

            <div className="products-grid" ref={weeklyDealsRef}>
              {weeklyDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="section-footer">
              <Link to="/products" className="btn btn-primary">
                View All Weekly Deals
              </Link>
            </div>
          </div>
        </section>

        {/* Clearance Section */}
        <section className="section clearance-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-wrapper">
                <Percent size={28} className="section-icon" />
                <h2 className="section-title">Clearance Sale</h2>
              </div>
            </div>
            <p className="section-subtitle">
              Up to 70% off! Limited quantities available.
            </p>

            <div className="products-grid" ref={clearanceRef}>
              {clearanceItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="section-footer">
              <Link to="/products" className="btn btn-primary">
                View All Clearance Items
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section deals-newsletter">
          <div className="container">
            <div className="newsletter-card">
              <div className="newsletter-content">
                <h2>Get Exclusive Deals</h2>
                <p>
                  Subscribe to our newsletter and be the first to know about our
                  special offers and promotions.
                </p>
                <form className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                  <button type="submit" className="btn">
                    Subscribe
                  </button>
                </form>
                <div className="newsletter-features">
                  <div className="feature">
                    <AlertCircle size={16} />
                    <span>Early access to sales</span>
                  </div>
                  <div className="feature">
                    <ShoppingBag size={16} />
                    <span>Exclusive subscriber discounts</span>
                  </div>
                </div>
              </div>
              <div className="newsletter-image">
                <img
                  src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=500&q=60"
                  alt="Exclusive Deals"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Deals;
