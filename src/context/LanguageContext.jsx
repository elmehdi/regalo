import { createContext, useContext, useState, useEffect } from 'react'

// Import translations
import en from '../translations/en.json'
import fr from '../translations/fr.json'
import ar from '../translations/ar.json'
import es from '../translations/es.json'

const translations = { en, fr, ar, es }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => {
        // Get saved language from localStorage or default to 'en'
        const saved = localStorage.getItem('regalo-language')
        return saved || 'en'
    })

    // Save to localStorage when language changes
    useEffect(() => {
        localStorage.setItem('regalo-language', language)
    }, [language])

    // Translation function with dot notation support
    const t = (key) => {
        const keys = key.split('.')
        let value = translations[language]

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k]
            } else {
                return key // Return key if translation not found
            }
        }

        return value || key
    }

    const setLanguage = (lang) => {
        if (translations[lang]) {
            setLanguageState(lang)
        }
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export default LanguageContext
