import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useEffect, useRef } from 'react'
import '../styles/GenderSection.css'

function GenderSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    const section = sectionRef.current
    if (section) {
      const animatedElements = section.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      animatedElements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  // Keep this data-driven so adding Kids later is a one-liner.
  const cards = [
    {
      key: 'him',
      title: t('shop.filters.forHim'),
      to: '/shop?category=him',
      bg: "/assets/male bg.png",
      foreground: "/assets/man.png",
    },
    {
      key: 'her',
      title: t('shop.filters.forHer'),
      to: '/shop?category=her',
      bg: "/assets/woman bg.png",
      foreground: "/assets/Woaman.png",
    },
  ]

  return (
    <section className="gender-section" id="genderSection" aria-label={t('home.gender.title')} ref={sectionRef}>
      <div className="gender-section__inner">
        <header className="gender-header reveal">
          <h2 className="gender-title">{t('home.gender.title')}</h2>
          <p className="gender-subtitle">{t('home.gender.subtitle') || t('shop.filters.forHim') + ' / ' + t('shop.filters.forHer')}</p>
        </header>

        <div className="gender-grid" role="list">
          {cards.map((card, index) => (
            <Link
              key={card.key}
              to={card.to}
              className={`gender-card gender-card--${card.key} ${index === 0 ? 'reveal-left' : 'reveal-right'}`}
              role="listitem"
              aria-label={card.title}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="gender-card__bg" style={{ backgroundImage: `url('${card.bg}')` }} />
              <div className="gender-card__overlay" />
              <div className="gender-card__content">
                <span className="gender-card__eyebrow">{t('shop.filters.shopBy') || 'Collection'}</span>
                <h3 className="gender-card__title">{card.title}</h3>
                <span className="gender-card__cta">{t('shop.filters.shopNow') || 'Shop now'}
                  <span className="gender-card__arrow" aria-hidden="true">→</span>
                </span>
              </div>

              {/* Decorative foreground (keeps your vibe, but without the loud fullscreen/parallax look) */}
              <img className="gender-card__fg" src={card.foreground} alt="" loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GenderSection
