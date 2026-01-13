// API Service for Regalo App
// Connects to the management backend with local fallback

import { products, getProductById, getProductsByOccasion, getProductsByGender, getKidsProducts } from '../data/productsData.js'

// API base URL - can be configured via environment variable
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3002/api'

// Local fallback data for occasions and payment modes
const getLocalOccasions = () => {
  const occasionSet = new Set()
  products.forEach(product => {
    product.occasions.forEach(occasion => occasionSet.add(occasion))
  })
  
  return Array.from(occasionSet).map(slug => ({
    id: slug,
    slug: slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('_', ' ')
  }))
}

const getLocalPaymentModes = () => {
  const paymentSet = new Set()
  products.forEach(product => {
    product.paymentMode.forEach(mode => paymentSet.add(mode))
  })
  
  return Array.from(paymentSet).map(slug => ({
    id: slug,
    slug: slug,
    name: slug.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }))
}

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
    console.error('API unavailable, using local data:', error)
    
    // Fallback to local data
    let filteredProducts = products
    
    // Apply filters to local data
    if (filters.gender && filters.gender !== 'all') {
      filteredProducts = getProductsByGender(filters.gender)
    }
    
    if (filters.kids) {
      filteredProducts = filteredProducts.filter(p => p.kids === true)
    }
    
    if (filters.occasion) {
      filteredProducts = filteredProducts.filter(p => p.occasions.includes(filters.occasion))
    }
    
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(filters.minPrice))
    }
    
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(filters.maxPrice))
    }
    
    return filteredProducts
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
    console.error('API unavailable, using local data:', error)
    
    // Fallback to local data
    return getProductById(id)
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
    console.error('API unavailable, using local data:', error)
    
    // Fallback to local data
    return getProductsByOccasion(occasionId)
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
    console.error('API unavailable, using local data:', error)
    
    // Fallback to local data
    return getLocalOccasions()
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
    console.error('API unavailable, using local data:', error)
    
    // Fallback to local data
    return getLocalPaymentModes()
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
