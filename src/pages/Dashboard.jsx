import React, { useEffect } from "react";
import PageHeader from "../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashbordStats } from "../redux/slices/dashboardSlice";
import AnalyticsCharts from "../partial/dashboard/AnalyticsCharts";
import RecentActivity from "../partial/dashboard/RecentActivity";
import { AlertCircle, Package, Store, TrendingUp } from "lucide-react";
import StatCard from "../components/StatCard";
import DashboardSkeleton from "../partial/dashboard/DashboardSkeleton";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashordStats,loading } = useSelector((state) => state.dashboard);
  const { assets, dealers,recent } = dashordStats || {};

  useEffect(() => {
    dispatch(fetchDashbordStats());
  }, []);

  const kpis = [
    {
      label: "Total Assets",
      value: assets?.total,
      icon: Package,
      color: "blue",
    },
    {
      label: "Active Assets",
      value: assets?.active,
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Total Dealers",
      value: dealers?.total,
      icon: Store,
      color: "purple",
    },
    {
      label: "Maintenance",
      value: assets?.maintenance,
      icon: AlertCircle,
      color: "amber",
    },
  ];

  if(loading){
    return <DashboardSkeleton />
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="View key metrics, recent activity, and system insights at a glance."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis?.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat?.label}
            value={stat?.value}
            color={stat?.color}
            variant="compact"
          />
        ))}
      </div>

      {/* Analytics Charts */}
      <AnalyticsCharts data={dashordStats} />

      <RecentActivity data={recent} />
    </div>
  );
};

export default Dashboard;
