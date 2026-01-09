import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../styles/GenderSection.css'

function GenderSection() {
  const { t } = useLanguage()
  const maleCardRef = useRef(null)
  const femaleCardRef = useRef(null)

  const handleMouseMove = useCallback((e, cardRef) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = (x - centerX) / centerX
    const moveY = (y - centerY) / centerY

    const images = card.querySelectorAll('.parallax-img')
    images.forEach((img, index) => {
      const speed = (index + 1) * 8
      const isLeftImage = img.classList.contains('man-img') || img.classList.contains('girl-img')
      const isBoy = img.classList.contains('boy-img')
      let baseX = isLeftImage ? '-15%' : '15%'
      if (isBoy) baseX = '25%'
      const horizontalMove = moveX * speed * 0.3
      img.style.transform = `translateX(calc(${baseX} + ${horizontalMove}px)) translateY(${moveY * speed}px)`
    })
  }, [])

  const handleMouseLeave = useCallback((cardRef) => {
    const card = cardRef.current
    if (!card) return

    const images = card.querySelectorAll('.parallax-img')
    images.forEach(img => {
      const isLeftImage = img.classList.contains('man-img') || img.classList.contains('girl-img')
      const isBoy = img.classList.contains('boy-img')
      let baseX = isLeftImage ? '-15%' : '15%'
      if (isBoy) baseX = '25%'
      img.style.transform = `translateX(${baseX})`
    })
  }, [])

  return (
    <section className="gender-section" id="genderSection">
      <h2 className="section-title">{t('home.gender.title')}</h2>
      <div className="gender-grid">
        {/* Male Side */}
        <div
          className="gender-card male-card"
          ref={maleCardRef}
          onMouseMove={(e) => handleMouseMove(e, maleCardRef)}
          onMouseLeave={() => handleMouseLeave(maleCardRef)}
        >
          <div className="gender-bg" style={{ backgroundImage: "url('/assets/male bg.png')" }}></div>
          <div className="gender-overlay"></div>
          <div className="parallax-images">
            <img src="/assets/man.png" alt="Man" className="parallax-img man-img" />
            <img src="/assets/little boy.png" alt="Little Boy" className="parallax-img boy-img" />
          </div>
          <div className="gender-content">
            <Link to="/shop?category=him" className="gender-btn">{t('shop.filters.forHim')}</Link>
          </div>
        </div>

        {/* Female Side */}
        <div
          className="gender-card female-card"
          ref={femaleCardRef}
          onMouseMove={(e) => handleMouseMove(e, femaleCardRef)}
          onMouseLeave={() => handleMouseLeave(femaleCardRef)}
        >
          <div className="gender-bg" style={{ backgroundImage: "url('/assets/woman bg.png')" }}></div>
          <div className="gender-overlay"></div>
          <div className="parallax-images">
            <img src="/assets/Woaman.png" alt="Woman" className="parallax-img woman-img" />
            <img src="/assets/little girl.png" alt="Little Girl" className="parallax-img girl-img" />
          </div>
          <div className="gender-content">
            <Link to="/shop?category=her" className="gender-btn">{t('shop.filters.forHer')}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GenderSection
