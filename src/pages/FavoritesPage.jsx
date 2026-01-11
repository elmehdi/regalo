import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import '../styles/FavoritesPage.css'

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const { addToCart, isInCart } = useCart()
  const { t } = useLanguage()
  const navigate = useNavigate()

  if (favorites.length === 0) {
    return (
      <div className="favorites-page empty">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="empty-favorites">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2>No favorites yet</h2>
          <p>Start adding products you love!</p>
          <Link to="/shop" className="continue-shopping">Browse Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </button>
        <h1>My Favorites</h1>
        
        <div className="favorites-grid">
          {favorites.map(product => (
            <div key={product.id} className="favorite-card">
              <button 
                className="remove-favorite"
                onClick={() => toggleFavorite(product)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <Link to={`/product/${product.id.replace(/[a-z]/g, '')}`} className="favorite-link">
                <img src={product.image} alt={product.name} />
                
                <div className="favorite-info">
                  <h3>{product.name}</h3>
                  
                  <div className="favorite-rating">
                    <span className="star">★</span>
                    <span>{product.rating}</span>
                    <span className="reviews">({product.reviews})</span>
                  </div>

                  <p className="favorite-price">{product.price.toFixed(2)} MAD</p>
                </div>
              </Link>

              <button 
                className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  addToCart(product)
                }}
              >
                {isInCart(product.id) ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span>In Cart</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 6h15l-1.5 9h-13z" />
                      <circle cx="9" cy="20" r="1" />
                      <circle cx="18" cy="20" r="1" />
                      <path d="M6 6L5 3H2" />
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage
