import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface BestDealsBannerProps {
  onTriggerBestDeals: () => void;
  active: boolean;
}

export const BestDealsBanner: React.FC<BestDealsBannerProps> = ({
  onTriggerBestDeals,
  active
}) => {
  return (
    <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center">
          <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
        </div>
        <div>
          <div className="font-extrabold text-xs tracking-tight flex items-center gap-1">
            <span>Best Deals Near Me</span>
            <Sparkles className="w-3 h-3 text-amber-200" />
          </div>
          <p className="text-[10px] text-white/80 leading-none">
            Deep discounts on daily essentials
          </p>
        </div>
      </div>

      <button
        onClick={onTriggerBestDeals}
        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs ${
          active
            ? 'bg-slate-950 text-white'
            : 'bg-white text-orange-600 hover:bg-orange-50'
        }`}
      >
        {active ? 'Active' : 'Show Top Deals'}
      </button>
    </div>
  );
};
