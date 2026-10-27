import React from 'react';
import { useApp } from '../context/AppContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setSizeGuideOpen } = useApp();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-[#2d3133]/50 backdrop-blur-xs transition-opacity"
        onClick={() => setSizeGuideOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7102a]">straighten</span>
            <h3 className="text-[16px] text-[#191c1e] font-bold">Jacket Size Chart (Inches)</h3>
          </div>
          <button
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#191c1e] hover:bg-[#eceef0] cursor-pointer"
            onClick={() => setSizeGuideOpen(false)}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-[12px] text-[#575e70] my-3 leading-relaxed">
          Measurements are taken with the garment laid flat. Standard Pakistani regular export comfort
          fit.
        </p>

        <div className="overflow-hidden rounded-xl bg-[#f2f4f6] shadow-xs border border-[#E2E8F0]">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-[#eceef0] text-[#191c1e] font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-2.5">Size</th>
                <th className="p-2.5">Chest</th>
                <th className="p-2.5">Length</th>
                <th className="p-2.5">Sleeve</th>
              </tr>
            </thead>
            <tbody className="text-[#5b403f] divide-y divide-[#E2E8F0]">
              <tr className="bg-white">
                <td className="p-2.5 font-bold text-[#191c1e]">S</td>
                <td className="p-2.5">40"</td>
                <td className="p-2.5">26"</td>
                <td className="p-2.5">25"</td>
              </tr>
              <tr className="bg-[#f2f4f6]">
                <td className="p-2.5 font-bold text-[#191c1e]">M</td>
                <td className="p-2.5">42"</td>
                <td className="p-2.5">27"</td>
                <td className="p-2.5">25.5"</td>
              </tr>
              <tr className="bg-white font-bold text-[#b7102a]">
                <td className="p-2.5">L (Standard)</td>
                <td className="p-2.5">44"</td>
                <td className="p-2.5">28"</td>
                <td className="p-2.5">26"</td>
              </tr>
              <tr className="bg-[#f2f4f6]">
                <td className="p-2.5 font-bold text-[#191c1e]">XL</td>
                <td className="p-2.5">46"</td>
                <td className="p-2.5">29"</td>
                <td className="p-2.5">26.5"</td>
              </tr>
              <tr className="bg-white">
                <td className="p-2.5 font-bold text-[#191c1e]">XXL</td>
                <td className="p-2.5">48"</td>
                <td className="p-2.5">30"</td>
                <td className="p-2.5">27"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 bg-[#ECFDF5] p-2.5 rounded-lg flex items-center gap-2 border border-[#006947]/20">
          <span className="material-symbols-outlined text-[#006947] text-[18px]">verified</span>
          <span className="text-[11px] text-[#065F46] font-medium">
            Free size exchange within 30 days if it doesn't fit!
          </span>
        </div>

        <button
          className="mt-4 w-full h-11 rounded-xl bg-[#2d3133] text-white text-[14px] font-bold shadow hover:bg-black transition-colors cursor-pointer"
          onClick={() => setSizeGuideOpen(false)}
        >
          Got It
        </button>
      </div>
    </div>
  );
};
