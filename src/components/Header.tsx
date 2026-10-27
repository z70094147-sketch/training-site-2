import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ELO_LOGO_URL, PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    totalCartCount,
    setVisualSearchOpen,
    setNotificationsOpen,
    openProductDetail,
    searchQuery,
    setSearchQuery,
    showToast,
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return '| Home';
      case 'deals':
        return '| Flash Deals';
      case 'cart':
        return '| Cart';
      case 'categories':
        return '| Categories';
      case 'pdp':
        return 'Product Detail';
      default:
        return '';
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'elo - Surplus Clearance',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const filteredSearchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // If on Product Detail Screen, render the PDP single-line header
  if (currentScreen === 'pdp') {
    return (
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#f7f9fb]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#E2E8F0]/60">
        <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              aria-label="Go Back"
              className="w-11 h-11 -ml-1 flex items-center justify-center rounded-full text-[#191c1e] hover:bg-[#eceef0] active:scale-95 transition-all cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="elo Brand Logo"
              className="h-7 w-auto object-contain cursor-pointer"
              src={ELO_LOGO_URL}
              onClick={() => navigateTo('home')}
            />
            <h1 className="text-[16px] font-semibold text-[#191c1e] ml-1 line-clamp-1">
              Product Detail
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Share"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#5b403f] hover:text-[#191c1e] hover:bg-[#eceef0] active:scale-95 transition-all cursor-pointer"
              onClick={handleShare}
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
            <button
              aria-label="Account"
              className="w-8 h-8 rounded-full bg-[#b7102a] flex items-center justify-center ml-1 text-white shadow-xs cursor-pointer active:scale-95"
              onClick={() => showToast('Logged in as verified shopper')}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Standard 2-Row Header with Search
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f7f9fb]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#E2E8F0]/60">
      <div className="max-w-md mx-auto h-28 px-4 flex flex-col justify-between py-1">
        {/* Top Brand & Actions Row */}
        <div className="flex items-center justify-between gap-2 h-11">
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => navigateTo('home')}
          >
            <img
              alt="elo Brand Logo"
              className="h-8 w-auto object-contain"
              src={ELO_LOGO_URL}
            />
            <span className="text-[17px] tracking-tight font-bold text-[#191c1e]">elo</span>
            <span className="font-medium text-[12px] text-[#5b403f]">{getScreenTitle()}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#5b403f] hover:text-[#191c1e] hover:bg-[#eceef0] active:scale-95 transition-all cursor-pointer relative"
              onClick={() => setNotificationsOpen(true)}
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b7102a]" />
            </button>

            <button
              aria-label="Cart Bag"
              className="w-10 h-10 relative flex items-center justify-center rounded-full text-[#5b403f] hover:text-[#191c1e] hover:bg-[#eceef0] active:scale-95 transition-all cursor-pointer"
              onClick={() => navigateTo('cart')}
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#b7102a] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              aria-label="Account Profile"
              className="w-8 h-8 rounded-full bg-[#b7102a] flex items-center justify-center ml-1 text-white shadow-xs cursor-pointer active:scale-95"
              onClick={() => showToast('Signed in via elo VIP Club')}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>

        {/* Search Input Row */}
        <div className="h-11 flex items-center relative">
          <div className="relative w-full flex items-center h-10 bg-[#f2f4f6] rounded-xl px-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-[#E2E8F0]/70 focus-within:border-[#b7102a]/60 focus-within:bg-white transition-all">
            <span className="material-symbols-outlined text-[#5b403f] text-[20px] mr-2 shrink-0">
              search
            </span>
            <input
              className="w-full bg-transparent border-0 outline-none text-[#191c1e] placeholder:text-[#5b403f]/70 text-[13px] font-medium"
              placeholder="Search 10,000+ export quality products..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {searchQuery && (
              <button
                aria-label="Clear Search"
                className="w-6 h-6 flex items-center justify-center text-[#5b403f] hover:text-[#191c1e] mr-1"
                onClick={() => setSearchQuery('')}
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
            <button
              aria-label="Voice or Camera Search"
              className="w-8 h-8 flex items-center justify-center text-[#5b403f] hover:text-[#b7102a] active:scale-90 transition-transform cursor-pointer shrink-0"
              onClick={() => setVisualSearchOpen(true)}
              title="Visual Search / Upload image"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </button>
          </div>

          {/* Quick search popup results */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white rounded-xl shadow-xl border border-[#E2E8F0] p-2 z-50 max-h-72 overflow-y-auto">
              <div className="text-[11px] font-bold text-[#64748B] uppercase px-2 py-1 flex items-center justify-between">
                <span>Matching Surplus Pieces</span>
                <span>{filteredSearchResults.length} found</span>
              </div>
              {filteredSearchResults.length === 0 ? (
                <div className="py-4 text-center text-xs text-[#64748B]">
                  No products found for "{searchQuery}". Try "jacket", "polo", or "shorts".
                </div>
              ) : (
                filteredSearchResults.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-3 p-2 hover:bg-[#f7f9fb] rounded-lg cursor-pointer transition-colors"
                    onClick={() => {
                      openProductDetail(prod.id);
                      setSearchQuery('');
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 object-cover rounded-md bg-[#f2f4f6]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#191c1e] truncate">{prod.name}</p>
                      <p className="text-[11px] text-[#b7102a] font-bold">Rs. {prod.price.toLocaleString()}</p>
                    </div>
                    <span className="text-[10px] bg-[#FEE2E2] text-[#991B1B] font-bold px-1.5 py-0.5 rounded">
                      {prod.discountPct}% OFF
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
