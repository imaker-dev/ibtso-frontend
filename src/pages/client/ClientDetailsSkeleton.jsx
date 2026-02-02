import React from "react";
import Shimmer from "../../components/Shimmer";

/* ---------- Small Reusable Pieces ---------- */

const CardHeaderSkeleton = () => (
  <div className="flex items-center gap-2 border-b border-slate-200 p-5">
    <Shimmer width={20} height={20} rounded="full" />
    <Shimmer width={160} height={18} />
  </div>
);

const InfoRowSkeleton = ({ wide = false }) => (
  <div>
    <Shimmer width={110} height={12} className="mb-2" />
    <Shimmer width={wide ? "100%" : "70%"} height={18} />
  </div>
);

const CardSkeleton = ({ rows = 4 }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
    <CardHeaderSkeleton />
    <div className="p-5 space-y-5">
      {Array.from({ length: rows }).map((_, i) => (
        <InfoRowSkeleton key={i} wide={i % 2 === 0} />
      ))}
    </div>
  </div>
);

const DealerRowSkeleton = () => (
  <div className="flex items-center gap-4 py-3">
    <Shimmer width={40} height={40} rounded="md" />
    <div className="flex-1 space-y-2">
      <Shimmer width={180} height={14} />
      <Shimmer width={120} height={12} />
    </div>
    <Shimmer width={80} height={28} rounded="md" />
  </div>
);

/* ---------- Main Skeleton ---------- */

const ClientDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Shimmer width={200} height={22} />
        <Shimmer width={420} height={14} />
      </div>

      {/* Top Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal */}
        <CardSkeleton rows={3} />

        {/* Business */}
        <CardSkeleton rows={5} />

        {/* Meta */}
        <CardSkeleton rows={4} />
      </div>

      {/* Dealers Table Skeleton */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between border-b p-5">
          <Shimmer width={160} height={18} />
          <Shimmer width={90} height={28} rounded="md" />
        </div>

        <div className="p-5 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <DealerRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsSkeleton;
