"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { gsap } from "gsap"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import Avatar from "../components/Avatar"
import "../styles/ProductDetails.css"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"
import { FaStar } from "react-icons/fa"
import { useProduct } from "../context/ProductContext"

const ProductDetails = () => {
  const { fetchProducts, fetchReviews, postReview } = useProduct()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const { addToCart } = useCart()
  const [reviews, setReviews] = useState([])

  const [reviewSort, setReviewSort] = useState("newest")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewComment, setReviewComment] = useState("")
  const [reviewImages, setReviewImages] = useState([])
  const [userReview, setUserReview] = useState(null)
  const { isAuthenticated, currentUser } = useAuth()
  const [reviewLoader, setReviewLoader] = useState(true)

  const [loader, setLoader] = useState(true)

  const productRef = useRef(null)
  const imagesRef = useRef(null)
  const detailsRef = useRef(null)

  const hasPurchased = isAuthenticated

  const sortedReviews =
    reviews && reviews
      ? [...reviews].sort((a, b) => {
          switch (reviewSort) {
            case "newest":
              return new Date(b.date) - new Date(a.date)
            case "oldest":
              return new Date(a.date) - new Date(b.date)
            case "highest":
              return b.rating - a.rating
            case "lowest":
              return a.rating - b.rating
            default:
              return 0
          }
        })
      : []

  const calculateAverageRating = (reviews) => {
    if (!reviews.length) return 0
    const sum = reviews.reduce((total, review) => total + review.rating, 0)
    return sum / reviews.length
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? "filled" : "empty"}`}>
            <FaStar />
          </span>
        ))}
      </div>
    )
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    const newReview = {
      id: new Date(),
      user: `${currentUser.name}`,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      date: new Date().toISOString().split("T")[0],
      verified: true,
      images: [...reviewImages],
    }

    try {
      const data = new FormData()
      data.append("productId", id)
      data.append("rating", reviewRating)
      data.append("title", reviewTitle)
      data.append("comment", reviewComment)
      data.append("withImage", reviewImages.length > 0)
      reviewImages.forEach((image) => {
        data.append("reviewImage", image)
      })
      const response = await postReview(id, data)
      if (response.success) {
        setUserReview(newReview)
        setShowReviewForm(false)
        setReviewRating(5)
        setReviewTitle("")
        setReviewComment("")
        setReviewImages([])
        // window.location.reload();
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + reviewImages.length > 3) {
      alert("You can upload a maximum of 3 images")
      return
    }

    const newImages = files.map((file) => URL.createObjectURL(file))
    setReviewImages([...reviewImages, ...newImages])
  }

  const handleRemoveImage = (index) => {
    const updatedImages = [...reviewImages]
    updatedImages.splice(index, 1)
    setReviewImages(updatedImages)
  }

  const handleImageClick = (image) => {
    window.open(image, "_blank")
  }

  useEffect(() => {
    if (isAuthenticated && currentUser && product && reviews) {
      const existingReview = reviews.find(
        (review) => review.user === `${currentUser.firstName} ${currentUser.lastName}`,
      )
      if (existingReview) {
        setUserReview(existingReview)
      }
    }
  }, [isAuthenticated, currentUser, product])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)

      try {
        const response = await fetchProducts("single", id)
        if (response.success) {
          setProduct(response.products)
          if (response.products && response.products.specifications && response.products.specifications.colors) {
            setSelectedColor(response.products.specifications.colors[0])
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      }

      setLoading(false)
    }
    fetchProduct()

    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetchReviews(id)
        if (response.success) {
          setReviews(response.review)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setReviewLoader(false)
      }
    }
    fetchReview()
  }, [id])

  useEffect(() => {
    if (product && !loading) {
      gsap.fromTo(
        detailsRef.current.querySelectorAll(".animate-in"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      )

      gsap.fromTo(
        imagesRef.current.querySelector(".main-image"),
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
      )

      gsap.fromTo(
        imagesRef.current.querySelectorAll(".thumbnail"),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        },
      )
    }
  }, [product, loading])

  const handleQuantityChange = (value) => {
    if (value < 1) return
    if (value > 10) return
    setQuantity(value)
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        {
          ...product,
          selectedColor,
        },
        quantity,
      )

      gsap.to(".product-info", {
        y: -10,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(".product-info", {
            y: 0,
            duration: 0.3,
            ease: "bounce.out",
          })
        },
      })
    }
  }

  if (!loading && !product) {
    return (
      <>
        <Navbar position={"relative"} />
        <div
          className="container section not-found"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 200px)",
          }}
        >
          <lord-icon
            src="https://cdn.lordicon.com/xmaezqzk.json"
            trigger="hover"
            colors="primary:#121331,secondary:#6f4a9b"
            style={{ width: "120px", height: "120px", marginBottom: "20px" }}
          ></lord-icon>
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn">
            Back to Products
          </Link>
        </div>
        <Footer />
      </>
    )
  }
  return (
    <>
      <Navbar position={"relative"} />
      <div className="product-details-page" ref={productRef}>
        {!loading && (
          <div className="container section">
            <div className="breadcrumbs">
              <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.title}</span>
            </div>

            <div className="product-details">
              {/* Product Images */}
              <div className="product-images" ref={imagesRef}>
                <div className="main-image">
                  <img src={"/placeholder.png"} alt={product.title} />
                  {product.sale && <span className="product-tag">Sale</span>}
                </div>

                <div className="thumbnails">
                  {product.image &&
                    product.image.map((image, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img src={image || "/placeholder.svg"} alt={`${product.title} - View ${index + 1}`} />
                      </div>
                    ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info" ref={detailsRef}>
                <h1 className="product-title animate-in">{product.title}</h1>
                <div className="product-category animate-in">{product.category}</div>

                <div
                  className="product-price animate-in"
                  style={{
                    marginTop: 0,
                  }}
                >
                  {product.salePrice ? (
                    <>
                      <span className="price-original">${product.price.toFixed(2)}</span>
                      <span className="price-sale">${product.salePrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </div>

                <div className="product-short-desc animate-in">
                  <p>{product.description.substring(0, 150)}...</p>
                </div>

                {/* Color Selection */}
                {product.specifications && product.specifications.colors && (
                  <div className="product-colors animate-in">
                    <h3>Color</h3>
                    <div className="color-options">
                      {product.specifications.colors.map((color) => (
                        <button
                          key={color}
                          className={`color-option ${selectedColor === color ? "active" : ""}`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="product-quantity animate-in">
                  <h3>Quantity</h3>
                  <div className="quantity-selector">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="quantity-btn"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="quantity-btn"
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="product-actions animate-in">
                  <button className="btn btn-large" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button className="btn btn-large btn-secondary">Add to Wishlist</button>
                </div>

                {/* Product Meta */}
                <div className="product-meta animate-in">
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{product.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs for additional info */}
            <div className="product-tabs">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`tab-btn ${activeTab === "features" ? "active" : ""}`}
                  onClick={() => setActiveTab("features")}
                >
                  Features
                </button>
                <button
                  className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
                  onClick={() => setActiveTab("specs")}
                >
                  Specifications
                </button>
                <button
                  className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({reviewLoader ? "Loading...." : reviews?.length || 0})
                </button>
              </div>

              <div className="tabs-content">
                {activeTab === "description" && (
                  <div className="tab-pane">
                    <p>{product.description}</p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="tab-pane">
                    <h3>Key Features</h3>
                    <ul className="features-list">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="tab-pane">
                    <h3>Product Specifications</h3>
                    <table className="specs-table">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                            <td>{Array.isArray(value) ? value.join(", ") : value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {activeTab === "reviews" && (
              <>
                {reviewLoader && <Loader height="40vh" />}
                {!reviewLoader && (
                  <div className="tab-pane reviews-section">
                    <div className="reviews-header">
                      <div className="reviews-summary">
                        <h3>Customer Reviews</h3>
                        <div className="rating-summary">
                          <div className="average-rating">
                            <span className="rating-number">{calculateAverageRating(reviews).toFixed(1)}</span>
                            <div className="rating-stars">{renderStars(calculateAverageRating(reviews))}</div>
                            <span className="total-reviews">Based on {reviews.length} reviews</span>
                          </div>
                          <div className="rating-bars">
                            {[5, 4, 3, 2, 1].map((rating) => {
                              const count = reviews.filter((r) => Math.round(r.rating) === rating).length
                              const percentage = reviews.length ? (count / reviews.length) * 100 : 0
                              return (
                                <div key={rating} className="rating-bar-row">
                                  <div className="rating-label">{rating} stars</div>
                                  <div className="rating-bar-container">
                                    <div className="rating-bar" style={{ width: `${percentage}%` }}></div>
                                  </div>
                                  <div className="rating-count">{count}</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="reviews-actions">
                        <select
                          className="reviews-sort"
                          value={reviewSort}
                          onChange={(e) => setReviewSort(e.target.value)}
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="highest">Highest Rated</option>
                          <option value="lowest">Lowest Rated</option>
                        </select>
                      </div>
                    </div>

                    <div className="reviews-list">
                      {sortedReviews.map((review) => (
                        <div key={review._id} className="review-item">
                          <div className="review-avatar">
                            <Avatar seed={review.user.name} type="customer" />
                          </div>
                          <div className="review-content">
                            <div className="review-header">
                              <div className="review-user-info">
                                <div className="review-user">{review.user.name}</div>
                              </div>
                              <div className="review-date">{formatDate(review.createdDate)}</div>
                            </div>
                            <div className="review-rating">{renderStars(review.rating)}</div>
                            {review.title && <h4 className="review-title">{review.title}</h4>}
                            <div className="review-comment">{review.comment}</div>
                            {review.withImage && (
                              <div className="review-images">
                                {review.image.map((image, idx) => (
                                  <div key={idx} className="review-image" onClick={() => handleImageClick(image)}>
                                    <img
                                      src={`${import.meta.env.VITE_HOST}/image/reviews/${image}` || "/placeholder.svg"}
                                      alt={`Review image ${idx + 1}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {isAuthenticated && hasPurchased && (
                      <div className="add-review-section">
                        <button className="btn btn-secondary" onClick={() => setShowReviewForm(true)}>
                          Write a Review
                        </button>
                      </div>
                    )}

                    {!isAuthenticated && (
                      <div className="review-login-notice">
                        <p>Please log in to leave a review.</p>
                        <Link to="/login" className="btn btn-secondary">
                          Log In
                        </Link>
                      </div>
                    )}
                    {isAuthenticated && !hasPurchased && (
                      <div className="review-purchase-notice">
                        <p>You need to purchase this product to leave a review.</p>
                        <button className="btn btn-secondary" onClick={handleAddToCart}>
                          Add to Cart
                        </button>
                      </div>
                    )}

                    {showReviewForm && (
                      <div className="review-form-overlay" onClick={() => setShowReviewForm(false)}>
                        <div className="review-form-container" onClick={(e) => e.stopPropagation()}>
                          <h3>{userReview ? "Edit Your Review" : "Write a Review"}</h3>
                          <form onSubmit={handleReviewSubmit} className="review-form">
                            <div className="form-group">
                              <label>Rating</label>
                              <div className="star-rating-input">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`star ${star <= reviewRating ? "selected" : ""}`}
                                    onClick={() => setReviewRating(star)}
                                  >
                                    <FaStar />
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="reviewTitle">Review Title (optional)</label>
                              <input
                                type="text"
                                id="reviewTitle"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                placeholder="Summarize your experience"
                                maxLength={100}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="reviewComment">Your Review</label>
                              <textarea
                                id="reviewComment"
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                placeholder="What did you like or dislike about this product?"
                                rows={5}
                                required
                              ></textarea>
                              <div className="char-count">{reviewComment.length}/500</div>
                            </div>
                            <div className="form-group">
                              <label>Add Photos (optional)</label>
                              <div className="review-image-upload">
                                <label className="upload-btn">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden-input"
                                  />
                                  Choose Images
                                </label>
                                <span className="upload-note">Up to 3 images</span>
                              </div>
                              {reviewImages.length > 0 && (
                                <div className="review-image-preview">
                                  {reviewImages.map((image, idx) => (
                                    <div key={idx} className="preview-image">
                                      <img src={image || "/placeholder.svg"} alt={`Preview ${idx + 1}`} />
                                      <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => handleRemoveImage(idx)}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="form-actions">
                              <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => setShowReviewForm(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!reviewRating || !reviewComment.trim()}
                              >
                                {userReview ? "Update Review" : "Submit Review"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Related Products section would go here */}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default ProductDetails

