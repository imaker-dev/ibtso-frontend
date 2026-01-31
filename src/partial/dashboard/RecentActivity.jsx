import { Package, Store, ArrowRight, ChevronRight } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import NoDataFound from "../../components/NoDataFound";
import { Link } from "react-router-dom";
import DealerStatusBadge from "../../pages/dealers/DealerStatusBadge";
import AssetStatusBadge from "../../pages/assets/AssetStatusBadge";

/* ================= Asset Card ================= */
function AssetCard({ asset }) {
  return (
    <Link
      to={`/assets/asset?assetId=${asset?._id}`}
      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 transition hover:bg-gray-50 hover:border-blue-300 active:scale-[0.99] cursor-pointer"
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {asset?.assetNo}
          </p>

          <AssetStatusBadge status={asset?.status} />
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mt-1">
          {asset?.brand} • {asset?.dealerId?.shopName} •{" "}
          {formatDate(asset?.createdAt)}
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight className="h-5 w-5 text-gray-400 ml-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ================= Dealer Card ================= */
function DealerCard({ dealer }) {
  return (
    <Link
      to={`/dealers/dealer?dealerId=${dealer?._id}`}
      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 transition hover:bg-gray-50 hover:border-purple-300 active:scale-[0.99] cursor-pointer"
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {dealer?.name}
          </p>
          <DealerStatusBadge status={dealer?.isActive} />
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mt-1">
          {dealer?.shopName} • {dealer?.dealerCode}
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight className="h-5 w-5 text-gray-400 ml-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ================= Main Component ================= */
export default function RecentActivity({ data }) {
  const { assets = [], dealers = [] } = data || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ================= Recent Assets ================= */}
      <div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Assets
              </h2>
            </div>

            <Link
              to={"/assets"}
              className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="p-5 space-y-4">
            {assets.length === 0 ? (
              <NoDataFound
                icon={Package}
                title="No assets yet"
                description="Assets will appear here once added."
              />
            ) : (
              assets.map((asset) => <AssetCard key={asset._id} asset={asset} />)
            )}
          </div>
        </div>
      </div>

      {/* ================= Recent Dealers ================= */}
      <div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Dealers
              </h2>
            </div>

            <Link
              to={"/dealers"}
              className="text-sm font-medium text-purple-600 hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="p-5 space-y-4">
            {dealers.length === 0 ? (
              <NoDataFound
                icon={Store}
                title="No dealers yet"
                description="Dealers will appear here once created."
              />
            ) : (
              dealers.map((dealer) => (
                <DealerCard key={dealer._id} dealer={dealer} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
