import React from "react";
import Shimmer from "../../components/Shimmer";

const CardSkeleton = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Card Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 p-5">
        <Shimmer width={20} height={20} rounded="full" />
        <Shimmer width={160} height={18} />
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        <div>
          <Shimmer width={90} height={12} className="mb-2" />
          <Shimmer width="70%" height={18} />
        </div>

        <div>
          <Shimmer width={110} height={12} className="mb-2" />
          <Shimmer width="60%" height={18} />
        </div>

        <div>
          <Shimmer width={130} height={12} className="mb-2" />
          <Shimmer width="100%" height={34} />
        </div>
      </div>
    </div>
  );
};

const TableRowSkeleton = () => {
  return (
    <div className="flex items-center gap-4 py-3">
      <Shimmer width={40} height={40} rounded="md" />
      <div className="flex-1 space-y-2">
        <Shimmer width="40%" height={14} />
        <Shimmer width="55%" height={12} />
      </div>
      <Shimmer width={90} height={14} />
      <Shimmer width={70} height={26} rounded="full" />
    </div>
  );
};

const DealerDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Shimmer width={220} height={22} />
        <Shimmer width={420} height={14} />
      </div>

      {/* Info Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Assets Table */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="p-5 border-b border-slate-200">
          <Shimmer width={160} height={18} />
        </div>

        <div className="p-5 space-y-3">
          {[...Array(5)].map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealerDetailsSkeleton;
