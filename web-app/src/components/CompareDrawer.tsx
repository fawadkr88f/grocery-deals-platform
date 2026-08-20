import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { ProductDeal } from '../types';

interface CompareDrawerProps {
  comparedDeals: ProductDeal[];
  onClose: () => void;
  onRemoveDeal: (id: string) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  comparedDeals,
  onClose,
  onRemoveDeal
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Compare Selected Supermarket Products</h2>
            <p className="text-xs text-slate-500">Side-by-side price, unit cost, and discount analysis</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase">
                <th className="py-2.5 pr-3">Feature</th>
                {comparedDeals.map(d => (
                  <th key={d.id} className="py-2.5 px-3 min-w-[140px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 truncate">{d.product.brand}</span>
                      <button
                        onClick={() => onRemoveDeal(d.id)}
                        className="text-rose-500 hover:text-rose-700 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              <tr>
                <td className="py-3 font-semibold text-slate-500">Product</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-3 px-3 font-extrabold text-slate-900">{d.product.name}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-500">Supermarket</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-3 px-3 font-bold text-slate-800">{d.store.name}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-500">Distance</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-3 px-3 font-bold text-emerald-700">{d.store.distanceKm.toFixed(1)} km</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-500">Offer Price</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-3 px-3 font-black text-slate-900 text-sm">
                    {d.pricing.currency} {d.pricing.salePrice.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-500">Regular Price</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-3 px-3 text-slate-400 line-through">
                    {d.pricing.currency} {d.pricing.regularPrice.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-500">Discount %</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-3 px-3 font-extrabold text-rose-600">{d.pricing.discountPercent}% OFF</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-500">Unit Price</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-3 px-3 font-bold text-slate-900 bg-emerald-50/50">
                    {d.pricing.currency} {d.pricing.unitPrice.toFixed(1)} / {d.pricing.unit}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
