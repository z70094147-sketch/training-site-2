import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const VisualSearchModal: React.FC = () => {
  const { isVisualSearchOpen, setVisualSearchOpen, openProductDetail } = useApp();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  if (!isVisualSearchOpen) return null;

  const handleSelectSample = (productId: string) => {
    setVisualSearchOpen(false);
    openProductDetail(productId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#2d3133]/60 backdrop-blur-xs"
        onClick={() => setVisualSearchOpen(false)}
      />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl z-10 p-5 overflow-hidden border border-[#E2E8F0]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7102a] text-[22px]">
              photo_camera
            </span>
            <h3 className="text-sm font-bold text-[#191c1e]">Visual Surplus Search</h3>
          </div>
          <button
            onClick={() => setVisualSearchOpen(false)}
            className="w-7 h-7 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#575e70] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#5b403f] my-3 leading-relaxed">
          Search Pakistan's export leftovers by photo or choose a sample apparel piece:
        </p>

        {/* Camera simulation box */}
        <label className="border-2 border-dashed border-[#E2E8F0] hover:border-[#b7102a] rounded-xl p-4 flex flex-col items-center justify-center text-center bg-[#f7f9fb] cursor-pointer transition-colors group mb-3">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => {
              // Simulated instant visual match
              handleSelectSample('bhm-bomber-jacket');
            }}
          />
          <span className="material-symbols-outlined text-[36px] text-[#5b403f] group-hover:text-[#b7102a] transition-colors mb-1">
            add_a_photo
          </span>
          <span className="text-xs font-bold text-[#191c1e]">Take Photo or Upload Image</span>
          <span className="text-[10px] text-[#64748B]">Instant AI visual apparel match</span>
        </label>

        <span className="text-[11px] font-bold text-[#5b403f] uppercase tracking-wider block mb-2">
          Or Tap Quick Sample Match
        </span>

        <div className="grid grid-cols-3 gap-2">
          {PRODUCTS.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectSample(p.id)}
              className="flex flex-col items-center p-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#b7102a] bg-[#f7f9fb] text-left cursor-pointer transition-all"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full aspect-square object-cover rounded mb-1"
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-semibold text-[#191c1e] line-clamp-1 truncate w-full text-center">
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </span>
              <span className="text-[10px] font-bold text-[#b7102a]">
                Rs. {p.price.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
