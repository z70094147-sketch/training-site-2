import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ScreenType } from '../types';
import { PRODUCTS, INITIAL_CART_ITEMS } from '../data/products';

interface AppliedCoupon {
  code: string;
  discount: number;
  label: string;
}

interface AppContextType {
  currentScreen: ScreenType;
  selectedProductId: string;
  cartItems: CartItem[];
  wishlist: Set<string>;
  appliedCoupon: AppliedCoupon | null;
  deliveryNotes: string;
  searchQuery: string;
  activeShoppersCount: number;
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  toast: { message: string; subtext?: string; visible: boolean } | null;
  isCheckoutOpen: boolean;
  isSizeGuideOpen: boolean;
  isVisualSearchOpen: boolean;
  isNotificationsOpen: boolean;
  
  // Navigation & view
  navigateTo: (screen: ScreenType, productId?: string) => void;
  openProductDetail: (productId: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, color?: string, size?: string, qty?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  
  // Coupons & Notes
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  setDeliveryNotes: (notes: string) => void;
  
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Search & Modals
  setSearchQuery: (query: string) => void;
  setCheckoutOpen: (open: boolean) => void;
  setSizeGuideOpen: (open: boolean) => void;
  setVisualSearchOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  showToast: (message: string, subtext?: string) => void;
  
  // Totals calculations
  subtotal: number;
  totalDiscount: number;
  shippingFee: number;
  grandTotal: number;
  totalCartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('bhm-bomber-jacket');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set(['bhm-bomber-jacket']));
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>({
    code: 'ELO40',
    discount: 350,
    label: 'Bundle discount savings of Rs. 350',
  });
  const [deliveryNotes, setDeliveryNotes] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeShoppersCount, setActiveShoppersCount] = useState<number>(428);
  const [toast, setToast] = useState<{ message: string; subtext?: string; visible: boolean } | null>(null);

  // Modals
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isVisualSearchOpen, setVisualSearchOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  // Synchronized Countdown Timer (starts at 2d 1h 40m 29s)
  const [totalSecondsRemaining, setTotalSecondsRemaining] = useState<number>(
    2 * 86400 + 1 * 3600 + 40 * 60 + 29
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subtle live shopper count flutter
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShoppersCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(410, Math.min(445, prev + delta));
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(totalSecondsRemaining / 86400);
  const hours = Math.floor((totalSecondsRemaining % 86400) / 3600);
  const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
  const seconds = totalSecondsRemaining % 60;

  const showToast = (message: string, subtext?: string) => {
    setToast({ message, subtext, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 2400);
  };

  const navigateTo = (screen: ScreenType, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentScreen('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, color?: string, size?: string, qty = 1) => {
    const chosenColor = color || (product.colors[0]?.name ?? 'Default');
    const chosenSize = size || (product.sizes[0] ?? 'Free Size');
    
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        discountPct: product.discountPct,
        image: product.image,
        selectedColor: chosenColor,
        selectedSize: chosenSize,
        quantity: qty,
        badge: `-${product.discountPct}%`,
      };

      return [newItem, ...prev];
    });

    showToast(`${product.name}`, 'Added to bag!');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showToast(`${item.name}`, 'Removed from bag');
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromo = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BUNDLE10') {
      const calcDiscount = Math.round(subtotal * 0.1);
      setAppliedCoupon({
        code: 'BUNDLE10',
        discount: calcDiscount > 0 ? calcDiscount : 300,
        label: '10% Extra Bundle Savings',
      });
      showToast('Code BUNDLE10 applied!', 'Saved 10% on your surplus bundle');
      return true;
    } else if (cleanCode === 'ELO40') {
      setAppliedCoupon({
        code: 'ELO40',
        discount: 350,
        label: 'Bundle discount savings of Rs. 350',
      });
      showToast('Code ELO40 applied!', 'Rs. 350 saved on your order');
      return true;
    } else if (cleanCode === 'CLEARANCE20') {
      const calcDiscount = Math.round(subtotal * 0.2);
      setAppliedCoupon({
        code: 'CLEARANCE20',
        discount: calcDiscount,
        label: 'Surplus Runout 20% Off',
      });
      showToast('Code CLEARANCE20 applied!', '20% off entire bag');
      return true;
    } else if (cleanCode) {
      showToast('Invalid Coupon Code', 'Try BUNDLE10 or ELO40');
      return false;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed from Wishlist');
      } else {
        next.add(productId);
        showToast('Saved to your Wishlist!');
      }
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.has(productId);

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const shippingFee = 0; // Prepaid is free nationwide across PK
  const grandTotal = Math.max(0, subtotal - totalDiscount + shippingFee);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        selectedProductId,
        cartItems,
        wishlist,
        appliedCoupon,
        deliveryNotes,
        searchQuery,
        activeShoppersCount,
        countdown: { days, hours, minutes, seconds },
        toast,
        isCheckoutOpen,
        isSizeGuideOpen,
        isVisualSearchOpen,
        isNotificationsOpen,
        navigateTo,
        openProductDetail,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromo,
        removePromo,
        setDeliveryNotes,
        toggleWishlist,
        isWishlisted,
        setSearchQuery,
        setCheckoutOpen,
        setSizeGuideOpen,
        setVisualSearchOpen,
        setNotificationsOpen,
        showToast,
        subtotal,
        totalDiscount,
        shippingFee,
        grandTotal,
        totalCartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
