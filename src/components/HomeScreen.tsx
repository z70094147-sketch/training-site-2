import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    countdown,
    navigateTo,
    openProductDetail,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'wardrobe-essentials', label: 'Wardrobe Essentials' },
    { id: 'winter', label: 'Winter Basics' },
    { id: 'clearance', label: '🔥 Clearance up to 60%' },
  ];

  const handleQuickBuy = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setQuickAddedId(product.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1200);
  };

  // Crazy Deal bundle products for horizontal shelf
  const crazyDeals = PRODUCTS.slice(0, 4);

  // Best sellers products for 2-column grid
  const bestSellers = PRODUCTS.slice(8, 12);

  // Filter products if a category is selected
  const displayedBestSellers =
    activeCategory === 'all'
      ? bestSellers
      : PRODUCTS.filter((p) => p.tags.includes(activeCategory)).slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Trust Micro-Bar */}
      <div className="w-full bg-[#F1F5F9] px-4 py-2 flex items-center justify-between shadow-xs border-b border-[#E2E8F0]/70">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="material-symbols-outlined text-[#006947] text-[16px] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <p className="text-[12px] text-[#5b403f] truncate font-medium">
            Loved by over 5 Million Pakistanis since 2013
          </p>
        </div>
        <span className="shrink-0 text-[11px] bg-[#00855b]/10 text-[#006947] px-2 py-0.5 rounded-full font-bold">
          100% Export
        </span>
      </div>

      {/* Flash Urgency Hero Banner */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#b7102a] via-[#db313f] to-[#FF3E3E] text-white p-4 shadow-md">
          {/* Ambient Sparkle Shapes */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute top-2 right-12 w-16 h-16 rounded-full bg-white/5 blur-md pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">
                <span
                  className="material-symbols-outlined text-[14px] text-yellow-300"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                Surplus Clearance
              </span>
              <span className="text-[11px] font-bold text-white/80">Ends 11:59 PM PKT</span>
            </div>

            <div>
              <h2 className="text-[22px] font-extrabold tracking-tight leading-tight">
                Save Minimum 40% on Crazy Deals
              </h2>
              <p className="text-[12px] text-white/90 mt-0.5">
                Authentic factory overruns. Limited units available.
              </p>
            </div>

            {/* Sleek Live Countdown Timer */}
            <div className="flex items-center gap-2 mt-1 pt-1">
              <div className="flex items-center gap-1.5" id="hero-countdown">
                {/* Days */}
                <div className="flex flex-col items-center justify-center bg-[#2d3133]/80 rounded-lg px-2.5 py-1 min-w-[44px]">
                  <span className="text-[15px] font-extrabold text-white tabular-nums">
                    {String(countdown.days).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-bold tracking-wider text-white/70">DAYS</span>
                </div>
                <span className="text-[16px] text-white font-bold">:</span>

                {/* Hours */}
                <div className="flex flex-col items-center justify-center bg-[#2d3133]/80 rounded-lg px-2.5 py-1 min-w-[44px]">
                  <span className="text-[15px] font-extrabold text-white tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-bold tracking-wider text-white/70">HRS</span>
                </div>
                <span className="text-[16px] text-white font-bold">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center justify-center bg-[#2d3133]/80 rounded-lg px-2.5 py-1 min-w-[44px]">
                  <span className="text-[15px] font-extrabold text-white tabular-nums">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-bold tracking-wider text-white/70">MINS</span>
                </div>
                <span className="text-[16px] text-white font-bold">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center justify-center bg-[#2d3133]/80 rounded-lg px-2.5 py-1 min-w-[44px]">
                  <span className="text-[15px] font-extrabold text-[#FF3E3E] tabular-nums">
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-bold tracking-wider text-white/70">SECS</span>
                </div>
              </div>

              <button
                className="ml-auto inline-flex items-center gap-1 bg-white text-[#b7102a] text-[13px] px-3 py-2 rounded-lg font-bold shadow hover:bg-slate-50 active:scale-95 transition-transform shrink-0 cursor-pointer"
                onClick={() => navigateTo('deals')}
              >
                Shop Sale
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Category Filter Pills */}
      <div className="w-full pt-2 pb-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-4 min-w-max">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const isClearance = cat.id === 'clearance';
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all cursor-pointer active:scale-95 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#191c1e] text-white shadow-sm'
                    : isClearance
                    ? 'bg-[#FEE2E2] text-[#991B1B] font-bold'
                    : 'bg-[#F1F5F9] text-[#191c1e] hover:bg-[#eceef0]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CRAZY DEAL BUNDLE OFFERS (Horizontal Swipe Shelf) */}
      <section className="mt-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#FF3E3E] text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <div>
              <h3 className="text-[20px] text-[#191c1e] font-extrabold tracking-tight">
                Crazy Deal Bundles
              </h3>
              <p className="text-[12px] text-[#5b403f]">Unbeatable factory overstock prices</p>
            </div>
          </div>
          <button
            className="text-[12px] text-[#b7102a] font-bold inline-flex items-center gap-0.5 cursor-pointer hover:underline"
            onClick={() => navigateTo('deals')}
          >
            See All
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Product Card Carousel */}
        <div className="w-full overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-3 px-4 min-w-max">
            {crazyDeals.map((item) => {
              const wishlisted = isWishlisted(item.id);
              const isAdded = quickAddedId === item.id;
              return (
                <div
                  key={item.id}
                  className="w-[210px] bg-white rounded-xl shadow-xs border border-[#E2E8F0]/70 overflow-hidden flex flex-col justify-between cursor-pointer group hover:shadow-md transition-shadow"
                  onClick={() => openProductDetail(item.id)}
                >
                  <div className="relative">
                    <div className="w-full aspect-[4/5] bg-[#f2f4f6] overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={item.name}
                        src={item.image}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Discount Pill */}
                    <div className="absolute top-2 left-2 bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
                      Save {item.discountPct}%
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      aria-label="Add to wishlist"
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 backdrop-blur-xs flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-xs ${
                        wishlisted ? 'text-[#b7102a]' : 'text-[#191c1e]'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={wishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="p-3 flex flex-col gap-1.5 flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: item.colors[0]?.hex }}
                        />
                        <span className="text-[11px] text-[#64748B]">
                          {item.colors[0]?.name}
                        </span>
                      </div>
                      <h4 className="text-[14px] text-[#191c1e] font-semibold line-clamp-2 leading-snug">
                        {item.name}
                      </h4>
                    </div>

                    <div className="pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[16px] text-[#b7102a] font-bold">
                          Rs. {item.price.toLocaleString()}
                        </span>
                        <span className="text-[13px] text-[#64748B] line-through">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      <button
                        className={`mt-2.5 w-full py-2 rounded-lg text-[13px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer ${
                          isAdded
                            ? 'bg-[#006947] text-white'
                            : 'bg-[#b7102a] text-white hover:bg-[#db313f]'
                        }`}
                        onClick={(e) => handleQuickBuy(item, e)}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isAdded ? 'check_circle' : 'add_shopping_cart'}
                        </span>
                        <span>{isAdded ? 'Added!' : 'Quick Buy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Propositions 2x2 Grid */}
      <section className="px-4 my-4">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Prop 1 */}
          <div className="bg-white rounded-xl p-3 flex items-start gap-2.5 shadow-xs border border-[#E2E8F0]/70">
            <div className="w-8 h-8 rounded-lg bg-[#00855b]/10 text-[#006947] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div className="min-w-0">
              <h5 className="text-[13px] text-[#191c1e] font-bold leading-snug">Free Shipping</h5>
              <p className="text-[11px] text-[#5b403f] leading-tight mt-0.5">
                On all prepaid orders nationwide
              </p>
            </div>
          </div>

          {/* Prop 2 */}
          <div className="bg-white rounded-xl p-3 flex items-start gap-2.5 shadow-xs border border-[#E2E8F0]/70">
            <div className="w-8 h-8 rounded-lg bg-[#d9dff5]/60 text-[#575e70] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
            </div>
            <div className="min-w-0">
              <h5 className="text-[13px] text-[#191c1e] font-bold leading-snug">Easy 30-Day</h5>
              <p className="text-[11px] text-[#5b403f] leading-tight mt-0.5">
                Hassle-free returns &amp; exchanges
              </p>
            </div>
          </div>

          {/* Prop 3 */}
          <div className="bg-white rounded-xl p-3 flex items-start gap-2.5 shadow-xs border border-[#E2E8F0]/70">
            <div className="w-8 h-8 rounded-lg bg-[#ffdad8] text-[#410007] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="min-w-0">
              <h5 className="text-[13px] text-[#191c1e] font-bold leading-snug">100% Genuine</h5>
              <p className="text-[11px] text-[#5b403f] leading-tight mt-0.5">
                Authentic factory surplus quality
              </p>
            </div>
          </div>

          {/* Prop 4 */}
          <div className="bg-white rounded-xl p-3 flex items-start gap-2.5 shadow-xs border border-[#E2E8F0]/70">
            <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">savings</span>
            </div>
            <div className="min-w-0">
              <h5 className="text-[13px] text-[#191c1e] font-bold leading-snug">Factory Savings</h5>
              <p className="text-[11px] text-[#5b403f] leading-tight mt-0.5">
                Unbeatable direct pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS & TRENDING NOW (2-Column Grid) */}
      <section className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[20px] text-[#191c1e] font-extrabold tracking-tight">
              Best Sellers &amp; Trending
            </h3>
            <p className="text-[12px] text-[#5b403f]">Pakistan's highest rated daily essentials</p>
          </div>
          <button
            className="text-[12px] text-[#b7102a] font-bold inline-flex items-center gap-0.5 cursor-pointer hover:underline"
            onClick={() => navigateTo('deals')}
          >
            Explore
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {displayedBestSellers.map((item) => {
            const wishlisted = isWishlisted(item.id);
            const isAdded = quickAddedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-xs border border-[#E2E8F0]/70 overflow-hidden flex flex-col justify-between cursor-pointer group hover:shadow-md transition-shadow"
                onClick={() => openProductDetail(item.id)}
              >
                <div className="relative">
                  <div className="w-full aspect-[4/5] bg-[#f2f4f6] overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.name}
                      src={item.image}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <span className="absolute top-2 left-2 bg-[#191c1e] text-white px-2 py-0.5 rounded-full text-[11px] font-bold">
                    {item.badge || 'Trending'}
                  </span>

                  <button
                    aria-label="Add to wishlist"
                    className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                      wishlisted ? 'text-[#b7102a]' : 'text-[#191c1e]'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id);
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={wishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="p-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: item.colors[0]?.hex }}
                      />
                      <span className="text-[10px] text-[#64748B]">
                        {item.colors[0]?.name}
                      </span>
                    </div>
                    <h4 className="text-[13px] text-[#191c1e] font-semibold line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-baseline">
                      <span className="text-[16px] text-[#191c1e] font-bold">
                        Rs. {item.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      className={`mt-2 w-full py-1.5 rounded-lg text-[12px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        isAdded
                          ? 'bg-[#006947] text-white'
                          : 'bg-[#F1F5F9] text-[#191c1e] hover:bg-[#eceef0]'
                      }`}
                      onClick={(e) => handleQuickBuy(item, e)}
                    >
                      {isAdded ? (
                        <>
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Quick Buy</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community & Social Proof Badge Card */}
      <section className="px-4 mb-6">
        <div className="bg-gradient-to-r from-[#f2f4f6] to-[#e0e3e5] rounded-2xl p-4 shadow-xs border border-[#E2E8F0] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#b7102a]/10 text-[#b7102a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">groups</span>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-[#b7102a] uppercase font-bold tracking-wider">
                Social Showcase
              </span>
              <h4 className="text-[16px] text-[#191c1e] font-bold leading-tight">
                Join our community of 725K+ shoppers
              </h4>
              <p className="text-[12px] text-[#5b403f] truncate">
                Tag @elo.shoponline for a chance to be featured
              </p>
            </div>
          </div>

          {/* Community Avatars / Micro-Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-8 w-8 rounded-full bg-[#b7102a] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                PK
              </div>
              <div className="inline-block h-8 w-8 rounded-full bg-[#575e70] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                EL
              </div>
              <div className="inline-block h-8 w-8 rounded-full bg-[#006947] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                FD
              </div>
              <div className="inline-block h-8 w-8 rounded-full bg-[#e0e3e5] text-[#191c1e] flex items-center justify-center text-xs font-bold ring-2 ring-white">
                +725k
              </div>
            </div>

            <button
              className="inline-flex items-center gap-1 bg-white text-[#191c1e] text-[12px] px-3.5 py-1.5 rounded-full font-bold shadow-xs active:scale-95 transition-transform border border-[#E2E8F0] cursor-pointer"
              onClick={() => showToast('Opening @elo.shoponline on Instagram')}
            >
              <span>@elo.shoponline</span>
              <span className="material-symbols-outlined text-[16px] text-[#FF3E3E]">
                open_in_new
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
