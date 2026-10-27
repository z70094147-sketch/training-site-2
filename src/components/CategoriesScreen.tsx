import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const CategoriesScreen: React.FC = () => {
  const { openProductDetail, navigateTo, addToCart } = useApp();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'men' | 'women' | 'kids' | 'clearance'>('men');

  const categoryTabs = [
    { id: 'men', label: 'Men', icon: 'male' },
    { id: 'women', label: 'Women', icon: 'female' },
    { id: 'kids', label: 'Kids', icon: 'child_care' },
    { id: 'clearance', label: 'Surplus Runout', icon: 'local_fire_department' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategoryTab === 'clearance') return p.tags.includes('clearance') || p.price <= 999;
    return p.category === selectedCategoryTab;
  });

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Categories Top Selector */}
      <div className="px-4 py-2 bg-white border-b border-[#E2E8F0]">
        <div className="grid grid-cols-4 gap-1.5">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategoryTab(tab.id as any)}
                className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#b7102a] text-white shadow-xs'
                    : 'bg-[#F1F5F9] text-[#5b403f] hover:bg-[#eceef0]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] mb-0.5">{tab.icon}</span>
                <span className="truncate w-full text-center text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Banner */}
      <div className="px-4 pt-3 pb-1">
        <div className="p-3 bg-gradient-to-r from-[#d9dff5] to-[#f2f4f6] rounded-xl flex items-center justify-between border border-[#E2E8F0]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#b7102a]">
              Export Surplus Catalog
            </span>
            <h2 className="text-[16px] font-bold text-[#191c1e] capitalize">
              {selectedCategoryTab === 'clearance' ? 'Flash Clearance' : `${selectedCategoryTab}'s Collection`}
            </h2>
            <p className="text-[11px] text-[#5b403f]">
              {filteredProducts.length} verified export leftovers available
            </p>
          </div>
          <button
            onClick={() => navigateTo('deals')}
            className="px-3 py-1.5 bg-[#b7102a] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer active:scale-95"
          >
            Crazy Deals
          </button>
        </div>
      </div>

      {/* Category Products Grid */}
      <div className="px-4 py-2 grid grid-cols-2 gap-3">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl shadow-xs border border-[#E2E8F0]/70 overflow-hidden flex flex-col justify-between cursor-pointer group hover:shadow-md transition-shadow"
            onClick={() => openProductDetail(prod.id)}
          >
            <div className="relative aspect-[4/5] bg-[#f2f4f6] overflow-hidden">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 bg-[#FEE2E2] text-[#991B1B] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                Save {prod.discountPct}%
              </span>
            </div>

            <div className="p-2.5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] text-[#64748B] block mb-0.5">{prod.brand}</span>
                <h4 className="text-[12px] font-semibold text-[#191c1e] line-clamp-2 leading-snug">
                  {prod.name}
                </h4>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[15px] text-[#b7102a] font-bold">
                    Rs. {prod.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#64748B] line-through">
                    Rs. {prod.originalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  className="mt-2 w-full py-1.5 rounded-lg text-xs font-bold bg-[#b7102a] text-white hover:bg-[#db313f] active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(prod);
                  }}
                >
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>Quick Buy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
