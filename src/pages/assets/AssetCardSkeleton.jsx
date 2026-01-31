import React from "react";
import Shimmer from "../../components/Shimmer";

const AssetCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Shimmer width={48} height={48} rounded="lg" />

          <div className="flex-1 space-y-2">
            <Shimmer width="55%" height={14} />
            <Shimmer width="35%" height={12} />
          </div>
        </div>

        <Shimmer width={64} height={22} rounded="full" />
      </div>

      {/* ================= Body ================= */}
      <div className="px-5 pb-5 space-y-4">
        {/* Dealer line */}
        <div className="flex items-center gap-2">
          <Shimmer width="35%" height={12} />
          <Shimmer width="15%" height={12} />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Shimmer width="90%" height={12} />
          <Shimmer width="45%" height={12} />
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-3 pt-2">
          <Shimmer width={90} height={12} />
        </div>
      </div>

      {/* ================= Actions ================= */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
        <div className="grid grid-cols-3 gap-2">
          <Shimmer height={36} rounded="md" />
          <Shimmer height={36} rounded="md" />
          <Shimmer height={36} rounded="md" />
        </div>
      </div>
    </div>
  );
};

export default AssetCardSkeleton;
