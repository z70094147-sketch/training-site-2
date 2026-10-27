import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setCheckoutOpen,
    cartItems,
    subtotal,
    totalDiscount,
    grandTotal,
    clearCart,
    deliveryNotes,
    navigateTo,
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    itemsCount: number;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = `ELO-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrder({
        orderNumber: orderNum,
        total: grandTotal,
        itemsCount: cartItems.reduce((acc, i) => acc + i.quantity, 0),
      });
      setIsSubmitting(false);
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    setCheckoutOpen(false);
    navigateTo('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2d3133]/60 backdrop-blur-xs transition-opacity"
        onClick={() => !isSubmitting && setCheckoutOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {confirmedOrder ? (
          /* Confirmation Screen */
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#006947] flex items-center justify-center mb-3 animate-bounce">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006947] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full mb-1">
              Order Confirmed
            </span>
            <h2 className="text-[20px] font-extrabold text-[#191c1e]">
              Thank You for Your Order!
            </h2>
            <p className="text-[13px] text-[#5b403f] mt-1">
              Order <strong className="text-[#191c1e]">{confirmedOrder.orderNumber}</strong> has been
              received at our Faisalabad fulfillment depot.
            </p>

            <div className="w-full my-4 p-3.5 bg-[#f7f9fb] rounded-xl border border-[#E2E8F0] text-left text-xs flex flex-col gap-2">
              <div className="flex justify-between text-[#5b403f]">
                <span>Recipient:</span>
                <span className="font-semibold text-[#191c1e]">{fullName}</span>
              </div>
              <div className="flex justify-between text-[#5b403f]">
                <span>Contact Phone:</span>
                <span className="font-semibold text-[#191c1e]">{phone}</span>
              </div>
              <div className="flex justify-between text-[#5b403f]">
                <span>Destination City:</span>
                <span className="font-semibold text-[#191c1e]">{city}</span>
              </div>
              <div className="flex justify-between text-[#5b403f]">
                <span>Payment Mode:</span>
                <span className="font-semibold text-[#191c1e] uppercase">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid Card'}
                </span>
              </div>
              <div className="h-px bg-[#E2E8F0]" />
              <div className="flex justify-between text-sm font-bold text-[#191c1e]">
                <span>Total Payable:</span>
                <span className="text-[#b7102a]">Rs. {confirmedOrder.total.toLocaleString()}.00</span>
              </div>
            </div>

            <div className="bg-[#ECFDF5] text-[#065F46] p-3 rounded-xl text-xs flex items-center gap-2 mb-4 w-full text-left">
              <span className="material-symbols-outlined text-[20px] shrink-0 text-[#006947]">
                local_shipping
              </span>
              <span>Estimated delivery: 2 to 4 working days via Leopards Courier.</span>
            </div>

            <button
              onClick={handleFinish}
              className="w-full h-11 bg-[#b7102a] text-white rounded-xl text-sm font-bold hover:bg-[#db313f] transition-all cursor-pointer shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7102a] text-[22px]">
                  lock
                </span>
                <h3 className="text-[17px] font-bold text-[#191c1e]">Express Checkout</h3>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#575e70] cursor-pointer"
                onClick={() => setCheckoutOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5b403f] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usman Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f7f9fb] border border-[#E2E8F0] rounded-lg text-xs outline-none focus:border-[#b7102a]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5b403f] block mb-1">
                  Mobile Number (For Courier SMS) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f7f9fb] border border-[#E2E8F0] rounded-lg text-xs outline-none focus:border-[#b7102a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#5b403f] block mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-10 px-2 bg-[#f7f9fb] border border-[#E2E8F0] rounded-lg text-xs outline-none focus:border-[#b7102a]"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#5b403f] block mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Pakistan"
                    className="w-full h-10 px-3 bg-[#eceef0] border border-[#E2E8F0] rounded-lg text-xs text-[#575e70]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5b403f] block mb-1">
                  Delivery Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House #, Street #, Sector / Colony"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f7f9fb] border border-[#E2E8F0] rounded-lg text-xs outline-none focus:border-[#b7102a]"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5b403f] block mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#b7102a] bg-[#FEE2E2]/30 text-[#991B1B] font-bold'
                        : 'border-[#E2E8F0] bg-[#f7f9fb] text-[#575e70]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    <span className="text-[11px]">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#b7102a] bg-[#FEE2E2]/30 text-[#991B1B] font-bold'
                        : 'border-[#E2E8F0] bg-[#f7f9fb] text-[#575e70]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                    <span className="text-[11px]">Online Card</span>
                  </button>
                </div>
              </div>

              {/* Order total recap */}
              <div className="p-3 bg-[#f2f4f6] rounded-xl border border-[#E2E8F0] flex items-center justify-between text-xs mt-1">
                <div className="flex flex-col">
                  <span className="text-[#5b403f]">
                    Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} pcs)
                  </span>
                  <span className="font-extrabold text-[15px] text-[#191c1e]">
                    Rs. {grandTotal.toLocaleString()}.00
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#006947] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                  Free Shipping
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#b7102a] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#db313f] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">
                      progress_activity
                    </span>
                    <span>Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Confirm Order • Rs. {grandTotal.toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
