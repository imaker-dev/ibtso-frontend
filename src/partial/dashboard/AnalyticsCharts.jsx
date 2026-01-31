import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import NoDataFound from "../../components/NoDataFound";

export default function AnalyticsCharts({ data }) {
  const { assetsByBrand, assetsByDealer } = data || {};

  const dealerBarData = (assetsByDealer || [])?.map((d) => ({
    dealer: d?.shopName,
    assets: d?.assetCount,
  }));

  const brandBarData = (assetsByBrand || [])?.map((b) => ({
    brand: b?._id,
    assets: b?.count,
  }));

  const hasDealerData = dealerBarData?.length > 0;
  const hasBrandData = brandBarData?.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Assets by Dealer
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribution by shop
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[320px] w-full px-4 pb-4">
          {hasDealerData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dealerBarData}
                margin={{ top: 24, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e5e7eb"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="dealer"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value} Assets`, "Assets"]}
                />

                <Bar
                  dataKey="assets"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                >
                  <LabelList position="top" fontSize={11} fill="#374151" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <NoDataFound
              title="No dealer data"
              description="Add assets to see dealer distribution"
            />
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Assets by Brand
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Brand-wise asset distribution
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[320px] w-full px-4 pb-4">
          {hasBrandData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={brandBarData}
                margin={{ top: 24, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e5e7eb"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="brand"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value} Assets`, "Assets"]}
                />

                <Bar
                  dataKey="assets"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                  barSize={48}
                >
                  <LabelList position="top" fontSize={11} fill="#374151" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <NoDataFound
              title="No brand data"
              description="Brand analytics will appear once assets are added"
            />
          )}
        </div>
      </div>
    </div>
  );
}
