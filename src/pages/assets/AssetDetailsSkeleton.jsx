import React from "react";
import Shimmer from "../../components/Shimmer";

const SectionHeaderSkeleton = () => (
  <div className="flex items-center gap-2 border-b border-slate-200 p-5">
    <Shimmer width={20} height={20} rounded="full" />
    <Shimmer width={180} height={18} />
  </div>
);

const InfoBlockSkeleton = ({ wide = false }) => (
  <div>
    <Shimmer width={120} height={12} className="mb-2" />
    <Shimmer width={wide ? "100%" : "70%"} height={18} />
  </div>
);

const DimensionCardSkeleton = () => (
  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
    <Shimmer width={80} height={12} className="mb-2" />
    <Shimmer width={90} height={22} />
  </div>
);

const AssetDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Shimmer width={200} height={22} />
        <Shimmer width={420} height={14} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <SectionHeaderSkeleton />
            <div className="p-5 grid sm:grid-cols-2 gap-6">
              <InfoBlockSkeleton />
              <InfoBlockSkeleton />
              <InfoBlockSkeleton />
              <InfoBlockSkeleton />
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <SectionHeaderSkeleton />
            <div className="p-5 grid sm:grid-cols-3 gap-4">
              <DimensionCardSkeleton />
              <DimensionCardSkeleton />
              <DimensionCardSkeleton />
            </div>
          </div>

          {/* Installation & Tracking */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <SectionHeaderSkeleton />
            <div className="p-5 grid sm:grid-cols-2 gap-6">
              <InfoBlockSkeleton />
              <InfoBlockSkeleton />
            </div>
          </div>

          {/* Barcode Section */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <SectionHeaderSkeleton />
            <div className="p-5 space-y-4">
              <InfoBlockSkeleton wide />

              <div>
                <Shimmer width={120} height={12} className="mb-2" />
                <Shimmer width="100%" height={160} rounded="lg" />
              </div>

              <Shimmer width="100%" height={40} rounded="lg" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Asset Location */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <SectionHeaderSkeleton />
            <div className="p-5 space-y-4">
              <Shimmer width="100%" height={16} />
              <div className="grid grid-cols-2 gap-4">
                <InfoBlockSkeleton />
                <InfoBlockSkeleton />
              </div>
              <Shimmer width="100%" height={36} rounded="lg" />
            </div>
          </div>

          {/* Dealer Information */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <SectionHeaderSkeleton />
            <div className="p-5 space-y-4">
              <InfoBlockSkeleton />
              <InfoBlockSkeleton />
              <InfoBlockSkeleton wide />
              <InfoBlockSkeleton />
              <InfoBlockSkeleton wide />
            </div>
          </div>

          {/* Created By */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <SectionHeaderSkeleton />
            <div className="p-5 space-y-4">
              <InfoBlockSkeleton />
              <InfoBlockSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsSkeleton;
