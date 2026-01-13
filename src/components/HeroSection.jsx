import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import '../styles/Hero.css'

function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="hero-section" id="hero">
      <picture className="hero-bg-container">
        <source media="(max-width: 768px)" srcSet="/assets/Mobile%20BG.png" />
        <img
          src="/assets/Gift BG.png"
          alt="Regalo Background"
          className="hero-bg-image"
        />
      </picture>
      <div className="hero-overlay"></div>
      
      {/* Floating Particles */}
      <div className="hero-particles">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">{t('home.hero.title')}</h1>
        <p className="hero-subtitle">{t('home.hero.subtitle')}</p>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>{t('home.hero.scroll')}</p>
      </div>
    </section>
  )
}

export default HeroSection
