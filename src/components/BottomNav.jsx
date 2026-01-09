import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Home, ShoppingBag, Users, Mail } from 'lucide-react'
import '../styles/BottomNav.css'

function BottomNav() {
    const { pathname } = useLocation()
    const { t } = useLanguage()

    const isActive = (path) => {
        if (path === '/') return pathname === '/'
        return pathname.startsWith(path)
    }

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-container">
                <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                    <Home className="icon" strokeWidth={1.5} />
                    <span>{t('nav.home')}</span>
                </Link>

                <Link to="/shop" className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
                    <ShoppingBag className="icon" strokeWidth={1.5} />
                    <span>{t('nav.shop')}</span>
                </Link>

                <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
                    <Users className="icon" strokeWidth={1.5} />
                    <span>{t('nav.about')}</span>
                </Link>

                <Link to="/contact" className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
                    <Mail className="icon" strokeWidth={1.5} />
                    <span>{t('nav.contact')}</span>
                </Link>
            </div>
        </nav>
    )
}

export default BottomNav
