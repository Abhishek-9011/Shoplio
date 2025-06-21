// types.ts

// Basic Product Interface
export interface Product {
  _id: string;
  title: string;
  description: string;
  image: string; // Can be single image or array for multiple images
  price: number;
  discountedPrice?: number; // Optional for discounted items
  stock: number;
  rating?: number; // Optional rating (0-5)
  category: string;
  brand?: string; // Optional brand name
  createdAt?: Date | string; // When the product was added
  updatedAt?: Date | string; // Last update timestamp
  features?: ProductFeature[]; // Array of product features
  reviews?: Review[]; // Array of customer reviews
  variants?: ProductVariant[]; // For products with different colors/sizes
}

// For products with multiple variants (colors, sizes, etc.)
export interface ProductVariant {
  id: string;
  color?: string;
  size?: string;
  sku: string;
  price?: number; // Optional override for variant-specific pricing
  stock: number;
  image?: string; // Variant-specific image
}

// Product features/specifications
export interface ProductFeature {
  name: string;
  value: string;
  icon?: string; // Optional icon name
}

// Customer review
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date | string;
  verifiedPurchase?: boolean;
}

// Product category
export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

// API response format
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  products?: Product[]; // For product lists
  product?: Product; // For single product
  count?: number; // For pagination
  totalPages?: number;
}

// Pagination params
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
}

// Filter options
export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  searchQuery?: string;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}

// Cart item
export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
}

// User type (if needed for reviews/orders)
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}