import React from 'react';
import { ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { ProductDeal } from '../types';

interface ProductCardProps {
  deal: ProductDeal;
  isCompared: boolean;
  onToggleCompare: (deal: ProductDeal) => void;
  onAddToList: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  deal,
  isCompared,
  onToggleCompare,
  onAddToList
}) => {
  const { product, store, pricing, offer } = deal;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    window.open(url, '_blank');
  };

  const handleViewOffer = () => {
    if (offer.sourceUrl) {
      window.open(offer.sourceUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:shadow-md transition-shadow relative">
      {/* Top badges: Store & Distance */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md truncate">
            {store.name}
          </span>
          {store.branch && (
            <span className="text-[10px] text-slate-500 truncate hidden sm:inline">
              • {store.branch}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
          <Navigation className="w-2.5 h-2.5" />
          <span>{store.distanceKm.toFixed(1)} km</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-xl">🛒</span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              {product.brand}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {product.packageSize} {product.unit}
            </span>
          </div>

          <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">
            {product.name}
          </h3>

          {/* Pricing Row */}
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-sm font-extrabold text-slate-900">
              {pricing.currency} {pricing.salePrice.toLocaleString()}
            </span>
            {pricing.regularPrice > pricing.salePrice && (
              <span className="text-[11px] text-slate-400 line-through">
                {pricing.currency} {pricing.regularPrice.toLocaleString()}
              </span>
            )}
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
              {pricing.discountPercent}% OFF
            </span>
          </div>

          {/* Unit Price & Savings */}
          <div className="mt-0.5 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium">
              {pricing.currency} {pricing.unitPrice.toFixed(1)} / {pricing.unit}
            </span>
            {pricing.savings > 0 && (
              <span className="text-emerald-600 font-bold">
                Save {pricing.currency} {pricing.savings.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Verification Status & Expiry */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center gap-1 truncate">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span className="truncate">
            {offer.verificationStatus === 'verified_retailer' ? 'Verified Feed' : 'Catalog Offer'}
          </span>
          {offer.validUntil && (
            <span className="text-slate-400">
              • Valid: {new Date(offer.validUntil).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onToggleCompare(deal)}
            className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition-colors ${
              isCompared
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {isCompared ? 'Compared' : '+ Compare'}
          </button>

          <button
            onClick={() => onAddToList(product.name)}
            className="text-[10px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded transition-colors"
            title="Add to shopping list"
          >
            + List
          </button>

          <button
            onClick={handleDirections}
            className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors"
            title="Directions on Google Maps"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>

          {offer.sourceUrl && (
            <button
              onClick={handleViewOffer}
              className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors"
              title="View on Retailer Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
