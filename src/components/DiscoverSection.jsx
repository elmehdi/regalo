import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import '../styles/Discover.css'

function DiscoverSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className={`discover-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="discover-particles">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="discover-particle"></span>
        ))}
      </div>
      <div className="discover-content">
        <h2>{t('home.discover.title')}</h2>
        <p>{t('home.discover.subtitle')}</p>
        <Link to="/shop" className="discover-btn">
          <span className="btn-text">{t('home.discover.cta')}</span>
          <span className="btn-icon">→</span>
        </Link>
      </div>
    </section>
  )
}

export default DiscoverSection
