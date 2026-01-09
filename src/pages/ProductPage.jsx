import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../styles/ProductPage.css'

const products = [
  { id: 1, name: 'Luxury Gift Box', price: 49.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800', description: 'A beautifully crafted luxury gift box perfect for any special occasion. Includes premium packaging and customization options.' },
  { id: 2, name: 'Classic Watch', price: 129.99, image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800', description: 'Timeless elegance meets modern craftsmanship. This classic watch features a genuine leather strap and Swiss movement.' },
  { id: 3, name: 'Premium Perfume', price: 89.99, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800', description: 'An exquisite fragrance with notes of jasmine, sandalwood, and vanilla. Long-lasting and perfect for evening wear.' },
  { id: 4, name: 'Designer Bag', price: 199.99, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', description: 'Handcrafted from premium Italian leather. Spacious interior with multiple compartments for everyday luxury.' },
  { id: 5, name: 'Stylish Sunglasses', price: 79.99, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', description: 'UV400 protection with polarized lenses. Lightweight titanium frame for all-day comfort.' },
  { id: 6, name: 'Premium Sneakers', price: 159.99, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800', description: 'Premium materials meet cutting-edge design. Memory foam insole for ultimate comfort.' },
  { id: 7, name: 'Gold Jewelry Set', price: 249.99, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', description: '18K gold-plated jewelry set including necklace, bracelet, and earrings. Perfect for gifting.' },
  { id: 8, name: 'Leather Wallet', price: 59.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', description: 'Full-grain leather wallet with RFID blocking technology. Slim design with multiple card slots.' },
]

function ProductPage() {
  const { t } = useLanguage()
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="product-page not-found">
        <h1>{t('product.notFound')}</h1>
        <Link to="/shop" className="back-btn">{t('product.back')}</Link>
      </div>
    )
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-gallery">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info-page">
          <Link to="/shop" className="back-link">← {t('product.back')}</Link>
          <h1>{product.name}</h1>
          <p className="product-price-large">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          <div className="quantity-selector">
            <label>{t('product.quantity')}</label>
            <div className="quantity-controls">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>

          <button className="add-to-cart-btn">{t('product.addToCart')}</button>
          <button className="buy-now-btn">{t('product.buyNow')}</button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
