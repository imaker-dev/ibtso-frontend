import React from "react";
import Shimmer from "../../components/Shimmer";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* ================= KPI Skeletons ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center gap-3">
              <Shimmer width="40px" height="40px" rounded="lg" />
              <div className="flex-1 space-y-2">
                <Shimmer width="60%" height="12px" />
                <Shimmer width="40%" height="20px" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Charts Skeleton ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-slate-200">
            <Shimmer width="40%" height="18px" />
          </div>
          <div className="p-5">
            <Shimmer height="260px" rounded="lg" />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-slate-200">
            <Shimmer width="60%" height="18px" />
          </div>
          <div className="p-5 flex justify-center">
            <Shimmer width="240px" height="240px" rounded="full" />
          </div>
        </div>

        {/* Line Chart */}
        {/* <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-5">
            <Shimmer width="35%" height="18px" />
          </div>
          <div className="p-5">
            <Shimmer height="300px" rounded="lg" />
          </div>
        </div> */}
      </div>

      {/* ================= Recent Activity Skeleton ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <Shimmer width="40%" height="18px" />
              <Shimmer width="60px" height="14px" />
            </div>

            <div className="p-5 space-y-3">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                >
                  <div className="flex-1 space-y-2">
                    <Shimmer width="50%" height="14px" />
                    <Shimmer width="80%" height="12px" />
                  </div>
                  <Shimmer width="16px" height="16px" />
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
