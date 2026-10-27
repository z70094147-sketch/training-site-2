import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast || !toast.visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform translate-y-0 opacity-100 w-[90%] max-w-[340px] pointer-events-none animate-in fade-in slide-in-from-bottom-3">
      <div className="bg-[#191c1e] text-white py-2.5 px-4 rounded-xl shadow-2xl flex items-center justify-between gap-2 border border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="material-symbols-outlined text-[#FF3E3E] text-[20px] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-white line-clamp-1 block">
              {toast.message}
            </span>
            {toast.subtext && (
              <span className="text-[10px] text-white/70 block">{toast.subtext}</span>
            )}
          </div>
        </div>
        <span className="text-[11px] font-bold text-[#FF3E3E] uppercase tracking-wide shrink-0">
          Reserved
        </span>
      </div>
    </div>
  );
};
