import React from "react";
import Shimmer from "../../components/Shimmer";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* ================= KPI Skeletons ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <Shimmer width={40} height={40} rounded="lg" />
              <div className="flex-1 space-y-2">
                <Shimmer width="60%" height={12} />
                <Shimmer width="40%" height={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Charts Skeleton ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            {/* Chart Header */}
            <div className="px-5 py-4 border-b border-slate-100">
              <Shimmer width="45%" height={14} />
              <div className="mt-2">
                <Shimmer width="60%" height={10} />
              </div>
            </div>

            {/* Chart Area */}
            <div className="px-4 py-5">
              <Shimmer height={280} rounded="lg" />
            </div>
          </div>
        ))}
      </div>

      {/* ================= Recent Activity Skeleton ================= */}
      <div className="space-y-8">
        {[1, 2].map((section) => (
          <div key={section} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shimmer width={40} height={40} rounded="lg" />
                <div className="space-y-2">
                  <Shimmer width="140px" height={16} />
                  <Shimmer width="200px" height={12} />
                </div>
              </div>
              <Shimmer width={80} height={14} />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <Shimmer width="60%" height={14} />
                        <Shimmer width="40%" height={12} />
                      </div>
                      <Shimmer width={50} height={20} rounded="full" />
                    </div>

                    <div className="space-y-2">
                      <Shimmer width="50%" height={12} />
                      <Shimmer width="70%" height={12} />
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <Shimmer width="30%" height={12} />
                      <Shimmer width={16} height={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
