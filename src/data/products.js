import tapImage from '../assets/tap.jpg'
import showerImage from '../assets/shower.jpg'
import basinImage from '../assets/basin.jpg'

export const productCategories = ['All Categories', 'Taps', 'Showers', 'Basins', 'Accessories']

export const pricingLists = ['Default Price List', 'Dealer Price', 'Distributor Price', 'Retail Price']

export const products = [
  {
    id: 'TAP-204-CH',
    sku: 'TAP-204-CH',
    name: 'UltraFlow Pillar Tap',
    category: 'Taps',
    type: 'STANDARD TAP',
    typeColor: { bg: '#DBEAFE', text: '#2563EB' },
    defaultPrice: 2450,
    buyerPrice: 2450,
    image: tapImage,
  },
  {
    id: 'SHW-881-MS',
    sku: 'SHW-881-MS',
    name: 'RainForce Square Shower',
    category: 'Showers',
    type: 'LUXURY SHOWER',
    typeColor: { bg: '#F3E8FF', text: '#9333EA' },
    defaultPrice: 4120,
    buyerPrice: 4120,
    image: showerImage,
  },
  {
    id: 'BSN-102-CE',
    sku: 'BSN-102-CE',
    name: 'Zenith Countertop Basin',
    category: 'Basins',
    type: 'CERAMIC WARE',
    typeColor: { bg: '#DCFCE7', text: '#059669' },
    defaultPrice: 8900,
    buyerPrice: 8900,
    image: basinImage,
  },
]
