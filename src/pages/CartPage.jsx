import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import '../styles/CartPage.css'

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { t } = useLanguage()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="empty-cart">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6h15l-1.5 9h-13z" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M6 6L5 3H2" />
          </svg>
          <h2>Your cart is empty</h2>
          <p>Add some amazing gifts to your cart!</p>
          <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="clear-cart">Clear All</button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{parseFloat(item.price).toFixed(2)} MAD</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  
                  <p className="cart-item-total">{(parseFloat(item.price) * item.quantity).toFixed(2)} MAD</p>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="remove-item"
                    aria-label="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{getCartTotal().toFixed(2)} MAD</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>{getCartTotal().toFixed(2)} MAD</span>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
            <Link to="/shop" className="continue-shopping-link">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
