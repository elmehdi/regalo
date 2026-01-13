// Centralized Product Data Store
// This will be replaced with API calls in the future

export const products = [
    {
        id: 1,
        name: 'Luxury Gift Box',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
        description: 'A beautifully crafted luxury gift box perfect for any special occasion. Includes premium packaging and customization options.',

        // Enhanced fields
        gender: 'both',  // 'woman', 'man', 'both'
        kids: false,
        ratings: {
            average: 4.9,
            count: 128,
            breakdown: { 5: 100, 4: 20, 3: 5, 2: 2, 1: 1 }
        },
        paymentMode: ['cash_on_delivery', 'online_payment'], // Available payment methods
        feedbacks: [
            {
                id: 1,
                user: 'Sarah M.',
                rating: 5,
                comment: 'Beautiful packaging and excellent quality! Perfect for my wedding gifts.',
                date: '2026-01-05',
                verified: true
            },
            {
                id: 2,
                user: 'Ahmed K.',
                rating: 5,
                comment: 'Very impressed with the presentation.',
                date: '2026-01-03',
                verified: true
            }
        ],
        occasions: ['wedding', 'birthday', 'romantic', 'other'], // Multiple occasions
        badge: 'Bestseller'
    },
    {
        id: 2,
        name: 'Classic Watch',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800',
        description: 'Timeless elegance meets modern craftsmanship. This classic watch features a genuine leather strap and Swiss movement.',

        gender: 'man',
        kids: false,
        ratings: {
            average: 4.7,
            count: 85,
            breakdown: { 5: 60, 4: 18, 3: 5, 2: 1, 1: 1 }
        },
        paymentMode: ['cash_on_delivery', 'online_payment'],
        feedbacks: [
            {
                id: 1,
                user: 'Omar B.',
                rating: 5,
                comment: 'Great quality watch for the price. My husband loves it!',
                date: '2026-01-08',
                verified: true
            },
            {
                id: 2,
                user: 'Karim L.',
                rating: 4,
                comment: 'Good watch, though the strap could be better.',
                date: '2026-01-01',
                verified: false
            }
        ],
        occasions: ['birthday', 'office', 'graduation', 'retirement'],
        badge: null
    },
    {
        id: 3,
        name: 'Premium Perfume',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800',
        description: 'An exquisite fragrance with notes of jasmine, sandalwood, and vanilla. Long-lasting and perfect for evening wear.',

        gender: 'woman',
        kids: false,
        ratings: {
            average: 4.8,
            count: 156,
            breakdown: { 5: 110, 4: 35, 3: 8, 2: 2, 1: 1 }
        },
        paymentMode: ['cash_on_delivery', 'online_payment'],
        feedbacks: [
            {
                id: 1,
                user: 'Fatima Z.',
                rating: 5,
                comment: 'The scent is absolutely divine! Lasts all day.',
                date: '2026-01-10',
                verified: true
            },
            {
                id: 2,
                user: 'Nadia H.',
                rating: 5,
                comment: 'My favorite perfume now. Thank you!',
                date: '2026-01-07',
                verified: true
            },
            {
                id: 3,
                user: 'Leila M.',
                rating: 4,
                comment: 'Very nice scent, a bit strong for my taste.',
                date: '2025-12-28',
                verified: true
            }
        ],
        occasions: ['birthday', 'romantic', 'other'],
        badge: 'Popular'
    },
    {
        id: 4,
        name: 'Designer Bag',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
        description: 'Handcrafted from premium Italian leather. Spacious interior with multiple compartments for everyday luxury.',

        gender: 'woman',
        kids: false,
        ratings: {
            average: 4.9,
            count: 203,
            breakdown: { 5: 180, 4: 18, 3: 3, 2: 1, 1: 1 }
        },
        paymentMode: ['online_payment'], // High-value item, online only
        feedbacks: [
            {
                id: 1,
                user: 'Salma A.',
                rating: 5,
                comment: 'Worth every dirham! The quality is exceptional.',
                date: '2026-01-09',
                verified: true
            },
            {
                id: 2,
                user: 'Zineb K.',
                rating: 5,
                comment: 'Beautiful bag, exactly as described. Fast shipping!',
                date: '2026-01-04',
                verified: true
            }
        ],
        occasions: ['birthday', 'office', 'other'],
        badge: 'Luxury'
    },
    {
        id: 5,
        name: 'Stylish Sunglasses',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
        description: 'UV400 protection with polarized lenses. Lightweight titanium frame for all-day comfort.',

        gender: 'both',
        kids: true,  // Kids-friendly sunglasses for birthday gifts
        ratings: {
            average: 4.6,
            count: 92,
            breakdown: { 5: 55, 4: 28, 3: 7, 2: 1, 1: 1 }
        },
        paymentMode: ['cash_on_delivery', 'online_payment'],
        feedbacks: [
            {
                id: 1,
                user: 'Youssef T.',
                rating: 5,
                comment: 'Great sunglasses, very comfortable.',
                date: '2026-01-06',
                verified: true
            },
            {
                id: 2,
                user: 'Imane R.',
                rating: 4,
                comment: 'Nice design but a bit heavy.',
                date: '2025-12-30',
                verified: false
            }
        ],
        occasions: ['birthday'],  // Primarily for kids birthdays
        badge: null
    },
    {
        id: 6,
        name: 'Premium Sneakers',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
        description: 'Premium materials meet cutting-edge design. Memory foam insole for ultimate comfort.',

        gender: 'both',
        kids: true,  // Popular for kids and teens
        ratings: {
            average: 4.7,
            count: 145,
            breakdown: { 5: 95, 4: 38, 3: 9, 2: 2, 1: 1 }
        },
        paymentMode: ['online_payment'], // High-value item
        feedbacks: [
            {
                id: 1,
                user: 'Hassan M.',
                rating: 5,
                comment: 'Most comfortable sneakers I own!',
                date: '2026-01-11',
                verified: true
            },
            {
                id: 2,
                user: 'Samira L.',
                rating: 5,
                comment: 'Love the design and quality.',
                date: '2026-01-05',
                verified: true
            }
        ],
        occasions: ['birthday', 'graduation'],  // Great for kids and young adults
        badge: 'Trending'
    },
    {
        id: 7,
        name: 'Gold Jewelry Set',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
        description: '18K gold-plated jewelry set including necklace, bracelet, and earrings. Perfect for gifting.',

        gender: 'woman',
        kids: false,
        ratings: {
            average: 4.9,
            count: 234,
            breakdown: { 5: 210, 4: 18, 3: 4, 2: 1, 1: 1 }
        },
        paymentMode: ['online_payment'], // Valuable item, online only
        feedbacks: [
            {
                id: 1,
                user: 'Amina F.',
                rating: 5,
                comment: 'Stunning jewelry! My wife was thrilled.',
                date: '2026-01-10',
                verified: true
            },
            {
                id: 2,
                user: 'Khadija S.',
                rating: 5,
                comment: 'Gorgeous set, excellent craftsmanship.',
                date: '2026-01-08',
                verified: true
            },
            {
                id: 3,
                user: 'Meryem B.',
                rating: 5,
                comment: 'Best gift I ever received!',
                date: '2026-01-02',
                verified: true
            }
        ],
        occasions: ['wedding', 'birthday', 'romantic', 'other'],
        badge: 'Bestseller'
    },
    {
        id: 8,
        name: 'Leather Wallet',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
        description: 'Full-grain leather wallet with RFID blocking technology. Slim design with multiple card slots.',

        gender: 'man',
        kids: false,
        ratings: {
            average: 4.5,
            count: 67,
            breakdown: { 5: 38, 4: 22, 3: 5, 2: 1, 1: 1 }
        },
        paymentMode: ['cash_on_delivery', 'online_payment'],
        feedbacks: [
            {
                id: 1,
                user: 'Rachid N.',
                rating: 5,
                comment: 'Perfect wallet, slim and functional.',
                date: '2026-01-09',
                verified: true
            },
            {
                id: 2,
                user: 'Mehdi A.',
                rating: 4,
                comment: 'Good quality for the price.',
                date: '2026-01-01',
                verified: false
            }
        ],
        occasions: ['birthday', 'office', 'graduation', 'other'],
        badge: null
    }
]

// Helper function to get product by ID
export const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id))
}

// Helper function to get products by occasion
export const getProductsByOccasion = (occasionId) => {
    return products.filter(p => p.occasions.includes(occasionId))
}

// Helper function to get products by gender
export const getProductsByGender = (gender) => {
    if (gender === 'all' || gender === 'both') {
        return products
    }
    return products.filter(p => p.gender === gender || p.gender === 'both')
}

// Helper function to get products for kids
export const getKidsProducts = () => {
    return products.filter(p => p.kids === true)
}

// Future: This will be replaced with API calls
// Example:
// export const fetchProducts = async () => {
//   const response = await fetch('/api/products')
//   return response.json()
// }
