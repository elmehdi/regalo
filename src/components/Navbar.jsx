import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import '../styles/Navbar.css'

const languages = [
  { code: 'en', name: 'EN', flag: '/assets/us.png' },
  { code: 'fr', name: 'FR', flag: '/assets/fr.png' },
  { code: 'ar', name: 'AR', flag: '/assets/ma.png' },
  { code: 'es', name: 'ES', flag: '/assets/es.png' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()
  const { getCartCount } = useCart()
  const { getFavoritesCount } = useFavorites()

  const cartCount = getCartCount()
  const favoritesCount = getFavoritesCount()
  const currentLang = languages.find(l => l.code === language) || languages[0]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setIsLangOpen(false)
  }, [location])

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.language-toggle')) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">Regalo</Link>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">{t('nav.home')}</Link></li>
        <li><Link to="/shop">{t('nav.shop')}</Link></li>
        <li><Link to="/about">{t('nav.about')}</Link></li>
        <li><Link to="/contact">{t('nav.contact')}</Link></li>
      </ul>

      <div className="nav-right">
        {/* Icons Container */}
        <div className="nav-icons-group">
          {/* Favorites Icon */}
          <Link to="/favorites" className="nav-icon-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="nav-badge">{favoritesCount > 99 ? '99+' : favoritesCount}</span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="nav-icon-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-13z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 3H2" />
            </svg>
            {cartCount > 0 && (
              <span className="nav-badge">{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </Link>
        </div>

        {/* Language Toggle */}
        <div className="language-toggle">
          <button
            className="lang-btn"
            onClick={(e) => {
              e.stopPropagation()
              setIsLangOpen(!isLangOpen)
            }}
          >
            <img src={currentLang.flag} alt={currentLang.name} className="lang-flag" />
            <span className="lang-arrow">▾</span>
          </button>

          {isLangOpen && (
            <div className="lang-dropdown">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${language === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsLangOpen(false)
                  }}
                >
                  <img src={lang.flag} alt={lang.name} className="lang-flag" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Navbar
