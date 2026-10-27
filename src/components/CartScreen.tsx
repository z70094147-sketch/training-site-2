import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    applyPromo,
    removePromo,
    deliveryNotes,
    setDeliveryNotes,
    subtotal,
    totalDiscount,
    grandTotal,
    totalCartCount,
    setCheckoutOpen,
    navigateTo,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const freeShippingTarget = 4000;
  const remainingForFreeExpress = Math.max(0, freeShippingTarget - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingTarget) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromo(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="flex flex-col w-full pb-36">
      {/* Free Shipping Progress Tracker Card */}
      <div className="px-4 pt-2 pb-1">
        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#E2E8F0]/70">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[18px] text-[#006947]">
                local_shipping
              </span>
              <p className="text-[12px] text-[#191c1e] font-semibold truncate">
                {remainingForFreeExpress > 0 ? (
                  <>
                    Add <span className="text-[#b7102a] font-bold">Rs. {remainingForFreeExpress.toLocaleString()}</span> more for{' '}
                    <span className="text-[#006947] font-bold">FREE Express</span>!
                  </>
                ) : (
                  <span className="text-[#006947] font-bold">
                    🎉 You have unlocked FREE Express Delivery!
                  </span>
                )}
              </p>
            </div>
            <span className="text-[11px] text-[#006947] bg-[#ECFDF5] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full bg-[#eceef0] h-2 rounded-full overflow-hidden relative">
            <div
              className="bg-[#006947] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[#5b403f] text-[11px] font-semibold mt-1.5">
            <span>Current: Rs. {subtotal.toLocaleString()}</span>
            <span>Target: Rs. {freeShippingTarget.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Cart Header Sub-banner */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h1 className="text-[16px] text-[#191c1e] font-bold">My Bag</h1>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#e6e8ea] text-[#5b403f] font-semibold">
            {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <span className="text-[11px] text-[#FF3E3E] flex items-center gap-1 font-semibold">
          <span
            className="material-symbols-outlined text-[14px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          Surplus clearing fast
        </span>
      </div>

      {/* Cart Items List */}
      <div className="px-4 flex flex-col gap-2.5 mt-1">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-xs border border-[#E2E8F0] flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[48px] text-[#5b403f]/50 mb-2">
              remove_shopping_cart
            </span>
            <h3 className="text-[16px] font-bold text-[#191c1e]">Your bag is empty</h3>
            <p className="text-[12px] text-[#5b403f] mt-1 max-w-xs">
              Check out our factory surplus runout and crazy deal bundles!
            </p>
            <button
              onClick={() => navigateTo('deals')}
              className="mt-4 px-5 py-2.5 bg-[#b7102a] text-white rounded-lg text-xs font-bold shadow cursor-pointer active:scale-95"
            >
              Shop Crazy Deals
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3 shadow-xs border border-[#E2E8F0]/70 transition-all duration-300"
            >
              <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#f2f4f6] shrink-0">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover"
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                  {item.badge && (
                    <span className="absolute top-1 left-1 bg-[#FEE2E2] text-[#991B1B] text-[10px] px-1.5 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h2 className="text-[13px] text-[#191c1e] font-semibold line-clamp-2 leading-tight">
                        {item.name}
                      </h2>
                      <button
                        aria-label="Remove item"
                        className="text-[#5b403f] hover:text-[#ba1a1a] transition-colors p-1 cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    {/* Variants */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[12px] text-[#5b403f]">
                        Color: <span className="font-medium text-[#191c1e]">{item.selectedColor}</span>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#e4bebc]" />
                      <span className="text-[12px] text-[#5b403f]">
                        Size: <span className="font-medium text-[#191c1e]">{item.selectedSize}</span>
                      </span>
                    </div>
                  </div>

                  {/* Price & Controls */}
                  <div className="flex items-end justify-between gap-1 mt-2">
                    <div className="flex flex-col">
                      {item.originalPrice > item.price && (
                        <span className="text-[12px] text-[#5b403f] line-through">
                          Rs. {item.originalPrice.toLocaleString()}.00
                        </span>
                      )}
                      <span className="text-[15px] text-[#b7102a] font-bold">
                        Rs. {item.price.toLocaleString()}.00
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center bg-[#F1F5F9] rounded-lg p-0.5 shadow-inner border border-[#E2E8F0]">
                      <button
                        aria-label="Decrease quantity"
                        className="w-7 h-7 flex items-center justify-center text-[#5b403f] hover:text-[#191c1e] active:scale-95 rounded cursor-pointer"
                        onClick={() => updateQuantity(item.id, -1)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="w-6 text-center text-[13px] font-bold text-[#191c1e]">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        className="w-7 h-7 flex items-center justify-center text-[#5b403f] hover:text-[#191c1e] active:scale-95 rounded cursor-pointer"
                        onClick={() => updateQuantity(item.id, 1)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Coupon Code Voucher Module */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#E2E8F0]/70">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-[18px] text-[#b7102a]">sell</span>
            <span className="text-[14px] text-[#191c1e] font-bold">Coupons &amp; Offers</span>
          </div>

          {/* Applied Promo Pill */}
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-[#ECFDF5] px-3 py-2 rounded-lg mb-2 border border-[#006947]/20">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="material-symbols-outlined text-[18px] text-[#006947]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-[#065F46] tracking-wider uppercase">
                    {appliedCoupon.code} APPLIED
                  </p>
                  <p className="text-[11px] text-[#006947]">{appliedCoupon.label}</p>
                </div>
              </div>
              <button
                className="text-[#006947] hover:text-[#ba1a1a] text-[11px] font-bold uppercase transition-colors shrink-0 ml-2 cursor-pointer"
                onClick={removePromo}
                type="button"
              >
                Remove
              </button>
            </div>
          ) : null}

          {/* Input box for new promo */}
          <form className="relative flex items-center gap-2" onSubmit={handleApplyCoupon}>
            <div className="relative flex-1">
              <input
                className="w-full h-10 bg-[#F1F5F9] text-[#191c1e] rounded-lg pl-3 pr-3 text-[12px] uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal placeholder:text-[#5b403f]/60 outline-none focus:bg-white border border-[#E2E8F0] focus:border-[#b7102a] transition-all"
                placeholder="Enter promo or voucher (e.g. BUNDLE10)..."
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
            </div>
            <button
              className="h-10 px-4 bg-[#575e70] text-white rounded-lg text-[13px] font-bold hover:bg-[#191c1e] active:scale-95 transition-all shrink-0 cursor-pointer"
              type="submit"
            >
              Apply
            </button>
          </form>
        </div>
      </div>

      {/* Special Delivery Instructions Accordion */}
      <div className="px-4 mt-2">
        <div className="bg-white rounded-xl shadow-xs border border-[#E2E8F0]/70 overflow-hidden">
          <button
            className="w-full p-3 flex items-center justify-between text-left cursor-pointer"
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            type="button"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#5b403f]">
                edit_note
              </span>
              <span className="text-[12px] text-[#191c1e] font-semibold">
                Special Delivery Instructions
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[#5b403f] text-[20px] transition-transform duration-200 ${
                isNotesOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {isNotesOpen && (
            <div className="px-3 pb-3">
              <textarea
                className="w-full bg-[#F1F5F9] rounded-lg p-2.5 text-[12px] text-[#191c1e] placeholder:text-[#5b403f]/70 outline-none resize-none border border-[#E2E8F0] focus:border-[#b7102a] transition-all"
                placeholder="Add special instructions for delivery rider (e.g. Ring bell twice, leave with guard)..."
                rows={2}
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Breakdown */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#E2E8F0]/70">
          <h3 className="text-[14px] text-[#191c1e] font-bold mb-3">Order Summary</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px] text-[#5b403f]">
              <span>Subtotal ({totalCartCount} items)</span>
              <span className="text-[#191c1e] font-medium">Rs. {subtotal.toLocaleString()}.00</span>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-[12px] text-[#006947]">
                <span className="flex items-center gap-1">
                  Bundle Discount
                  <span className="text-[10px] bg-[#ECFDF5] text-[#065F46] px-1.5 py-0.2 rounded font-bold uppercase">
                    {appliedCoupon.code}
                  </span>
                </span>
                <span className="font-bold">-Rs. {totalDiscount.toLocaleString()}.00</span>
              </div>
            )}

            <div className="flex items-center justify-between text-[12px] text-[#5b403f]">
              <span className="flex items-center gap-1">
                Delivery (Standard PKT)
                <span className="text-[10px] bg-[#ECFDF5] text-[#065F46] px-1.5 py-0.2 rounded font-semibold">
                  Prepaid
                </span>
              </span>
              <span className="text-[#006947] font-bold uppercase tracking-wide">FREE</span>
            </div>

            <div className="h-px bg-[#e6e8ea] my-1" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[15px] text-[#191c1e] font-bold">Estimated Total</span>
                <span className="text-[10px] text-[#5b403f]">Includes all applicable duties</span>
              </div>
              <span className="text-[20px] text-[#b7102a] font-extrabold">
                Rs. {grandTotal.toLocaleString()}.00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Guarantee Badges */}
      <div className="px-4 mt-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#f2f4f6] rounded-xl p-2.5 flex flex-col items-center text-center border border-[#E2E8F0]">
            <span className="material-symbols-outlined text-[#b7102a] text-[20px] mb-1">
              payments
            </span>
            <span className="text-[11px] text-[#191c1e] font-bold leading-tight">
              Cash on Delivery
            </span>
            <span className="text-[10px] text-[#5b403f] mt-0.5">Pay at doorstep</span>
          </div>

          <div className="bg-[#f2f4f6] rounded-xl p-2.5 flex flex-col items-center text-center border border-[#E2E8F0]">
            <span className="material-symbols-outlined text-[#006947] text-[20px] mb-1">
              verified
            </span>
            <span className="text-[11px] text-[#191c1e] font-bold leading-tight">100% Genuine</span>
            <span className="text-[10px] text-[#5b403f] mt-0.5">Export Quality</span>
          </div>

          <div className="bg-[#f2f4f6] rounded-xl p-2.5 flex flex-col items-center text-center border border-[#E2E8F0]">
            <span className="material-symbols-outlined text-[#575e70] text-[20px] mb-1">
              published_with_changes
            </span>
            <span className="text-[11px] text-[#191c1e] font-bold leading-tight">30-Day Easy</span>
            <span className="text-[10px] text-[#5b403f] mt-0.5">Free Exchange</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Bar (Above Tab Shell) */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-[#f7f9fb]/95 backdrop-blur-md px-4 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-[#E2E8F0]">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <div className="flex flex-col min-w-[90px]">
            <span className="text-[10px] text-[#5b403f] uppercase font-semibold">Total to Pay</span>
            <span className="text-[16px] text-[#191c1e] font-extrabold leading-none">
              Rs. {grandTotal.toLocaleString()}
            </span>
          </div>
          <button
            className={`flex-1 h-12 rounded-lg text-[15px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer ${
              cartItems.length === 0
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-[#b7102a] text-white hover:bg-[#db313f]'
            }`}
            disabled={cartItems.length === 0}
            onClick={() => setCheckoutOpen(true)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
