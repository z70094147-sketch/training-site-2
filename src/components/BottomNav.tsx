import React from 'react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo, totalCartCount } = useApp();

  // If in PDP, we hide the bottom tab bar to show the sticky Add to Bag / Quick Buy action bar (as seen in Image 5 & 6)
  if (currentScreen === 'pdp') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#f7f9fb]/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(17,24,39,0.06)] border-t border-[#E2E8F0]">
      <div className="max-w-md mx-auto h-16 px-2 flex items-center justify-around">
        {/* Home */}
        <button
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer active:scale-95 ${
            currentScreen === 'home'
              ? 'text-[#b7102a] font-bold'
              : 'text-[#575e70] hover:text-[#191c1e]'
          }`}
          onClick={() => navigateTo('home')}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={currentScreen === 'home' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            storefront
          </span>
          <span className="text-[10px] leading-[12px] font-semibold mt-0.5">Home</span>
        </button>

        {/* Categories */}
        <button
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer active:scale-95 ${
            currentScreen === 'categories'
              ? 'text-[#b7102a] font-bold'
              : 'text-[#575e70] hover:text-[#191c1e]'
          }`}
          onClick={() => navigateTo('categories')}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={currentScreen === 'categories' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            category
          </span>
          <span className="text-[10px] leading-[12px] font-semibold mt-0.5">Categories</span>
        </button>

        {/* Crazy Deals */}
        <button
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors relative cursor-pointer active:scale-95 ${
            currentScreen === 'deals'
              ? 'text-[#FF3E3E] font-bold'
              : 'text-[#575e70] hover:text-[#FF3E3E]'
          }`}
          onClick={() => navigateTo('deals')}
        >
          <span
            className="material-symbols-outlined text-[24px] text-[#FF3E3E]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-[10px] leading-[12px] font-semibold mt-0.5 text-[#FF3E3E]">
            Crazy Deals
          </span>
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#b7102a] animate-pulse"></span>
        </button>

        {/* Cart */}
        <button
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors relative cursor-pointer active:scale-95 ${
            currentScreen === 'cart'
              ? 'text-[#b7102a] font-bold'
              : 'text-[#575e70] hover:text-[#191c1e]'
          }`}
          onClick={() => navigateTo('cart')}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={currentScreen === 'cart' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            shopping_bag
          </span>
          <span className="text-[10px] leading-[12px] font-semibold mt-0.5">Cart</span>
          {totalCartCount > 0 && (
            <span className="absolute top-0.5 right-2 min-w-4 h-4 px-1 bg-[#b7102a] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
