import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, INITIAL_REVIEWS } from '../data/products';
import { CustomerReview } from '../types';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isWishlisted,
    countdown,
    navigateTo,
    setSizeGuideOpen,
    applyPromo,
    showToast,
  } = useApp();

  const product =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const images = product.additionalImages && product.additionalImages.length > 0
    ? product.additionalImages
    : [product.image];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Beige');
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0] || 'L');

  // Accordion open/close states
  const [accordionState, setAccordionState] = useState<{ [key: string]: boolean }>({
    fabric: true,
    fit: false,
    delivery: false,
  });

  // Reviews state
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const toggleAccordion = (id: string) => {
    setAccordionState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyBundleCode = () => {
    applyPromo('BUNDLE10');
    navigator.clipboard?.writeText('BUNDLE10');
    showToast('Coupon "BUNDLE10" copied & applied!');
  };

  const handleAddToBag = () => {
    addToCart(product, selectedColor, selectedSize, 1);
  };

  const handleQuickBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, 1);
    navigateTo('cart');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewCity.trim() || 'Pakistan',
      isVerified: true,
      date: 'Just now',
      rating: newReviewRating,
      initials: newReviewAuthor
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      comment: `"${newReviewComment.trim()}"`,
    };

    setReviews([newRev, ...reviews]);
    setIsWriteReviewOpen(false);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
    showToast('Thank you! Review published');
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Image Slider Preview Container */}
      <section className="relative w-full bg-[#f2f4f6] overflow-hidden select-none">
        {/* Slider Track */}
        <div
          className="flex w-full transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((imgUrl, index) => (
            <div key={index} className="w-full shrink-0 relative aspect-[4/5] bg-[#eceef0]">
              <img
                alt={`${product.name} - Slide ${index + 1}`}
                className="w-full h-full object-cover select-none"
                src={imgUrl}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="bg-[#FEE2E2] text-[#991B1B] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1">
            <span
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            Save {product.discountPct}%
          </span>
          <span className="bg-white/90 backdrop-blur-md text-[#191c1e] text-[11px] font-bold px-2 py-1 rounded-full shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006947]" />
            Crazy Deal
          </span>
        </div>

        {/* Zoom & Wishlist Floating Icons */}
        <div className="absolute top-3 right-4 flex flex-col gap-2 z-10">
          <button
            aria-label="Add to Wishlist"
            className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
              wishlisted ? 'text-[#b7102a]' : 'text-[#191c1e]'
            }`}
            onClick={() => toggleWishlist(product.id)}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={wishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              favorite
            </span>
          </button>
          <button
            aria-label="Next slide"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#191c1e] shadow-xs flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
          >
            <span className="material-symbols-outlined text-[20px]">
              {images.length > 1 ? 'chevron_right' : 'zoom_in'}
            </span>
          </button>
        </div>

        {/* Carousel Dots & Index Indicator */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-between px-4 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-2 py-1 rounded-full shadow-xs pointer-events-auto">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'bg-[#b7102a] w-4' : 'bg-[#e4bebc]'
                }`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
          <div className="bg-[#2d3133]/75 text-white backdrop-blur-md text-[12px] px-2.5 py-0.5 rounded-full shadow-xs">
            <span className="font-semibold">{currentSlide + 1}</span> / {images.length}
          </div>
        </div>
      </section>

      {/* Product Vital Information */}
      <section className="flex flex-col px-4 pt-4 pb-2 bg-[#f7f9fb]">
        {/* Brand / Export Guarantee Tagline */}
        <div className="flex items-center gap-1.5 text-[#575e70] text-[12px] mb-1.5">
          <span
            className="material-symbols-outlined text-[#006947] text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="font-medium text-[#5b403f]">
            {product.brand} • Export Quality Guarantee
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-bold text-[#191c1e] tracking-tight mb-2 leading-tight">
          {product.name}
        </h1>

        {/* Rating Micro-Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-[#ECFDF5] text-[#065F46] px-2 py-0.5 rounded-full text-[11px] font-bold">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span>{product.rating}</span>
          </div>
          <span className="text-[12px] text-[#575e70] underline decoration-dotted">
            {product.reviewsCount} verified buyer reviews
          </span>
          <span className="text-[#e4bebc]">•</span>
          <span className="text-[12px] text-[#006947] font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">bolt</span> {product.soldToday} Sold
            today
          </span>
        </div>

        {/* Price Section */}
        <div className="flex flex-wrap items-baseline gap-2.5 p-3 rounded-xl bg-[#f2f4f6] shadow-xs border border-[#E2E8F0]">
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] text-[#b7102a] font-bold">
              Rs. {product.price.toLocaleString()}.00
            </span>
          </div>
          <span className="text-[13px] text-[#575e70] line-through">
            Rs. {product.originalPrice.toLocaleString()}.00
          </span>
          <span className="bg-[#FEE2E2] text-[#991B1B] text-[11px] px-2 py-0.5 rounded-full font-bold ml-auto">
            You Save Rs. {(product.originalPrice - product.price).toLocaleString()} (
            {product.discountPct}% OFF)
          </span>
        </div>
      </section>

      {/* Flash Promotion Urgency Ticker */}
      <section className="px-4 my-2">
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#d9dff5] text-[#5c6274] border border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7102a] text-[20px] animate-pulse">
              timer
            </span>
            <span className="text-[12px] font-semibold text-[#191c1e]">Flash Deal Ends in:</span>
          </div>
          <div className="flex items-center gap-1 text-[15px] font-extrabold">
            <span className="bg-white text-[#191c1e] px-1.5 py-0.5 rounded shadow-xs">
              {String(countdown.days).padStart(2, '0')}
            </span>
            <span className="text-[#191c1e]">:</span>
            <span className="bg-white text-[#191c1e] px-1.5 py-0.5 rounded shadow-xs">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <span className="text-[#191c1e]">:</span>
            <span className="bg-white text-[#191c1e] px-1.5 py-0.5 rounded shadow-xs">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <span className="text-[#191c1e]">:</span>
            <span className="bg-white text-[#b7102a] px-1.5 py-0.5 rounded shadow-xs">
              {String(countdown.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>

      {/* Color Selector */}
      <section className="flex flex-col px-4 py-3 bg-[#f7f9fb]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[14px] text-[#191c1e] font-semibold">
            Color: <span className="text-[#b7102a] font-bold">{selectedColor}</span>
          </span>
          <span className="text-[12px] text-[#575e70]">
            {product.colors.length} Colors Available
          </span>
        </div>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isSelected = selectedColor === color.name;
            return (
              <button
                key={color.name}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer border ${
                  isSelected
                    ? 'bg-[#e0e3e5] text-[#191c1e] border-[#b7102a]'
                    : 'bg-[#eceef0] text-[#575e70] border-transparent hover:bg-[#e0e3e5]'
                }`}
                onClick={() => setSelectedColor(color.name)}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[14px] font-semibold">{color.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Size Selector */}
      <section className="flex flex-col px-4 py-3 bg-[#f7f9fb]">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] text-[#191c1e] font-semibold">Size:</span>
            <span className="text-[14px] text-[#b7102a] font-bold">{selectedSize}</span>
          </div>
          {/* Size Chart Trigger */}
          <button
            className="flex items-center gap-1 text-[#b7102a] hover:text-[#92001c] text-[12px] font-semibold transition-colors cursor-pointer"
            onClick={() => setSizeGuideOpen(true)}
          >
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            Size Guide
          </button>
        </div>

        {/* Size Chips Grid */}
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                className={`h-11 flex flex-col items-center justify-center rounded-xl text-[14px] font-bold transition-all shadow-xs cursor-pointer ${
                  isSelected
                    ? 'bg-[#2d3133] text-white shadow-md'
                    : 'bg-[#eceef0] text-[#575e70] hover:bg-[#e0e3e5]'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 mt-2 text-[#006947] text-[12px]">
          <span
            className="material-symbols-outlined text-[15px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <span>In stock &amp; ready to ship immediately from Faisalabad warehouse</span>
        </div>
      </section>

      {/* Bundle Offer Incentive Banner */}
      <section className="px-4 my-3">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#ffdad8] via-[#e6e8ea] to-[#dce2f7] p-4 shadow-xs border border-[#E2E8F0]">
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#b7102a] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px]">loyalty</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] text-[#410007] font-bold tracking-tight">
                  BUNDLE &amp; SAVE MORE
                </span>
                <span className="bg-[#FEE2E2] text-[#991B1B] text-[10px] px-1.5 py-0.2 rounded font-bold">
                  10% OFF
                </span>
              </div>
              <p className="text-[12px] text-[#5b403f] mt-0.5">
                Buy 2 get extra 10% off with code{' '}
                <strong className="text-[#b7102a] tracking-wide">BUNDLE10</strong> at checkout!
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="bg-white text-[#b7102a] text-[12px] font-bold px-3 py-1 rounded-lg shadow-xs active:scale-95 transition-transform flex items-center gap-1 cursor-pointer border border-[#E2E8F0]"
                  onClick={handleCopyBundleCode}
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  Tap to Copy Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Ribbons */}
      <section className="grid grid-cols-2 gap-2.5 px-4 py-2">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f2f4f6] shadow-xs border border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#006947] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[#191c1e]">2 to 5 Days Delivery</span>
            <span className="text-[11px] text-[#575e70]">Cash on delivery all PK</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f2f4f6] shadow-xs border border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#b7102a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[#191c1e]">30-Day Easy Returns</span>
            <span className="text-[11px] text-[#575e70]">No-hassle exchange</span>
          </div>
        </div>
      </section>

      {/* Product Details Accordion Section */}
      <section className="flex flex-col px-4 py-2 gap-2">
        <div className="text-[14px] text-[#191c1e] font-bold mb-1">
          Authentic Product Specifications
        </div>

        {/* Accordion Item 1: Fabric & Material */}
        <div className="rounded-xl bg-[#f2f4f6] overflow-hidden shadow-xs border border-[#E2E8F0]">
          <button
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            onClick={() => toggleAccordion('fabric')}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#b7102a] text-[20px]">texture</span>
              <span className="text-[14px] text-[#191c1e] font-semibold">Fabric &amp; Material</span>
            </div>
            <span
              className={`material-symbols-outlined text-[#575e70] transition-transform duration-200 ${
                accordionState.fabric ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {accordionState.fabric && (
            <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
              <p className="text-[13px] text-[#5b403f] leading-relaxed">
                {product.description ||
                  '100% Export grade high-density outer shell engineered for water resistance and thermal windproofing. Features an interior insulating brush-back soft fleece lining for snug all-day comfort.'}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="bg-white p-2.5 rounded-lg flex flex-col border border-[#E2E8F0]">
                  <span className="text-[11px] text-[#575e70]">Outer Shell</span>
                  <span className="text-[13px] font-semibold text-[#191c1e]">
                    {product.outerFabric || 'Polyester Weather-Shield'}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg flex flex-col border border-[#E2E8F0]">
                  <span className="text-[11px] text-[#575e70]">Interior Inner</span>
                  <span className="text-[13px] font-semibold text-[#191c1e]">
                    {product.interiorFabric || 'Ultra-soft Heat Fleece'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion Item 2: Fit & Sizing */}
        <div className="rounded-xl bg-[#f2f4f6] overflow-hidden shadow-xs border border-[#E2E8F0]">
          <button
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            onClick={() => toggleAccordion('fit')}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#b7102a] text-[20px]">
                checkroom
              </span>
              <span className="text-[14px] text-[#191c1e] font-semibold">Fit &amp; Sizing</span>
            </div>
            <span
              className={`material-symbols-outlined text-[#575e70] transition-transform duration-200 ${
                accordionState.fit ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {accordionState.fit && (
            <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
              <p className="text-[13px] text-[#5b403f] leading-relaxed">
                Regular comfort fit designed for versatile layering over tees or heavy hoodies.
                Tailored rib-knit stretch waistband and wrist cuffs maintain shape and prevent winter
                drafts. True to Pakistani export standard sizing.
              </p>
              <div className="bg-[#F1F5F9] p-3 rounded-lg flex items-center gap-2 border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[#575e70] text-[18px]">info</span>
                <span className="text-[12px] text-[#575e70]">
                  {product.fitNote || "Model is 6'0\" (183cm), 76kg and wears Size L."}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion Item 3: Delivery & Returns */}
        <div className="rounded-xl bg-[#f2f4f6] overflow-hidden shadow-xs border border-[#E2E8F0]">
          <button
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            onClick={() => toggleAccordion('delivery')}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#b7102a] text-[20px]">
                local_shipping
              </span>
              <span className="text-[14px] text-[#191c1e] font-semibold">
                Delivery &amp; Returns
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[#575e70] transition-transform duration-200 ${
                accordionState.delivery ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {accordionState.delivery && (
            <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
              <p className="text-[13px] text-[#5b403f] leading-relaxed">
                Reliable door-to-door delivery across Karachi, Lahore, Islamabad, and all cities in
                Pakistan within 2 to 5 working days. Cash on delivery (COD) and online card payments
                accepted.
              </p>
              <p className="text-[13px] text-[#5b403f] leading-relaxed">
                Backed by elo's 30-day no-hassle return or exchange policy. Unwashed, unworn
                merchandise with original surplus tags can be exchanged seamlessly at our
                Faisalabad fulfillment center.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews & Ratings Snapshot */}
      <section className="flex flex-col px-4 py-4 bg-[#f7f9fb]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[18px] font-bold text-[#191c1e]">Verified Customer Reviews</h2>
            <p className="text-[12px] text-[#575e70]">
              {product.reviewsCount} reviews from verified buyers
            </p>
          </div>
          <button
            className="text-[#b7102a] text-[12px] font-bold hover:underline cursor-pointer"
            onClick={() => setIsWriteReviewOpen(true)}
          >
            Write Review
          </button>
        </div>

        {/* Review Metric Card */}
        <div className="p-4 rounded-xl bg-[#f2f4f6] shadow-xs border border-[#E2E8F0] flex items-center gap-4 mb-3">
          <div className="flex flex-col items-center justify-center pr-1">
            <span className="text-[32px] text-[#191c1e] font-extrabold leading-none">
              {product.rating}
            </span>
            <div className="flex items-center text-[#b7102a] mt-1">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star_half
              </span>
            </div>
            <span className="text-[11px] text-[#575e70] mt-1">Overall Rating</span>
          </div>

          {/* Rating Bar Breakdown */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#575e70] w-3 font-semibold">5</span>
              <div className="flex-1 h-2 rounded-full bg-[#eceef0] overflow-hidden">
                <div className="h-full bg-[#b7102a] rounded-full" style={{ width: '86%' }} />
              </div>
              <span className="text-[11px] text-[#575e70] w-6 text-right">86%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#575e70] w-3 font-semibold">4</span>
              <div className="flex-1 h-2 rounded-full bg-[#eceef0] overflow-hidden">
                <div className="h-full bg-[#b7102a] rounded-full" style={{ width: '10%' }} />
              </div>
              <span className="text-[11px] text-[#575e70] w-6 text-right">10%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#575e70] w-3 font-semibold">3</span>
              <div className="flex-1 h-2 rounded-full bg-[#eceef0] overflow-hidden">
                <div className="h-full bg-[#575e70] rounded-full" style={{ width: '3%' }} />
              </div>
              <span className="text-[11px] text-[#575e70] w-6 text-right">3%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#575e70] w-3 font-semibold">2</span>
              <div className="flex-1 h-2 rounded-full bg-[#eceef0] overflow-hidden">
                <div className="h-full bg-[#575e70] rounded-full" style={{ width: '1%' }} />
              </div>
              <span className="text-[11px] text-[#575e70] w-6 text-right">1%</span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-2.5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-3.5 rounded-xl bg-[#f2f4f6] shadow-xs border border-[#E2E8F0] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#d9dff5] text-[#5c6274] font-bold text-center flex items-center justify-center text-xs">
                    {rev.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#191c1e]">{rev.author}</span>
                    <span className="text-[11px] text-[#006947] flex items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[13px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      Verified Buyer • {rev.location}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#575e70]">{rev.date}</span>
              </div>

              <div className="flex items-center text-[#b7102a]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                ))}
              </div>

              <p className="text-[12px] text-[#191c1e] leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-[#f7f9fb]/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40 px-4 py-3 pb-safe border-t border-[#E2E8F0]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Add to Bag CTA */}
          <button
            className="flex-1 h-12 rounded-xl bg-[#e0e3e5] text-[#191c1e] text-[14px] font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] shadow-xs hover:bg-[#eceef0] cursor-pointer"
            onClick={handleAddToBag}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Add to Bag</span>
            <span className="text-[#575e70] font-normal text-xs ml-0.5">
              Rs. {product.price.toLocaleString()}
            </span>
          </button>

          {/* Quick Buy Now Primary CTA */}
          <button
            className="flex-1 h-12 rounded-xl bg-[#b7102a] text-white text-[14px] font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] shadow-md hover:bg-[#db313f] cursor-pointer"
            onClick={handleQuickBuyNow}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span>Quick Buy Now</span>
          </button>
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsWriteReviewOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl z-10">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-bold text-[16px] text-[#191c1e]">Write a Review</h3>
              <button
                className="w-8 h-8 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#575e70] cursor-pointer"
                onClick={() => setIsWriteReviewOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddReview} className="mt-3 flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f7f9fb] border border-[#E2E8F0] rounded-lg text-xs outline-none focus:border-[#b7102a]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">City</label>
                <input
                  type="text"
                  placeholder="e.g. Islamabad"
                  value={newReviewCity}
                  onChange={(e) => setNewReviewCity(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f7f9fb] border border-[#E2E8F0] rounded-lg text-xs outline-none focus:border-[#b7102a]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">Rating</label>
                <div className="flex items-center gap-1 text-[#b7102a]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{
                          fontVariationSettings: star <= newReviewRating ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How does the fabric, fit, and surplus quality feel?"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full p-2.5 bg-[#f7f9fb] border border-[#E2E8F0] rounded-lg text-xs outline-none focus:border-[#b7102a] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full h-10 bg-[#b7102a] text-white rounded-lg text-xs font-bold shadow hover:bg-[#db313f] transition-colors cursor-pointer mt-1"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
