import React from "react";
import Shimmer from "../../components/Shimmer";

const DealerCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Shimmer width={48} height={48} rounded="lg" />

          <div className="space-y-2">
            <Shimmer width={120} height={14} />
            <Shimmer width={90} height={12} />
          </div>
        </div>

        {/* Status badge placeholder */}
        <Shimmer width={64} height={22} rounded="full" />
      </div>

      {/* ================= Body ================= */}
      <div className="px-5 pb-5 space-y-3">
        {/* Email */}
        <div className="flex items-center gap-2">
          <Shimmer width={16} height={16} rounded="full" />
          <Shimmer width="70%" height={12} />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <Shimmer width={16} height={16} rounded="full" />
          <Shimmer width="45%" height={12} />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Shimmer width="90%" height={12} />
          <Shimmer width="50%" height={12} />
        </div>
      </div>

      {/* ================= Actions ================= */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
        <div className="grid grid-cols-2 gap-3">
          <Shimmer height={36} rounded="md" />
          <Shimmer height={36} rounded="md" />
        </div>
      </div>
    </div>
  );
};

export default DealerCardSkeleton;
