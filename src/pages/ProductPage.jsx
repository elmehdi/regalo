import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { fetchProductById } from '../services/api'
import '../styles/ProductPage.css'
import FavoriteIcon from '../components/FavoriteIcon'

function ProductPage() {
  const { t } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="product-page loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-page not-found">
        <h1>{t('product.notFound')}</h1>
        <Link to="/shop" className="back-btn">{t('product.back')}</Link>
      </div>
    )
  }

  return (
    <div className="product-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
      <div className="product-container">
        <div className="product-gallery">
          {/* Heart Icon for Favorites */}
          <FavoriteIcon product={product} />
          <img src={product.image} alt={product.name} />

          {/* Gender & Kids Badges */}
          <div className="product-badges">
            <span className={`gender-badge gender-${product.gender}`}>
              {product.gender === 'both' ? 'Both' : product.gender === 'man' ? 'For Him' : 'For Her'}
            </span>
            {product.kids && <span className="kids-badge">Kids Friendly</span>}
          </div>

          {/* Desktop: Ratings & Reviews under image */}
          <div className="gallery-details">
            {/* Collapsible Ratings Breakdown */}
            <details className="rating-details">
              <summary>View Rating Breakdown</summary>
              <div className="rating-breakdown">
                {Object.entries(product.ratings.breakdown).reverse().map(([star, count]) => (
                  <div key={star} className="rating-bar">
                    <span className="star-label">{star}★</span>
                    <div className="bar-container">
                      <div
                        className="bar-fill"
                        style={{ width: `${(count / product.ratings.count) * 100}%` }}
                      />
                    </div>
                    <span className="bar-count">{count}</span>
                  </div>
                ))}
              </div>
            </details>

            {/* Customer Feedbacks - Collapsible */}
            {product.feedbacks && product.feedbacks.length > 0 && (
              <details className="customer-feedbacks-details">
                <summary>Customer Reviews ({product.feedbacks.length})</summary>
                <div className="customer-feedbacks">
                  {product.feedbacks.slice(0, 3).map(feedback => (
                    <div key={feedback.id} className="feedback-card">
                      <div className="feedback-header">
                        <div className="feedback-user">
                          <span className="user-name">{feedback.user}</span>
                          {feedback.verified && <span className="verified-badge">Verified</span>}
                        </div>
                        <div className="feedback-rating">
                          {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
                        </div>
                      </div>
                      <p className="feedback-comment">{feedback.comment}</p>
                      <span className="feedback-date">{new Date(feedback.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>

        <div className="product-info-page">
          <Link to="/shop" className="back-link">← {t('product.back')}</Link>
          <h1>{product.name}</h1>

          {/* Compact Ratings and Price Row */}
          <div className="product-header-row">
            <div className="rating-summary-compact">
              <span className="rating-stars">★ {product.ratings.average}</span>
              <span className="rating-count">({product.ratings.count} reviews)</span>
            </div>
            <p className="product-price-large">${parseFloat(product.price).toFixed(2)}</p>
          </div>

          <p className="product-description">{product.description}</p>

          {/* Purchase Section - Priority Position */}
          <div className="purchase-section">
            <div className="quantity-selector">
              <label>{t('product.quantity')}</label>
              <div className="quantity-controls">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>

            <button className="add-to-cart-btn">{t('product.addToCart')}</button>
            <button className="buy-now-btn">{t('product.buyNow')}</button>
          </div>

          {/* Payment Methods - Compact */}
          <div className="payment-methods-compact">
            <span className="payment-label">Payment:</span>
            <div className="payment-icons">
              {product.paymentMode.includes('cash_on_delivery') && (
                <span className="payment-badge cash">Cash on Delivery</span>
              )}
              {product.paymentMode.includes('online_payment') && (
                <span className="payment-badge online">Online Payment</span>
              )}
            </div>
            {product.paymentMode.length === 1 && product.paymentMode[0] === 'online_payment' && (
              <p className="payment-note">Online payment only</p>
            )}
          </div>

          {/* Occasions Tags - Compact */}
          <div className="product-occasions-compact">
            <span className="occasions-label">Perfect for:</span>
            <div className="occasions-tags">
              {product.occasions.map(occasion => (
                <Link
                  key={occasion}
                  to={`/shop/${occasion}`}
                  className="occasion-tag"
                >
                  {occasion.replace('-', ' ')}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
