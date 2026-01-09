import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import '../styles/ContactPage.css'

function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission (connect to backend later)
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.subtitle')}</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <h3>{t('contact.visit')}</h3>
            <p>123 Gift Street<br />New York, NY 10001</p>
          </div>
          <div className="info-card">
            <h3>{t('contact.call')}</h3>
            <p>+1 (234) 567-890<br />Mon - Fri, 9am - 6pm</p>
          </div>
          <div className="info-card">
            <h3>{t('contact.email')}</h3>
            <p>hello@regalo.com<br />support@regalo.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">{t('contact.form.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t('contact.form.placeholders.name')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.form.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('contact.form.placeholders.email')}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">{t('contact.form.subject')}</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder={t('contact.form.placeholders.subject')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t('contact.form.message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder={t('contact.form.placeholders.message')}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">{t('contact.form.submit')}</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
