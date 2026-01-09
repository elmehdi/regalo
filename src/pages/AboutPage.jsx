import '../styles/AboutPage.css'
import { useLanguage } from '../context/LanguageContext'

function AboutPage() {
  const { t } = useLanguage()
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>{t('about.title')}</h1>
        <p>{t('about.subtitle')}</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-text">
            <h2>{t('about.story.title')}</h2>
            <p>
              {t('about.story.p1')}
            </p>
            <p>
              {t('about.story.p2')}
            </p>
            <p>
              {t('about.story.p3')}
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="values-grid">
            <div className="value-card">
              <h3>{t('about.values.quality.title')}</h3>
              <p>{t('about.values.quality.desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('about.values.curation.title')}</h3>
              <p>{t('about.values.curation.desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('about.values.experience.title')}</h3>
              <p>{t('about.values.experience.desc')}</p>
            </div>
          </div>
        </section>

        <section className="about-section stats-section">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">{t('about.stats.customers')}</span>
          </div>
          <div className="stat">
            <span className="stat-number">1000+</span>
            <span className="stat-label">{t('about.stats.products')}</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">{t('about.stats.satisfaction')}</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
