import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import '../styles/CategoryPage.css'

// Occasion configurations with theme colors
const occasionConfig = {
  'wedding': { 
    accent: '#D4AF37', 
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #2a2535 50%, #1a1a2e 100%)'
  },
  'birthday': { 
    accent: '#FF6B6B', 
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #FF6B6B 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #2e1f2a 50%, #1a1a2e 100%)'
  },
  'new-baby': { 
    accent: '#81ECEC', 
    gradient: 'linear-gradient(135deg, #81ECEC 0%, #DFE6E9 50%, #81ECEC 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #1f2e2e 50%, #1a1a2e 100%)'
  },
  'romantic': { 
    accent: '#E84393', 
    gradient: 'linear-gradient(135deg, #E84393 0%, #FD79A8 50%, #E84393 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #2e1a2a 50%, #1a1a2e 100%)'
  },
  'new-house': { 
    accent: '#00B894', 
    gradient: 'linear-gradient(135deg, #00B894 0%, #55EFC4 50%, #00B894 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #1a2e25 50%, #1a1a2e 100%)'
  },
  'retirement': { 
    accent: '#6C5CE7', 
    gradient: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #6C5CE7 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #251a2e 50%, #1a1a2e 100%)'
  },
  'office': { 
    accent: '#0984E3', 
    gradient: 'linear-gradient(135deg, #0984E3 0%, #74B9FF 50%, #0984E3 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #1a252e 50%, #1a1a2e 100%)'
  },
  'inauguration': { 
    accent: '#FDCB6E', 
    gradient: 'linear-gradient(135deg, #FDCB6E 0%, #FFEAA7 50%, #FDCB6E 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #2e2a1a 50%, #1a1a2e 100%)'
  },
  'graduation': { 
    accent: '#00CEC9', 
    gradient: 'linear-gradient(135deg, #00CEC9 0%, #81ECEC 50%, #00CEC9 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #1a2e2e 50%, #1a1a2e 100%)'
  },
  'other': { 
    accent: '#D4AF37', 
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%)',
    bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #2a2535 50%, #1a1a2e 100%)'
  },
}

// Sample products for each occasion
const allProducts = {
  'wedding': [
    { id: 'w1', name: 'Crystal Champagne Set', price: 189.99, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800', rating: 4.9, reviews: 128, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'w2', name: 'Personalized Photo Frame', price: 79.99, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800', rating: 4.7, reviews: 95, forHim: true, forHer: true },
    { id: 'w3', name: 'Silk Robe Set', price: 149.99, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800', rating: 4.8, reviews: 76, badge: 'New', forHim: false, forHer: true },
    { id: 'w4', name: 'Luxury Cufflinks', price: 129.99, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', rating: 4.6, reviews: 54, forHim: true, forHer: false },
    { id: 'w5', name: 'Couples Spa Set', price: 199.99, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800', rating: 4.9, reviews: 112, badge: 'Popular', forHim: true, forHer: true },
    { id: 'w6', name: 'Engraved Watch Box', price: 89.99, image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800', rating: 4.5, reviews: 67, forHim: true, forHer: false },
    { id: 'w7', name: 'Pearl Jewelry Set', price: 299.99, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', rating: 4.8, reviews: 89, badge: 'Luxury', forHim: false, forHer: true },
    { id: 'w8', name: 'Premium Wine Collection', price: 249.99, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800', rating: 4.7, reviews: 143, forHim: true, forHer: true },
  ],
  'birthday': [
    { id: 'b1', name: 'Smart Watch Pro', price: 299.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800', rating: 4.8, reviews: 234, badge: 'Trending', forHim: true, forHer: true },
    { id: 'b2', name: 'Wireless Earbuds', price: 149.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', rating: 4.7, reviews: 189, forHim: true, forHer: true },
    { id: 'b3', name: 'Designer Perfume', price: 129.99, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800', rating: 4.9, reviews: 156, badge: 'Bestseller', forHim: false, forHer: true },
    { id: 'b4', name: 'Leather Journal', price: 59.99, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800', rating: 4.6, reviews: 87, forHim: true, forHer: true },
    { id: 'b5', name: 'Premium Cologne', price: 119.99, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800', rating: 4.8, reviews: 134, forHim: true, forHer: false },
    { id: 'b6', name: 'Gourmet Chocolate Box', price: 69.99, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800', rating: 4.9, reviews: 201, badge: 'Popular', forHim: true, forHer: true },
    { id: 'b7', name: 'Makeup Palette', price: 89.99, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', rating: 4.7, reviews: 167, forHim: false, forHer: true },
    { id: 'b8', name: 'Gaming Accessories Set', price: 179.99, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800', rating: 4.6, reviews: 112, forHim: true, forHer: true },
  ],
  'new-baby': [
    { id: 'nb1', name: 'Baby Milestone Set', price: 79.99, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800', rating: 4.9, reviews: 156, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'nb2', name: 'Organic Blanket Set', price: 89.99, image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800', rating: 4.8, reviews: 134, forHim: true, forHer: true },
    { id: 'nb3', name: 'New Mom Care Package', price: 149.99, image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800', rating: 4.7, reviews: 98, badge: 'Popular', forHim: false, forHer: true },
    { id: 'nb4', name: 'Dad Survival Kit', price: 69.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', rating: 4.6, reviews: 76, forHim: true, forHer: false },
    { id: 'nb5', name: 'Memory Book', price: 49.99, image: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=800', rating: 4.8, reviews: 187, forHim: true, forHer: true },
    { id: 'nb6', name: 'Premium Diaper Bag', price: 129.99, image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800', rating: 4.7, reviews: 145, badge: 'New', forHim: true, forHer: true },
  ],
  'romantic': [
    { id: 'r1', name: 'Rose Gold Jewelry', price: 199.99, image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800', rating: 4.9, reviews: 189, badge: 'Bestseller', forHim: false, forHer: true },
    { id: 'r2', name: 'Couples Massage Set', price: 149.99, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', rating: 4.8, reviews: 156, forHim: true, forHer: true },
    { id: 'r3', name: 'Luxury Watch', price: 349.99, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800', rating: 4.7, reviews: 134, badge: 'Luxury', forHim: true, forHer: false },
    { id: 'r4', name: 'Silk Scarf Collection', price: 129.99, image: 'https://images.unsplash.com/photo-1584030373081-f37408f8f5b6?w=800', rating: 4.6, reviews: 98, forHim: false, forHer: true },
    { id: 'r5', name: 'Premium Cologne Duo', price: 179.99, image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800', rating: 4.8, reviews: 167, badge: 'Popular', forHim: true, forHer: false },
    { id: 'r6', name: 'Romantic Candle Set', price: 79.99, image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800', rating: 4.9, reviews: 201, forHim: true, forHer: true },
    { id: 'r7', name: 'Diamond Pendant', price: 499.99, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', rating: 4.9, reviews: 78, badge: 'Premium', forHim: false, forHer: true },
    { id: 'r8', name: 'Leather Wallet Set', price: 119.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', rating: 4.7, reviews: 145, forHim: true, forHer: false },
  ],
  'new-house': [
    { id: 'nh1', name: 'Smart Home Kit', price: 249.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', rating: 4.8, reviews: 167, badge: 'Trending', forHim: true, forHer: true },
    { id: 'nh2', name: 'Luxury Bedding Set', price: 199.99, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', rating: 4.7, reviews: 134, forHim: true, forHer: true },
    { id: 'nh3', name: 'Kitchen Appliance Set', price: 299.99, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', rating: 4.9, reviews: 189, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'nh4', name: 'Indoor Plant Collection', price: 89.99, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800', rating: 4.6, reviews: 98, forHim: true, forHer: true },
    { id: 'nh5', name: 'Decorative Art Set', price: 149.99, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800', rating: 4.8, reviews: 112, badge: 'Popular', forHim: true, forHer: true },
    { id: 'nh6', name: 'Premium Toolbox', price: 179.99, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800', rating: 4.7, reviews: 87, forHim: true, forHer: false },
  ],
  'retirement': [
    { id: 'rt1', name: 'Golf Accessories Set', price: 199.99, image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800', rating: 4.8, reviews: 134, badge: 'Popular', forHim: true, forHer: true },
    { id: 'rt2', name: 'Travel Luggage Set', price: 299.99, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', rating: 4.9, reviews: 167, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'rt3', name: 'Gardening Kit', price: 129.99, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800', rating: 4.7, reviews: 98, forHim: true, forHer: true },
    { id: 'rt4', name: 'Luxury Robe & Slippers', price: 149.99, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', rating: 4.6, reviews: 87, forHim: true, forHer: true },
    { id: 'rt5', name: 'Premium Watch', price: 449.99, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800', rating: 4.9, reviews: 156, badge: 'Luxury', forHim: true, forHer: false },
    { id: 'rt6', name: 'Spa Day Package', price: 179.99, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', rating: 4.8, reviews: 112, forHim: false, forHer: true },
  ],
  'office': [
    { id: 'o1', name: 'Executive Pen Set', price: 129.99, image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800', rating: 4.8, reviews: 145, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'o2', name: 'Desk Organizer', price: 79.99, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800', rating: 4.7, reviews: 112, forHim: true, forHer: true },
    { id: 'o3', name: 'Noise-Canceling Headphones', price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', rating: 4.9, reviews: 189, badge: 'Trending', forHim: true, forHer: true },
    { id: 'o4', name: 'Leather Briefcase', price: 199.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', rating: 4.6, reviews: 98, forHim: true, forHer: false },
    { id: 'o5', name: 'Elegant Tote Bag', price: 159.99, image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800', rating: 4.8, reviews: 134, badge: 'Popular', forHim: false, forHer: true },
    { id: 'o6', name: 'Smart Planner', price: 49.99, image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800', rating: 4.7, reviews: 167, forHim: true, forHer: true },
  ],
  'inauguration': [
    { id: 'i1', name: 'Premium Champagne Set', price: 199.99, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800', rating: 4.9, reviews: 156, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'i2', name: 'Decorative Plaque', price: 129.99, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800', rating: 4.7, reviews: 98, forHim: true, forHer: true },
    { id: 'i3', name: 'Flower Arrangement', price: 149.99, image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800', rating: 4.8, reviews: 134, badge: 'Popular', forHim: true, forHer: true },
    { id: 'i4', name: 'Crystal Award', price: 249.99, image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800', rating: 4.6, reviews: 87, forHim: true, forHer: true },
    { id: 'i5', name: 'Gift Basket Deluxe', price: 179.99, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800', rating: 4.9, reviews: 167, badge: 'Premium', forHim: true, forHer: true },
    { id: 'i6', name: 'Success Book Collection', price: 89.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', rating: 4.7, reviews: 112, forHim: true, forHer: true },
  ],
  'graduation': [
    { id: 'g1', name: 'Laptop Backpack', price: 129.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', rating: 4.8, reviews: 189, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'g2', name: 'Professional Portfolio', price: 79.99, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800', rating: 4.7, reviews: 134, forHim: true, forHer: true },
    { id: 'g3', name: 'Personalized Pen Set', price: 99.99, image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800', rating: 4.6, reviews: 98, forHim: true, forHer: true },
    { id: 'g4', name: 'Success Planner', price: 49.99, image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800', rating: 4.8, reviews: 156, badge: 'Popular', forHim: true, forHer: true },
    { id: 'g5', name: 'Professional Watch', price: 249.99, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800', rating: 4.9, reviews: 167, badge: 'Trending', forHim: true, forHer: false },
    { id: 'g6', name: 'Inspirational Book Set', price: 69.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', rating: 4.7, reviews: 112, forHim: true, forHer: true },
    { id: 'g7', name: 'Elegant Bracelet', price: 159.99, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800', rating: 4.8, reviews: 87, forHim: false, forHer: true },
    { id: 'g8', name: 'Tech Gadget Bundle', price: 199.99, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800', rating: 4.6, reviews: 145, forHim: true, forHer: true },
  ],
  'other': [
    { id: 'ot1', name: 'Luxury Gift Box', price: 149.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800', rating: 4.9, reviews: 234, badge: 'Bestseller', forHim: true, forHer: true },
    { id: 'ot2', name: 'Premium Watch', price: 299.99, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800', rating: 4.8, reviews: 189, forHim: true, forHer: false },
    { id: 'ot3', name: 'Designer Perfume', price: 129.99, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800', rating: 4.7, reviews: 156, forHim: false, forHer: true },
    { id: 'ot4', name: 'Gourmet Basket', price: 99.99, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800', rating: 4.6, reviews: 134, badge: 'Popular', forHim: true, forHer: true },
    { id: 'ot5', name: 'Spa Collection', price: 179.99, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800', rating: 4.8, reviews: 167, forHim: true, forHer: true },
    { id: 'ot6', name: 'Personalized Album', price: 69.99, image: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=800', rating: 4.9, reviews: 145, forHim: true, forHer: true },
    { id: 'ot7', name: 'Gold Jewelry Set', price: 249.99, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', rating: 4.7, reviews: 112, badge: 'Luxury', forHim: false, forHer: true },
    { id: 'ot8', name: 'Leather Accessories', price: 119.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', rating: 4.6, reviews: 98, forHim: true, forHer: false },
  ],
}

function CategoryPage() {
  const { t, language } = useLanguage()
  const { addToCart, isInCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { occasionId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  const activeCategory = searchParams.get('category') || 'all'
  const config = occasionConfig[occasionId] || occasionConfig['other']
  const products = allProducts[occasionId] || allProducts['other']

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [occasionId, activeCategory])

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    // Filter by gender
    if (activeCategory === 'him') {
      result = result.filter(p => p.forHim)
    } else if (activeCategory === 'her') {
      result = result.filter(p => p.forHer)
    }
    
    // Filter by price
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      result = result.filter(p => p.price >= min && (max ? p.price <= max : true))
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Featured - keep original order
        break
    }
    
    return result
  }, [products, activeCategory, priceRange, sortBy])

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  const getThemeClass = () => {
    if (activeCategory === 'him') return 'theme-him'
    if (activeCategory === 'her') return 'theme-her'
    return ''
  }

  const isRTL = language === 'ar'

  return (
    <div 
      className={`category-page ${getThemeClass()}`}
      style={{ 
        '--accent-color': config.accent,
        '--accent-gradient': config.gradient,
        background: config.bgGradient
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background Elements */}
      <div className="category-bg-effects">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
      </div>

      {/* Desktop Hero Section */}
      <div className="category-hero desktop-hero">
        <div className="hero-content">
          <Link to="/shop" className="back-link">
            <span className="back-arrow">{isRTL ? '→' : '←'}</span>
            <span>{t('category.backToShop')}</span>
          </Link>
          
          <h1 className="hero-title">{t(`occasions.${occasionId}.name`)}</h1>
          <p className="hero-subtitle">
            {activeCategory === 'him' 
              ? t(`occasions.${occasionId}.descriptionHim`)
              : activeCategory === 'her'
              ? t(`occasions.${occasionId}.descriptionHer`)
              : t(`occasions.${occasionId}.description`)
            }
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{filteredProducts.length}</span>
              <span className="stat-label">{t('category.products')}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">4.8</span>
              <span className="stat-label">{t('category.avgRating')}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">2K+</span>
              <span className="stat-label">{t('category.reviews')}</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <img 
            src={`/assets/${occasionId === 'new-baby' ? 'new%20born' : occasionId === 'new-house' ? 'new%20house' : occasionId}.png`} 
            alt={t(`occasions.${occasionId}.name`)}
            className="hero-image"
          />
        </div>
      </div>

      {/* Mobile Header - Compact App-Style */}
      <div className="mobile-category-view">
        {/* Immersive Hero Banner */}
        <div className="mobile-hero-banner">
          <div className="mobile-hero-bg">
            <img 
              src={`/assets/${occasionId === 'new-baby' ? 'new%20born' : occasionId === 'new-house' ? 'new%20house' : occasionId}.png`} 
              alt=""
            />
            <div className="mobile-hero-overlay" />
          </div>
          
          <div className="mobile-hero-nav">
            <Link to="/shop" className="mobile-nav-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={isRTL ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
              </svg>
            </Link>
            <button className="mobile-nav-btn" onClick={() => setShowFilters(!showFilters)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>

          <div className="mobile-hero-content">
            <div className="mobile-hero-badge">
              <span>{t(`occasions.${occasionId}.name`)}</span>
            </div>
            <h1 className="mobile-hero-title">
              {activeCategory === 'him' 
                ? t(`occasions.${occasionId}.descriptionHim`)
                : activeCategory === 'her'
                ? t(`occasions.${occasionId}.descriptionHer`)
                : t(`occasions.${occasionId}.description`)
              }
            </h1>
            <div className="mobile-hero-meta">
              <span>{filteredProducts.length} {t('category.products')}</span>
              <span className="meta-dot">•</span>
              <span>★ 4.8 {t('category.avgRating')}</span>
            </div>
          </div>
        </div>

        {/* Floating Category Tabs */}
        <div className="mobile-category-tabs">
          <div className="tabs-scroll">
            <button
              className={`tab-btn tab-all ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
              style={activeCategory === 'all' ? { background: 'linear-gradient(135deg, #D4AF37, #F5E6A3)', color: '#1a1a2e' } : {}}
            >
              <span>{t('shop.filters.all')}</span>
            </button>
            <button
              className={`tab-btn tab-him ${activeCategory === 'him' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('him')}
              style={activeCategory === 'him' ? { background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', color: '#fff' } : {}}
            >
              <span>{t('shop.filters.forHim')}</span>
            </button>
            <button
              className={`tab-btn tab-her ${activeCategory === 'her' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('her')}
              style={activeCategory === 'her' ? { background: 'linear-gradient(135deg, #ec4899, #f472b6)', color: '#fff' } : {}}
            >
              <span>{t('shop.filters.forHer')}</span>
            </button>
          </div>
        </div>

        {/* Sort Pills */}
        <div className="mobile-sort-pills">
          {[
            { value: 'featured', label: '🔥 ' + t('category.sort.featured') },
            { value: 'popular', label: '❤️ ' + t('category.sort.popular') },
            { value: 'price-low', label: '💰 ' + t('category.sort.priceLow') },
            { value: 'rating', label: '⭐ ' + t('category.sort.rating') },
          ].map(option => (
            <button
              key={option.value}
              className={`sort-pill ${sortBy === option.value ? 'active' : ''}`}
              onClick={() => setSortBy(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Premium Card Feed */}
        <div className="mobile-card-feed">
          {isLoading ? (
            // Skeleton Loading
            [...Array(4)].map((_, i) => (
              <div key={i} className="mobile-skeleton-card">
                <div className="skeleton-shine" />
              </div>
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="mobile-empty-state">
              <div className="empty-icon">🎁</div>
              <h3>{t('category.noProducts')}</h3>
              <p>{t('category.noProductsDesc')}</p>
              <button onClick={() => { handleCategoryChange('all'); setPriceRange('all') }}>
                {t('category.clearFilters')}
              </button>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="mobile-premium-card"
                style={{ '--i': index }}
                onClick={() => navigate(`/product/${product.id.replace(/[a-z]/g, '')}`)}
              >
                <div className="premium-card-image">
                  <img src={product.image} alt={product.name} />
                  <div className="card-image-overlay" />
                  
                  {product.badge && (
                    <div className={`premium-badge badge-${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </div>
                  )}
                  
                  <button 
                    className={`premium-wishlist ${isFavorite(product.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(product)
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={isFavorite(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <div className="premium-card-rating">
                    <span className="rating-star">★</span>
                    <span>{product.rating}</span>
                    <span className="rating-count">({product.reviews})</span>
                  </div>
                </div>
                
                <div className="premium-card-content">
                  <div className="card-content-main">
                    <h3 className="premium-card-name">{product.name}</h3>
                    <p className="premium-card-price">{product.price.toFixed(2)} MAD</p>
                  </div>
                  
                  <button 
                    className={`premium-add-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {isInCart(product.id) ? (
                        <path d="M5 13l4 4L19 7" />
                      ) : (
                        <path d="M12 5v14M5 12h14" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Shop Related */}
        <div className="mobile-quick-shop">
          <h3>{t('category.relatedOccasions')}</h3>
          <div className="quick-shop-scroll">
            {Object.keys(occasionConfig)
              .filter(id => id !== occasionId)
              .slice(0, 5)
              .map(id => (
                <Link 
                  key={id} 
                  to={`/shop/${id}${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`}
                  className="quick-shop-item"
                >
                  <div className="quick-shop-image">
                    <img 
                      src={`/assets/${id === 'new-baby' ? 'new%20born' : id === 'new-house' ? 'new%20house' : id}.png`}
                      alt={t(`occasions.${id}.name`)}
                    />
                  </div>
                  <span>{t(`occasions.${id}.name`)}</span>
                </Link>
              ))
            }
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="filters-left">
          <div className="gender-filters">
            <button
              className={`gender-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
              style={activeCategory === 'all' ? { background: 'linear-gradient(135deg, #D4AF37, #F5E6A3)', color: '#1a1a2e', borderColor: '#D4AF37' } : {}}
            >
              {t('shop.filters.all')}
            </button>
            <button
              className={`gender-btn for-him ${activeCategory === 'him' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('him')}
              style={activeCategory === 'him' ? { background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', color: '#fff', borderColor: '#3b82f6' } : {}}
            >
              {t('shop.filters.forHim')}
            </button>
            <button
              className={`gender-btn for-her ${activeCategory === 'her' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('her')}
              style={activeCategory === 'her' ? { background: 'linear-gradient(135deg, #ec4899, #f472b6)', color: '#fff', borderColor: '#ec4899' } : {}}
            >
              {t('shop.filters.forHer')}
            </button>
          </div>
        </div>

        <div className="filters-right">
          <button 
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
              <circle cx="6" cy="12" r="2" />
              <circle cx="10" cy="18" r="2" />
            </svg>
            {t('category.filters')}
          </button>

          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="4" rx="1" />
                <rect x="3" y="10" width="18" height="4" rx="1" />
                <rect x="3" y="16" width="18" height="4" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Filters Panel */}
      <div className={`filters-panel ${showFilters ? 'open' : ''}`}>
        <div className="filter-group">
          <label>{t('category.sortBy')}</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">{t('category.sort.featured')}</option>
            <option value="price-low">{t('category.sort.priceLow')}</option>
            <option value="price-high">{t('category.sort.priceHigh')}</option>
            <option value="rating">{t('category.sort.rating')}</option>
            <option value="popular">{t('category.sort.popular')}</option>
          </select>
        </div>

        <div className="filter-group">
          <label>{t('category.priceRange')}</label>
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="all">{t('category.price.all')}</option>
            <option value="0-100">{t('category.price.under100')}</option>
            <option value="100-200">100 - 200 MAD</option>
            <option value="200-300">200 - 300 MAD</option>
            <option value="300-999999">{t('category.price.over300')}</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`products-section ${viewMode}`}>
        {isLoading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="product-skeleton">
                <div className="skeleton-image" />
                <div className="skeleton-content">
                  <div className="skeleton-title" />
                  <div className="skeleton-price" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🎁</div>
            <h3>{t('category.noProducts')}</h3>
            <p>{t('category.noProductsDesc')}</p>
            <button onClick={() => { handleCategoryChange('all'); setPriceRange('all') }}>
              {t('category.clearFilters')}
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Grid */}
            <div className={`products-grid desktop-grid ${viewMode}`}>
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-card"
                  style={{ '--card-index': index }}
                  onClick={() => navigate(`/product/${product.id.replace(/[a-z]/g, '')}`)}
                >
                  {product.badge && (
                    <span className={`product-badge badge-${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </span>
                  )}
                  
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-overlay">
                      <button className="quick-view-btn">{t('category.quickView')}</button>
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                      <span className="rating-text">{product.rating} ({product.reviews})</span>
                    </div>

                    <div className="product-price-row">
                      <span className="product-price">{product.price.toFixed(2)} MAD</span>
                      <button 
                        className={`add-to-cart ${isInCart(product.id) ? 'in-cart' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {isInCart(product.id) ? (
                            <path d="M5 13l4 4L19 7" />
                          ) : (
                            <>
                              <path d="M6 6h15l-1.5 9h-13z" />
                              <circle cx="9" cy="20" r="1" />
                              <circle cx="18" cy="20" r="1" />
                              <path d="M6 6L5 3H2" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Related Occasions */}
      <div className="related-occasions">
        <h2>{t('category.relatedOccasions')}</h2>
        <div className="occasions-slider">
          {Object.keys(occasionConfig)
            .filter(id => id !== occasionId)
            .slice(0, 4)
            .map(id => (
              <Link 
                key={id} 
                to={`/shop/${id}${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`}
                className="related-occasion-card"
              >
                <div className="related-image">
                  <img 
                    src={`/assets/${id === 'new-baby' ? 'new%20born' : id === 'new-house' ? 'new%20house' : id}.png`}
                    alt={t(`occasions.${id}.name`)}
                  />
                </div>
                <span className="related-name">{t(`occasions.${id}.name`)}</span>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
