import { Package, Store, TrendingUp, AlertCircle } from 'lucide-react';

export default function KPICards({ data }) {
  const kpis = [
    {
      label: 'Total Assets',
      value: data.assets.total,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-100',
      trend: 'All Systems',
    },
    {
      label: 'Active Assets',
      value: data.assets.active,
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-600',
      bgColor: 'bg-emerald-100',
      trend: `${Math.round((data.assets.active / data.assets.total) * 100)}% Active`,
    },
    {
      label: 'Total Dealers',
      value: data.dealers.total,
      icon: Store,
      color: 'bg-purple-50 text-purple-600',
      bgColor: 'bg-purple-100',
      trend: `${data.dealers.active} Active`,
    },
    {
      label: 'Maintenance',
      value: data.assets.maintenance,
      icon: AlertCircle,
      color: 'bg-amber-50 text-amber-600',
      bgColor: 'bg-amber-100',
      trend: 'Needs Attention',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`h-12 w-12 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</p>
            <p className="text-xs text-gray-500">{kpi.trend}</p>
          </div>
        );
      })}
    </div>
  );
}
