// API Service for Regalo App
// Connects to the management backend

// API base URL - can be configured via environment variable
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3002/api'

// Fetch all products
export const fetchProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams()
    
    if (filters.gender) params.append('gender', filters.gender)
    if (filters.kids) params.append('kids', 'true')
    if (filters.occasion) params.append('occasion', filters.occasion)
    if (filters.minPrice) params.append('minPrice', filters.minPrice)
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
    
    const url = `${API_BASE}/products${params.toString() ? '?' + params.toString() : ''}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch product')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// Fetch products by occasion
export const fetchProductsByOccasion = async (occasionId) => {
  try {
    const response = await fetch(`${API_BASE}/products?occasion=${occasionId}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching products by occasion:', error)
    throw error
  }
}

// Fetch all occasions
export const fetchOccasions = async () => {
  try {
    const response = await fetch(`${API_BASE}/occasions`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch occasions')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching occasions:', error)
    throw error
  }
}

// Fetch all payment modes
export const fetchPaymentModes = async () => {
  try {
    const response = await fetch(`${API_BASE}/payment-modes`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment modes')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching payment modes:', error)
    throw error
  }
}

// Health check
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`)
    return response.ok
  } catch (error) {
    return false
  }
}
