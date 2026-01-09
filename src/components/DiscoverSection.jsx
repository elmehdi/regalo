import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../styles/Discover.css'

function DiscoverSection() {
  const { t } = useLanguage()
  return (
    <section className="discover-section">
      <div className="discover-content">
        <h2>{t('home.discover.title')}</h2>
        <p>{t('home.discover.subtitle')}</p>
        <Link to="/shop" className="discover-btn">{t('home.discover.cta')}</Link>
      </div>
    </section>
  )
}

export default DiscoverSection
