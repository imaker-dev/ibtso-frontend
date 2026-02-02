import { Package, Store, ArrowRight } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import AssetStatusBadge from "../../pages/assets/AssetStatusBadge";
import DealerStatusBadge from "../../pages/dealers/DealerStatusBadge";
import { Link } from "react-router-dom";
import NoDataFound from "../../components/NoDataFound";

// Asset Card Component
const AssetCard = ({ asset }) => {
  return (
    <Link
      to={`/assets/asset?assetId=${asset?._id}`}
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md cursor-pointer"
    >
      <div className="relative z-10 space-y-3">
        {/* Header with Asset No and Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {asset?.assetNo}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Fixture: {asset?.fixtureNo}
            </p>
          </div>
          <AssetStatusBadge status={asset?.status} />
        </div>

        {/* Brand and Dealer Info */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <p className="text-sm text-gray-700 font-medium">{asset?.brand}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Store className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{asset?.dealerId?.shopName}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {formatDate(asset?.createdAt, "long")}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </Link>
  );
};

// Dealer Card Component
const DealerCard = ({ dealer }) => {
  return (
    <Link
      to={`/dealers/dealer?dealerId=${dealer?._id}`}
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-purple-300 hover:shadow-md cursor-pointer"
    >
      <div className="relative z-10 space-y-3">
        {/* Header with Dealer Name and Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {dealer?.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Code: {dealer?.dealerCode}
            </p>
          </div>
          <DealerStatusBadge status={dealer?.isActive} />
        </div>

        {/* Shop and Email Info */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <p className="text-sm text-gray-700 font-medium truncate">
              {dealer?.shopName}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 truncate">
            <Package className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{dealer?.email}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {formatDate(dealer?.createdAt, "long")}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-500 transition-colors" />
        </div>
      </div>
    </Link>
  );
};

// Main Component
export default function RecentActivity({ assets, dealers }) {
  return (
    <div className="space-y-8">
      {/* ================= Recent Assets Section ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Assets
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Latest inventory additions
              </p>
            </div>
          </div>
          <div className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {assets?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets?.slice(0, 3)?.map((asset) => (
              <AssetCard key={asset?._id} asset={asset} />
            ))}
          </div>
        ) : (
          <NoDataFound
            icon={Package}
            title="No assets yet"
            description="Assets will appear here once added to the system"
            className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center"
          />
        )}
      </div>

      {/* ================= Recent Dealers Section ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
              <Store className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Dealers
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Latest dealer registrations
              </p>
            </div>
          </div>
          <div className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {dealers?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dealers?.slice(0, 3).map((dealer) => (
              <DealerCard key={dealer?._id} dealer={dealer} />
            ))}
          </div>
        ) : (
          <NoDataFound
            icon={Store}
            title="No dealers yet"
            description="Dealers will appear here once registered in the system"
            className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center"
          />
        )}
      </div>
    </div>
  );
}
