import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsCharts({ data }) {
  const brandColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const monthlyData = data?.analytics?.assetsCreatedPerMonth?.map((item) => ({
    month: `${item._id.month}/2026`,
    assets: item.count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Assets by Brand - Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-slate-200 p-5">
          Assets by Brand
        </h2>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.analytics?.assetsByBrand}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="_id" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Assets by Dealer - Pie Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-slate-200 p-5">
          Assets Distribution by Dealer
        </h2>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data?.analytics?.assetsByDealer}
              dataKey="assetCount"
              nameKey="shopName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data?.analytics?.assetsByDealer?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={brandColors[index % brandColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend - Line Chart */}
      {/* <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Assets Created Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="assets"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}
