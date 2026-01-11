import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../styles/NotFoundPage.css'

function NotFoundPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <div className="not-found-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Animated Background */}
      <div className="not-found-bg">
        <div className="floating-gift gift-1">🎁</div>
        <div className="floating-gift gift-2">🎀</div>
        <div className="floating-gift gift-3">✨</div>
        <div className="floating-gift gift-4">🎊</div>
        <div className="floating-gift gift-5">💝</div>
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
      </div>

      {/* Content */}
      <div className="not-found-content">
        {/* Animated 404 Number */}
        <div className="error-number">
          <span className="digit digit-4-1">4</span>
          <span className="digit digit-0">
            <img 
              src="/assets/0-gift.png" 
              alt="0" 
              className="zero-gift-image"
            />
          </span>
          <span className="digit digit-4-2">4</span>
        </div>

        {/* Glitch Effect Text */}
        <h1 className="error-title" data-text="Oops! Page Not Found">
          Oops! Page Not Found
        </h1>

        <p className="error-description">
          Looks like this gift got lost in delivery! The page you're looking for 
          doesn't exist or has been moved to a new address.
        </p>

        {/* Action Buttons */}
        <div className="error-actions">
          <Link to="/" className="action-btn primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Back to Home</span>
          </Link>
          <Link to="/shop" className="action-btn secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-13z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 3H2" />
            </svg>
            <span>Browse Gifts</span>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="search-suggestion">
          <p>Or try searching for what you need:</p>
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search for gifts..." />
          </div>
        </div>

        {/* Fun Stats */}
        <div className="fun-section">
          <p className="fun-text">While you're here, did you know?</p>
          <div className="fun-stats">
            <div className="fun-stat">
              <span className="stat-icon">🎁</span>
              <span className="stat-value">10K+</span>
              <span className="stat-label">Gifts Delivered</span>
            </div>
            <div className="fun-stat">
              <span className="stat-icon">😊</span>
              <span className="stat-value">5K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="fun-stat">
              <span className="stat-icon">⭐</span>
              <span className="stat-value">4.9</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decoration-line line-1" />
      <div className="decoration-line line-2" />
    </div>
  )
}

export default NotFoundPage
