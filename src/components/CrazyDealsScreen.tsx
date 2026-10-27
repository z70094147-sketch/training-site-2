import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const CrazyDealsScreen: React.FC = () => {
  const {
    countdown,
    activeShoppersCount,
    openProductDetail,
    addToCart,
    toggleWishlist,
    isWishlisted,
    applyPromo,
    navigateTo,
    showToast,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filterChips = [
    { id: 'all', label: 'All Deals' },
    { id: 'under-999', label: 'Under Rs. 999' },
    { id: 'winter', label: 'Winter Warmers' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'clearance', label: '🔥 Last Piece Clearance' },
  ];

  // The 8 flash surplus items featured on Crazy Deals
  const flashProducts = PRODUCTS.slice(0, 8);

  const filteredProducts = flashProducts.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'under-999') return product.price <= 999;
    return product.tags.includes(activeFilter);
  });

  const handleQuickBuy = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setQuickAddedId(product.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1200);
  };

  const handleBundlePromo = () => {
    applyPromo('BUNDLE10');
    showToast('Bundle 10% Off applied! View in Cart');
    setTimeout(() => navigateTo('cart'), 800);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Live Urgency Ticker Ribbon */}
      <div className="w-full bg-[#b7102a] text-white px-4 py-1.5 flex items-center justify-between text-xs shadow-sm overflow-hidden select-none">
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span
            className="material-symbols-outlined text-[16px] animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-[11px] uppercase tracking-wide">
            SURPLUS RUNOUT • EXPORT LEFTOVERS
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] bg-black/20 px-2 py-0.5 rounded-full font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{activeShoppersCount} shoppers active</span>
        </div>
      </div>

      {/* Hero Deal Banner Block */}
      <section className="relative w-full px-4 pt-3 pb-2">
        <div className="w-full rounded-2xl bg-gradient-to-br from-[#b7102a] via-[#db313f] to-[#FF3E3E] text-white p-3.5 shadow-md flex flex-col gap-2 relative overflow-hidden">
          {/* Decorative Backdrop Bolt */}
          <div className="absolute -right-4 -bottom-6 opacity-10 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[140px] text-white">bolt</span>
          </div>

          {/* Pill & Title Stack */}
          <div className="flex flex-col gap-1 z-10">
            <div className="inline-flex items-center gap-1 self-start bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold tracking-wide uppercase">
              <span className="material-symbols-outlined text-[14px]">offline_bolt</span>
              <span>Save Minimum 40% to 70%</span>
            </div>
            <h1 className="text-[22px] text-white tracking-tight uppercase drop-shadow-xs font-extrabold mt-0.5 leading-tight">
              CRAZY DEALS &amp; MEGA BUNDLES
            </h1>
            <p className="text-[12px] text-white/90">
              Factory overstock &amp; export-grade clearance. When it's gone, it's gone!
            </p>
          </div>

          {/* Segmented Flash Urgency Countdown */}
          <div className="mt-1 bg-black/25 backdrop-blur-md rounded-xl p-2.5 flex flex-col gap-1.5 z-10">
            <div className="flex items-center justify-between text-white/90 text-xs">
              <span className="flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[15px] text-amber-300">timer</span>
                Flash Window Closes
              </span>
              <span className="text-[11px] text-white/80 font-medium">Ends Thursday 11:59 AM</span>
            </div>

            {/* Timer Cells */}
            <div className="grid grid-cols-4 gap-2 text-center" id="flash-countdown">
              <div className="bg-black/35 rounded-lg py-1.5 flex flex-col items-center">
                <span className="text-[15px] text-white tabular-nums tracking-tight font-extrabold">
                  {String(countdown.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
                  Days
                </span>
              </div>
              <div className="bg-black/35 rounded-lg py-1.5 flex flex-col items-center">
                <span className="text-[15px] text-white tabular-nums tracking-tight font-extrabold">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
                  Hours
                </span>
              </div>
              <div className="bg-black/35 rounded-lg py-1.5 flex flex-col items-center">
                <span className="text-[15px] text-white tabular-nums tracking-tight font-extrabold">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
                  Mins
                </span>
              </div>
              <div className="bg-black/35 rounded-lg py-1.5 flex flex-col items-center">
                <span className="text-[15px] text-white tabular-nums tracking-tight font-extrabold">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
                  Secs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Filter Chips Carousel */}
      <section className="w-full px-4 py-1">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.id;
            const isClearance = chip.id === 'clearance';
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-[#191c1e] text-white shadow-xs'
                    : isClearance
                    ? 'bg-[#FEE2E2] text-[#991B1B] font-bold'
                    : 'bg-[#F1F5F9] text-[#5b403f] hover:text-[#191c1e]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Grid Metadata / Counter */}
      <div className="px-4 py-2 flex items-center justify-between text-[#5b403f] text-[12px]">
        <div className="flex items-center gap-1 font-semibold text-[#191c1e]">
          <span>{filteredProducts.length} Flash Surplus Items</span>
          <span className="text-xs text-[#991B1B] font-bold">• Selling Fast</span>
        </div>
        <div className="flex items-center gap-1 text-[12px] bg-[#f2f4f6] px-2 py-0.5 rounded-md text-[#5b403f] font-medium border border-[#E2E8F0]">
          <span className="material-symbols-outlined text-[14px] text-[#006947]">verified</span>
          100% Export Surplus
        </div>
      </div>

      {/* 2-Column Responsive E-Commerce Product Cards Grid */}
      <section className="px-4 py-1 pb-4 grid grid-cols-2 gap-3" id="deal-cards-container">
        {filteredProducts.map((prod) => {
          const wishlisted = isWishlisted(prod.id);
          const isAdded = quickAddedId === prod.id;
          return (
            <article
              key={prod.id}
              className="deal-card flex flex-col bg-white rounded-xl overflow-hidden shadow-xs border border-[#E2E8F0]/70 transition-all cursor-pointer hover:shadow-md active:scale-[0.99]"
              onClick={() => openProductDetail(prod.id)}
            >
              {/* Media Aspect Ratio Container */}
              <div className="relative w-full aspect-[1/1.22] bg-[#f2f4f6] overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt={prod.name}
                  src={prod.image}
                  referrerPolicy="no-referrer"
                />

                {/* Badges */}
                <span className="absolute top-2 left-2 bg-[#FEE2E2] text-[#991B1B] text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                  {prod.discountPct}% OFF
                </span>

                <button
                  aria-label="Save to Wishlist"
                  className={`wishlist-btn absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-xs flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-90 ${
                    wishlisted ? 'text-[#b7102a]' : 'text-[#5b403f] hover:text-[#b7102a]'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={wishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    favorite
                  </span>
                </button>

                {prod.badge && (
                  <span className="absolute bottom-1.5 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {prod.badge}
                  </span>
                )}
              </div>

              {/* Body Stack */}
              <div className="p-2.5 flex flex-col flex-1 justify-between gap-1.5">
                {/* Variant Swatches */}
                <div className="flex items-center gap-1.5">
                  {prod.colors.map((color, idx) => (
                    <span
                      key={color.name}
                      className={`w-3.5 h-3.5 rounded-full border border-black/10 ${
                        idx === 0 ? 'ring-1 ring-offset-1 ring-[#b7102a]/50' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                  <span className="text-[10px] text-[#5b403f] font-medium ml-auto">
                    {prod.colors[0]?.name}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-[12px] font-semibold text-[#191c1e] line-clamp-2 leading-tight min-h-[32px]">
                  {prod.name}
                </h2>

                {/* Price Cluster */}
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-[16px] text-[#b7102a] font-extrabold">
                    Rs. {prod.price.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-[#5b403f]/70 line-through">
                    Rs. {prod.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Stock Urgency Bar */}
                <div className="flex flex-col gap-1 mt-0.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#991B1B]">
                    <span>{prod.stockLabel || `Only ${prod.stockLeft} left!`}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#eceef0] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        prod.stockLeft <= 3 ? 'bg-[#FF3E3E]' : 'bg-[#006947]'
                      }`}
                      style={{ width: `${prod.stockLevelPercent || 80}%` }}
                    />
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  className={`quick-add-btn mt-1 w-full h-9 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer ${
                    isAdded
                      ? 'bg-[#006947] text-white'
                      : 'bg-[#b7102a] text-white hover:bg-[#db313f]'
                  }`}
                  onClick={(e) => handleQuickBuy(prod, e)}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isAdded ? 'check' : 'bolt'}
                  </span>
                  <span>{isAdded ? 'Added to Bag' : 'Quick Buy'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Bundle Savings Upsell Callout */}
      <section className="px-4 pb-4">
        <div className="w-full rounded-2xl bg-[#e6e8ea] p-3 flex items-center justify-between gap-2 shadow-xs border border-[#E2E8F0]">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1 text-[#b7102a] font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">loyalty</span>
              <span>Bundle &amp; Save More</span>
            </div>
            <h3 className="text-[14px] font-bold text-[#191c1e]">
              Buy Any 3 Deals, Get Extra 10% Off
            </h3>
            <p className="text-[11px] text-[#5b403f]">
              Auto-applied at checkout for all surplus pieces
            </p>
          </div>
          <button
            className="flex-shrink-0 px-3 py-2 bg-[#191c1e] text-white rounded-xl text-xs font-bold flex items-center gap-0.5 shadow-xs cursor-pointer active:scale-95"
            onClick={handleBundlePromo}
          >
            <span>View</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Value & Trust Pillars */}
      <section className="px-4 pb-4 grid grid-cols-2 gap-2">
        <div className="bg-white p-3 rounded-xl shadow-xs border border-[#E2E8F0]/70 flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-full bg-[#ECFDF5] text-[#065F46] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          </span>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[#191c1e]">Free Shipping</span>
            <span className="text-[11px] text-[#5b403f]">On prepaid orders</span>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-xs border border-[#E2E8F0]/70 flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-full bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </span>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[#191c1e]">100% Genuine</span>
            <span className="text-[11px] text-[#5b403f]">Original export surplus</span>
          </div>
        </div>
      </section>
    </div>
  );
};
