export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  badge?: string;
  badgeType?: 'deal' | 'savings' | 'neutral' | 'dark';
  category: 'men' | 'women' | 'kids' | 'unisex';
  tags: string[];
  stockLeft: number;
  stockLabel?: string;
  stockLevelPercent?: number;
  image: string;
  additionalImages?: string[];
  colors: {
    name: string;
    hex: string;
    activeRingClass?: string;
  }[];
  sizes: string[];
  rating: number;
  reviewsCount: number;
  soldToday?: number;
  description?: string;
  outerFabric?: string;
  interiorFabric?: string;
  fitNote?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  image: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  badge?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  isVerified: boolean;
  date: string;
  rating: number;
  comment: string;
  initials: string;
}

export type ScreenType = 'home' | 'deals' | 'pdp' | 'cart' | 'categories';
