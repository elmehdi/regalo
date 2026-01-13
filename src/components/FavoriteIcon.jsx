import { useFavorites } from '../context/FavoritesContext'

export default function FavoriteIcon({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  return (
    <button
      className={`favorite-icon${favorite ? ' active' : ''}`}
      onClick={() => toggleFavorite(product)}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        zIndex: 2
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill={favorite ? '#D4AF37' : 'none'}
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  )
}
