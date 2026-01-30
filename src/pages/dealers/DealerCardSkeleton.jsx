import React from "react";
import Shimmer from "../../components/Shimmer";

const DealerCardSkeleton = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <div className="flex items-center gap-3 mb-4">
      <Shimmer width={44} height={44} rounded="lg" />
      <div className="space-y-2">
        <Shimmer width={120} height={14} />
        <Shimmer width={80} height={12} />
      </div>
    </div>

    <div className="space-y-3">
      <Shimmer width="80%" height={12} />
      <Shimmer width="70%" height={12} />
      <Shimmer width="90%" height={12} />
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3">
      <Shimmer height={36} />
      <Shimmer height={36} />
    </div>
  </div>
);

export default DealerCardSkeleton;
