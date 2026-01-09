import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../styles/Footer.css'

function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <span className="footer-logo">Regalo</span>
          <p>{t('footer.desc')}</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="Pinterest">PN</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>{t('footer.quickLinks')}</h4>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/shop">{t('nav.shop')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.categories')}</h4>
          <ul>
            <li><Link to="/shop?category=him">{t('footer.cat.him')}</Link></li>
            <li><Link to="/shop?category=her">{t('footer.cat.her')}</Link></li>
            <li><Link to="/shop?category=kids">{t('footer.cat.kids')}</Link></li>
            <li><Link to="/shop?category=luxury">{t('footer.cat.luxury')}</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.contactInfo')}</h4>
          <ul>
            <li><a href="mailto:hello@regalo.com">hello@regalo.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li><span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('footer.address')}</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Regalo. {t('footer.rights')}</p>
      </div>
    </footer>
  )
}

export default Footer
