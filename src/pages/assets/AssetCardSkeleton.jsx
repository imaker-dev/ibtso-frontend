import React from "react";
import Shimmer from "../../components/Shimmer";

const AssetCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Shimmer width={44} height={44} rounded="lg" />
        <div className="flex-1 space-y-2">
          <Shimmer width="60%" height={14} />
          <Shimmer width="40%" height={12} />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <Shimmer width="70%" height={12} />
        <Shimmer width="90%" height={12} />
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Shimmer height={36} rounded="md" />
        <Shimmer height={36} rounded="md" />
        <Shimmer height={36} rounded="md" />
      </div>
    </div>
  );
};

export default AssetCardSkeleton;
