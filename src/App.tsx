import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CrazyDealsScreen } from './components/CrazyDealsScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CheckoutModal } from './components/CheckoutModal';
import { NotificationsModal } from './components/NotificationsModal';
import { VisualSearchModal } from './components/VisualSearchModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col justify-start items-center">
      <div className="w-full max-w-md min-h-screen bg-[#f7f9fb] flex flex-col relative shadow-[0_0_40px_rgba(0,0,0,0.06)]">
        {/* Top Fixed Header */}
        <Header />

        {/* Dynamic Main Body */}
        <main
          className={`flex-1 w-full bg-[#f7f9fb] ${
            currentScreen === 'pdp' ? 'pt-16' : 'pt-28'
          }`}
        >
          {currentScreen === 'home' && <HomeScreen />}
          {currentScreen === 'deals' && <CrazyDealsScreen />}
          {currentScreen === 'pdp' && <ProductDetailScreen />}
          {currentScreen === 'cart' && <CartScreen />}
          {currentScreen === 'categories' && <CategoriesScreen />}
        </main>

        {/* Global Modals & Notifications */}
        <BottomNav />
        <SizeGuideModal />
        <CheckoutModal />
        <NotificationsModal />
        <VisualSearchModal />
        <Toast />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
