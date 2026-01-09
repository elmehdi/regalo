import { useRef, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../styles/ProductSlider.css'

const products = [
  { id: 1, name: 'Luxury Gift Box', price: 49.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400' },
  { id: 2, name: 'Classic Watch', price: 129.99, image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400' },
  { id: 3, name: 'Premium Perfume', price: 89.99, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400' },
  { id: 4, name: 'Designer Bag', price: 199.99, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
  { id: 5, name: 'Stylish Sunglasses', price: 79.99, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' },
  { id: 6, name: 'Premium Sneakers', price: 159.99, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
  { id: 7, name: 'Gold Jewelry Set', price: 249.99, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
  { id: 8, name: 'Leather Wallet', price: 59.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400' },
]

function ProductSlider() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const hasDraggedRef = useRef(false)

  const dragState = useRef({
    startX: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    animationID: 0,
    isAnimating: false
  })

  const getSliderBounds = useCallback(() => {
    if (!trackRef.current) return { min: 0, max: 0 }
    const trackWidth = trackRef.current.scrollWidth
    const wrapperWidth = trackRef.current.parentElement.offsetWidth
    return {
      min: -(trackWidth - wrapperWidth + 60),
      max: 0
    }
  }, [])

  const elasticClamp = (value, min, max, elasticity = 0.3) => {
    if (value > max) return max + (value - max) * elasticity
    if (value < min) return min + (value - min) * elasticity
    return value
  }

  const setSliderPosition = useCallback((instant = false) => {
    if (!trackRef.current) return
    trackRef.current.style.transition = instant ? 'none' : 'transform 0.05s ease-out'
    trackRef.current.style.transform = `translateX(${dragState.current.currentTranslate}px)`
  }, [])

  const snapToBounds = useCallback(() => {
    const bounds = getSliderBounds()
    const state = dragState.current
    let needsSnap = false

    if (state.currentTranslate > bounds.max) {
      state.currentTranslate = bounds.max
      needsSnap = true
    } else if (state.currentTranslate < bounds.min) {
      state.currentTranslate = bounds.min
      needsSnap = true
    }

    if (needsSnap && trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      trackRef.current.style.transform = `translateX(${state.currentTranslate}px)`
      state.prevTranslate = state.currentTranslate
    }
  }, [getSliderBounds])

  const momentumAnimation = useCallback(() => {
    const state = dragState.current
    if (!state.isAnimating) return

    state.velocity *= 0.95
    state.currentTranslate += state.velocity

    const bounds = getSliderBounds()

    if (Math.abs(state.velocity) < 0.5) {
      state.isAnimating = false
      snapToBounds()
      return
    }

    if (state.currentTranslate > bounds.max) {
      state.currentTranslate = bounds.max
      state.velocity *= -0.3
    } else if (state.currentTranslate < bounds.min) {
      state.currentTranslate = bounds.min
      state.velocity *= -0.3
    }

    state.prevTranslate = state.currentTranslate
    setSliderPosition(true)

    state.animationID = requestAnimationFrame(momentumAnimation)
  }, [getSliderBounds, setSliderPosition, snapToBounds])

  const handleDragStart = useCallback((e) => {
    setIsDragging(true)
    setHasInteracted(true)
    hasDraggedRef.current = false

    const state = dragState.current
    state.isAnimating = false
    cancelAnimationFrame(state.animationID)

    state.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
    state.lastX = state.startX
    state.lastTime = performance.now()
    state.velocity = 0

    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing'
      trackRef.current.style.transition = 'none'
    }

    e.preventDefault()
  }, [])

  const handleDrag = useCallback((e) => {
    if (!isDragging) return

    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
    const currentTime = performance.now()
    const state = dragState.current
    const deltaTime = currentTime - state.lastTime

    // Mark as dragged if moved more than 5px
    if (Math.abs(currentPosition - state.startX) > 5) {
      hasDraggedRef.current = true
    }

    if (deltaTime > 0) {
      state.velocity = (currentPosition - state.lastX) / deltaTime * 16
    }

    state.lastX = currentPosition
    state.lastTime = currentTime

    const bounds = getSliderBounds()
    const rawTranslate = state.prevTranslate + currentPosition - state.startX
    state.currentTranslate = elasticClamp(rawTranslate, bounds.min, bounds.max)

    setSliderPosition(true)
  }, [isDragging, getSliderBounds, setSliderPosition])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const state = dragState.current
    state.prevTranslate = state.currentTranslate

    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab'
    }

    if (Math.abs(state.velocity) > 0.5) {
      state.isAnimating = true
      momentumAnimation()
    } else {
      snapToBounds()
    }
  }, [isDragging, momentumAnimation, snapToBounds])

  // Handle card click - only navigate if not dragging
  const handleCardClick = (e, productId) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      return
    }
    navigate(`/product/${productId}`)
  }

  // 3D tilt effect
  const handleCardMouseMove = (e, cardElement) => {
    if (isDragging) return
    const inner = cardElement.querySelector('.product-inner')
    if (!inner) return

    const rect = cardElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 12
    const rotateY = (centerX - x) / 12

    inner.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) scale(1.03)`
    inner.style.transition = 'transform 0.1s ease-out'
  }

  const handleCardMouseLeave = (cardElement) => {
    const inner = cardElement.querySelector('.product-inner')
    if (!inner) return
    inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    inner.style.transition = 'transform 0.4s ease-out'
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleDragEnd)
    window.addEventListener('touchend', handleDragEnd)

    return () => {
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [handleDragEnd])

  return (
    <section className="bestsellers-section" id="bestsellers">
      <h2 className="slider-title">{t('home.slider.title')}</h2>
      <div className="slider-wrapper">
        {/* Swipe Hint */}
        <div className={`swipe-hint ${hasInteracted ? 'hidden' : ''}`}>
          <div className="swipe-hand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-2a1.5 1.5 0 0 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12m0-4.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.65-4" />
              <path d="M2 10h4" />
              <path d="M4 8l-2 2 2 2" />
            </svg>
          </div>
          <span className="swipe-text">{t('home.slider.drag')}</span>
        </div>

        <div
          className="slider-track"
          ref={trackRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseMove={handleDrag}
          onTouchMove={handleDrag}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
              onClick={(e) => handleCardClick(e, product.id)}
            >
              <div className="product-inner">
                <img src={product.image} alt={product.name} draggable="false" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSlider
