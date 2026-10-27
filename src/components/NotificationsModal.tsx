import React from 'react';
import { useApp } from '../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const { isNotificationsOpen, setNotificationsOpen, navigateTo, openProductDetail } = useApp();

  if (!isNotificationsOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: '⚡ Surplus Drop: Men’s Bomber Jacket',
      desc: 'Only 2 pieces remaining in Beige Size L at 42% discount.',
      time: '10 mins ago',
      unread: true,
      productId: 'bhm-bomber-jacket',
    },
    {
      id: 'notif-2',
      title: '🔥 Crazy Deals Flash Window Closing',
      desc: 'Export surplus runout window closes Thursday 11:59 AM.',
      time: '1 hour ago',
      unread: true,
      action: () => navigateTo('deals'),
    },
    {
      id: 'notif-3',
      title: '📦 Order #ELO-39185 Delivered',
      desc: 'Delivered via Leopards Courier in Lahore. 30-Day exchange active.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 'notif-4',
      title: '🎉 Free Express Delivery Threshold',
      desc: 'Add items worth Rs. 4,000 or above for automated express priority.',
      time: '2 days ago',
      unread: false,
      action: () => navigateTo('cart'),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16">
      <div
        className="absolute inset-0 bg-[#2d3133]/50 backdrop-blur-xs transition-opacity"
        onClick={() => setNotificationsOpen(false)}
      />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl z-10 overflow-hidden border border-[#E2E8F0] animate-in fade-in duration-200">
        <div className="p-3.5 bg-[#f7f9fb] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7102a] text-[20px]">
              notifications
            </span>
            <h3 className="text-sm font-bold text-[#191c1e]">Surplus Restock &amp; Alerts</h3>
          </div>
          <button
            onClick={() => setNotificationsOpen(false)}
            className="w-7 h-7 rounded-full bg-[#eceef0] flex items-center justify-center text-[#575e70] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="divide-y divide-[#E2E8F0] max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 hover:bg-[#f7f9fb] transition-colors cursor-pointer flex flex-col gap-0.5 ${
                n.unread ? 'bg-[#ffdad8]/10' : ''
              }`}
              onClick={() => {
                setNotificationsOpen(false);
                if (n.productId) {
                  openProductDetail(n.productId);
                } else if (n.action) {
                  n.action();
                }
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#191c1e]">{n.title}</span>
                <span className="text-[10px] text-[#64748B]">{n.time}</span>
              </div>
              <p className="text-[11px] text-[#5b403f] leading-snug">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
