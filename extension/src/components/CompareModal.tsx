import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { ProductDeal } from '../types';

interface CompareModalProps {
  comparedDeals: ProductDeal[];
  onClose: () => void;
  onRemoveDeal: (id: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  comparedDeals,
  onClose,
  onRemoveDeal
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end">
      <div className="bg-white rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xs font-bold text-slate-900">Compare Selected Products</h2>
            <p className="text-[11px] text-slate-500">
              Comparing {comparedDeals.length} items side-by-side
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto p-4 flex-1">
          <table className="w-full text-xs text-left border-collapse min-w-[340px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase">
                <th className="py-2 pr-2">Feature</th>
                {comparedDeals.map(d => (
                  <th key={d.id} className="py-2 px-2 min-w-[110px] relative">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 truncate">{d.product.brand}</span>
                      <button
                        onClick={() => onRemoveDeal(d.id)}
                        className="text-rose-500 hover:text-rose-700 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              <tr>
                <td className="py-2 font-medium text-slate-500">Product</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 font-bold text-slate-900">
                    {d.product.name}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Supermarket</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 font-semibold text-slate-700">
                    {d.store.name}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Distance</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 font-medium text-emerald-700">
                    {d.store.distanceKm.toFixed(1)} km
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Offer Price</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 font-extrabold text-slate-900">
                    {d.pricing.currency} {d.pricing.salePrice.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Normal Price</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 text-slate-400 line-through">
                    {d.pricing.currency} {d.pricing.regularPrice.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Discount</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 font-bold text-rose-600">
                    {d.pricing.discountPercent}% OFF
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Unit Price</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 font-semibold text-slate-800 bg-slate-50">
                    {d.pricing.currency} {d.pricing.unitPrice.toFixed(1)} / {d.pricing.unit}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Size</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 text-slate-600">
                    {d.product.packageSize} {d.product.unit}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-500">Status</td>
                {comparedDeals.map(d => (
                  <td key={d.id} className="py-2 px-2 text-[10px] text-emerald-700">
                    ✓ Verified
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
