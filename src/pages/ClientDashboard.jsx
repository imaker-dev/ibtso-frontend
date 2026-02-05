import React, { useEffect } from "react";
import PageHeader from "../components/layout/PageHeader";
import { useSelector, useDispatch } from "react-redux";
import { User, Package, Calendar, CheckCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import { fetchClientDashboardStats } from "../redux/slices/clientDashboardSlice";

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const { meData } = useSelector((state) => state.auth);
  const { dashboardStats, loading } = useSelector((state) => state.clientDashboard);

  useEffect(() => {
    dispatch(fetchClientDashboardStats());
  }, [dispatch]);

  const kpis = [
    {
      label: "Account Status",
      value: meData?.isActive ? "Active" : "Inactive",
      icon: CheckCircle,
      color: "emerald",
    },
    {
      label: "Total Assets",
      value: dashboardStats?.assets?.total || 0,
      icon: Package,
      color: "blue",
    },
    {
      label: "Active Assets",
      value: dashboardStats?.assets?.active || 0,
      icon: Package,
      color: "green",
    },
    {
      label: "Maintenance",
      value: dashboardStats?.assets?.maintenance || 0,
      icon: Package,
      color: "amber",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${meData?.name || 'Client'}`}
        description="View your account information and manage your assets."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.label}
            value={stat.value}
            color={stat.color}
            variant="compact"
          />
        ))}
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Getting Started
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-semibold">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Complete Your Profile</h3>
              <p className="text-sm text-gray-600 mt-1">
                Visit your profile page to update your information and preferences.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-semibold">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">View Your Assets</h3>
              <p className="text-sm text-gray-600 mt-1">
                Access and manage all your QR codes and assets from the Assets section.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-semibold">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Need Help?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Contact your administrator if you have any questions or need assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900 font-medium">{meData?.email || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Type</p>
            <p className="text-gray-900 font-medium capitalize">{meData?.role?.toLowerCase() || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Company</p>
            <p className="text-gray-900 font-medium">{meData?.company || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className={`font-medium ${meData?.isActive ? 'text-green-600' : 'text-red-600'}`}>
              {meData?.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
