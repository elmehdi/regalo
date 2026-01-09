import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../styles/ShopPage.css'

const occasions = [
  { id: 'wedding', image: '/assets/wedding.png' },
  { id: 'birthday', image: '/assets/birthday.png' },
  { id: 'new-baby', image: '/assets/new%20born.png' },
  { id: 'romantic', image: '/assets/romantic.png' },
  { id: 'new-house', image: '/assets/new%20house.png' },
  { id: 'retirement', image: '/assets/retirement.png' },
  { id: 'office', image: '/assets/office.png' },
  { id: 'inauguration', image: '/assets/inauguration.png' },
  { id: 'graduation', image: '/assets/graduation.png' },
  { id: 'other', image: '/assets/all.png' },
]

function ShopPage() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  const activeCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  const goToSlide = (index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextSlide = () => {
    if (isAnimating) return
    goToSlide((currentIndex + 1) % occasions.length)
  }

  const prevSlide = () => {
    if (isAnimating) return
    goToSlide((currentIndex - 1 + occasions.length) % occasions.length)
  }

  const goToOccasion = () => {
    const occasion = occasions[currentIndex]
    const url = `/shop/${occasion.id}${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`
    navigate(url)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'Enter') goToOccasion()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isAnimating])

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      document.documentElement.style.setProperty('--scroll-progress', `${scrolled}%`)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine theme class based on category
  const getThemeClass = () => {
    if (activeCategory === 'him') return 'theme-him'
    if (activeCategory === 'her') return 'theme-her'
    return ''
  }

  // Get gender-specific description
  const getDescription = (id) => {
    if (activeCategory === 'him') return t(`occasions.${id}.descriptionHim`)
    if (activeCategory === 'her') return t(`occasions.${id}.descriptionHer`)
    return t(`occasions.${id}.description`)
  }

  const currentOccasion = occasions[currentIndex]

  return (
    <div className={`shop-page ${getThemeClass()}`}>
      {/* Blurred background using current occasion image */}
      <div
        className="shop-bg-blur"
        style={{ backgroundImage: `url(${currentOccasion.image})` }}
      />

      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" />
      </div>

      <div className="shop-header">
        <h1>{t('shop.title')}</h1>
        <p>{t('shop.subtitle')}</p>
      </div>

      <div className="shop-filters">
        <button
          className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          <span className="btn-text">{t('shop.filters.all')}</span>
        </button>
        <button
          className={`filter-btn filter-him ${activeCategory === 'him' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('him')}
        >
          <span className="ribbon ribbon-left"></span>
          <span className="btn-text">{t('shop.filters.forHim')}</span>
          <span className="ribbon ribbon-right"></span>
        </button>
        <button
          className={`filter-btn filter-her ${activeCategory === 'her' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('her')}
        >
          <span className="ribbon ribbon-left"></span>
          <span className="btn-text">{t('shop.filters.forHer')}</span>
          <span className="ribbon ribbon-right"></span>
        </button>
      </div>

      {/* Carousel Slider */}
      <div className="occasions-carousel">
        {/* Navigation Arrows */}
        <button className="carousel-nav carousel-prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="carousel-nav carousel-next" onClick={nextSlide}>
          ›
        </button>

        {/* Slides Container */}
        <div className="carousel-container">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {occasions.map((occasion, index) => (
              <div
                key={occasion.id}
                className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="carousel-card" onClick={goToOccasion}>
                  <div className="carousel-image">
                    <img src={occasion.image} alt={t(`occasions.${occasion.id}.name`)} />
                  </div>
                  <div className="carousel-content">
                    <h3 className="carousel-name">{t(`occasions.${occasion.id}.name`)}</h3>
                    <p className="carousel-description">{getDescription(occasion.id)}</p>
                    <button className="carousel-cta">
                      {t('shop.exploreGifts')}
                      <span className="cta-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="carousel-dots">
          {occasions.map((occasion, index) => (
            <button
              key={occasion.id}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Occasion Counter */}
        <div className="carousel-counter">
          <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="separator">/</span>
          <span className="total">{String(occasions.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Floating Vertical Stack - Occasion Navigator */}
      <div className="occasion-stack">
        <div className="stack-label">
          {t('shop.stackLabel').split('').map((char, index) => (
            <span key={index} style={{ '--char-index': index }}>
              {char}
            </span>
          ))}
        </div>
        <div className="stack-items">
          {occasions.map((occasion, index) => (
            <button
              key={occasion.id}
              className={`stack-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              style={{ '--stack-index': index }}
            >
              <div className="stack-item-image">
                <img src={occasion.image} alt={t(`occasions.${occasion.id}.name`)} />
              </div>
              <span className="stack-item-tooltip">{t(`occasions.${occasion.id}.name`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Mosaic Hub - Premium Magazine Style Grid */}
      <div className="shop-mosaic-hub">
        <h2 className="mosaic-title">{t('shop.browseOccasions')}</h2>
        <div className="mosaic-grid">
          {occasions.map((occasion, index) => (
            <div
              key={`mosaic-${occasion.id}`}
              className={`mosaic-item mosaic-item-${index + 1}`}
              onClick={() => {
                const url = `/shop/${occasion.id}${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`
                navigate(url)
              }}
            >
              <div className="mosaic-card">
                <div className="mosaic-image">
                  <img src={occasion.image} alt={t(`occasions.${occasion.id}.name`)} />
                  <div className="mosaic-overlay" />
                </div>
                <div className="mosaic-content">
                  <h3 className="mosaic-name">{t(`occasions.${occasion.id}.name`)}</h3>
                  <span className="mosaic-tag">{t('shop.exploreGifts')} →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopPage
