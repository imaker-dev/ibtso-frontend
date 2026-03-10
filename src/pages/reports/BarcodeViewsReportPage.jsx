import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart3,
  CalendarRange,
  Hash,
  Package,
  ScanLine,
  Users,
} from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/StatCard";
import SmartTable from "../../components/layout/SmartTable";
import SearchBar from "../../components/SearchBar";
import { formatDate } from "../../utils/dateFormatter";
import { formatNumber } from "../../utils/numberFormatter";
import {
  fetchBarcodeViewAssets,
  fetchBarcodeViewSummary,
} from "../../redux/slices/barcodeReportSlice";
import { fetchAllDealers } from "../../redux/slices/dealerSlice";
import { fetchAllClients } from "../../redux/slices/clientSlice";
import { fetchAllBrands } from "../../redux/slices/brandSlice";
import NoDataFound from "../../components/NoDataFound";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DEFAULT_PAGE_SIZE = 10;

const BarcodeViewsReportPage = () => {
  const dispatch = useDispatch();

  const { summary, assets, summaryLoading, assetsLoading } = useSelector(
    (state) => state.barcodeReport,
  );

  const { allDealersData } = useSelector((state) => state.dealer);
  const { allClientsData } = useSelector((state) => state.client);
  const { allBrandsData } = useSelector((state) => state.brand);
  const { meData } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    dealerId: "",
    clientId: "",
    brandId: "",
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("totalViews");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_PAGE_SIZE);

  const isAdmin = meData?.role === "ADMIN";

  useEffect(() => {
    dispatch(fetchAllDealers());
    dispatch(fetchAllClients());
    dispatch(fetchAllBrands());
  }, [dispatch]);

  useEffect(() => {
    const summaryParams = {
      ...(filters.startDate ? { startDate: filters.startDate } : {}),
      ...(filters.endDate ? { endDate: filters.endDate } : {}),
      ...(filters.dealerId ? { dealerId: filters.dealerId } : {}),
      ...(filters.clientId ? { clientId: filters.clientId } : {}),
      ...(filters.brandId ? { brandId: filters.brandId } : {}),
    };

    dispatch(fetchBarcodeViewSummary(summaryParams));
  }, [dispatch, filters]);

  useEffect(() => {
    const assetsParams = {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      ...(filters.startDate ? { startDate: filters.startDate } : {}),
      ...(filters.endDate ? { endDate: filters.endDate } : {}),
      ...(filters.dealerId ? { dealerId: filters.dealerId } : {}),
      ...(filters.clientId ? { clientId: filters.clientId } : {}),
      ...(filters.brandId ? { brandId: filters.brandId } : {}),
    };

    dispatch(fetchBarcodeViewAssets(assetsParams));
  }, [dispatch, filters, limit, page, search, sortBy, sortOrder]);

  const handleFilterChange = (key, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (field, direction) => {
    setPage(1);
    setSortBy(field);
    setSortOrder(direction);
  };

  const dealers = Array.isArray(allDealersData?.data)
    ? allDealersData.data
    : Array.isArray(allDealersData)
      ? allDealersData
      : [];
  const clients = Array.isArray(allClientsData)
    ? allClientsData
    : Array.isArray(allClientsData?.data)
      ? allClientsData.data
      : [];
  const brands = Array.isArray(allBrandsData)
    ? allBrandsData
    : Array.isArray(allBrandsData?.data)
      ? allBrandsData.data
      : [];

  const assetRows = assets?.data || [];
  const totalAssets = assets?.total ?? 0;
  const totalPages = assets?.totalPages ?? 1;
  const currentPage = assets?.currentPage ?? page;

  const viewsByDay = useMemo(() => {
    const raw = summary?.viewsByDay || [];
    return raw.map((item) => ({
      date: item.date,
      totalViews: item.totalViews ?? 0,
    }));
  }, [summary]);

  const topAssets = summary?.topAssets || [];
  const totals = summary?.totals || {};

  const assetColumns = [
    {
      label: "Asset",
      key: "assetNo",
      sortable: true,
      sortKey: "assetNo",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-white">
            <Package className="h-4 w-4 text-slate-700" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {row?.assetNo || "—"}
            </div>
            <div className="text-xs text-slate-500 truncate">
              Fixture · {row?.fixtureNo || "—"}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Barcode",
      key: "barcodeValue",
      render: (row) => (
        <span className="text-xs font-medium text-slate-700">
          {row?.barcodeValue || "—"}
        </span>
      ),
    },
    {
      label: "Dealer",
      key: "dealer",
      render: (row) => (
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900 truncate">
            {row?.dealer?.name || "—"}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {row?.dealer?.dealerCode || "—"}
          </div>
        </div>
      ),
    },
    {
      label: "Brand",
      key: "brand",
      render: (row) => (
        <span className="inline-flex rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
          {row?.brand?.name || "—"}
        </span>
      ),
    },
    {
      label: "Total Views",
      key: "totalViews",
      sortable: true,
      sortKey: "totalViews",
      render: (row) => (
        <span className="text-sm font-semibold text-slate-800">
          {typeof row?.totalViews === "number"
            ? formatNumber(row.totalViews)
            : "—"}
        </span>
      ),
    },
    {
      label: "First Viewed",
      key: "firstViewedAt",
      sortable: true,
      sortKey: "firstViewedAt",
      render: (row) => (
        <span className="text-xs font-medium text-slate-700">
          {formatDate(row?.firstViewedAt, "long")}
        </span>
      ),
    },
    {
      label: "Last Viewed",
      key: "lastViewedAt",
      sortable: true,
      sortKey: "lastViewedAt",
      render: (row) => (
        <span className="text-xs font-medium text-slate-700">
          {formatDate(row?.lastViewedAt, "long")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Barcode View Reports"
        description="Track barcode scans, trend views, and the most viewed assets."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Views"
          value={totals?.totalViews ?? 0}
          icon={ScanLine}
          color="blue"
          subtitle="All scans in range"
        />
        <StatCard
          title="Unique Barcodes"
          value={totals?.uniqueBarcodeValuesViewed ?? 0}
          icon={Hash}
          color="purple"
          subtitle="Distinct barcode values"
        />
        <StatCard
          title="Unique Assets"
          value={totals?.uniqueAssetsViewed ?? 0}
          icon={Package}
          color="emerald"
          subtitle="Assets scanned at least once"
        />
        <StatCard
          title="Last Viewed"
          value={totals?.lastViewedAt ? formatDate(totals.lastViewedAt, "short") : "—"}
          icon={CalendarRange}
          color="amber"
          subtitle={
            totals?.lastViewedAt
              ? formatDate(totals.lastViewedAt, "longTime")
              : "No scans yet"
          }
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Narrow down the report by date, dealer, client, or brand
            </p>
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="mt-1 w-full form-input"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="mt-1 w-full form-input"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Dealer</label>
            <select
              value={filters.dealerId}
              onChange={(e) => handleFilterChange("dealerId", e.target.value)}
              className="mt-1 w-full form-select"
            >
              <option value="">All Dealers</option>
              {dealers.map((dealer) => (
                <option key={dealer._id} value={dealer._id}>
                  {dealer?.name || dealer?.shopName || "Unnamed Dealer"}
                </option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <div>
              <label className="text-xs font-semibold text-slate-600">Client</label>
              <select
                value={filters.clientId}
                onChange={(e) => handleFilterChange("clientId", e.target.value)}
                className="mt-1 w-full form-select"
              >
                <option value="">All Clients</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client?.name || client?.company || "Unnamed Client"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-600">Brand</label>
            <select
              value={filters.brandId}
              onChange={(e) => handleFilterChange("brandId", e.target.value)}
              className="mt-1 w-full form-select"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand?.name || "Unnamed Brand"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Sort</label>
            <div className="mt-1 flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => {
                  setPage(1);
                  setSortBy(e.target.value);
                }}
                className="w-full form-select"
              >
                <option value="totalViews">Total Views</option>
                <option value="lastViewedAt">Last Viewed</option>
                <option value="firstViewedAt">First Viewed</option>
                <option value="assetNo">Asset No</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setPage(1);
                  setSortOrder(e.target.value);
                }}
                className="w-28 form-select"
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Views by Day</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Daily barcode scans in the selected range
              </p>
            </div>
          </div>

          <div className="h-[320px] w-full px-4 pb-4">
            {summaryLoading ? (
              <div className="h-full flex items-center justify-center text-sm text-slate-500">
                Loading trend...
              </div>
            ) : viewsByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsByDay} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => formatDate(value, "short")}
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
                    formatter={(value) => [`${value} views`, "Views"]}
                    labelFormatter={(label) => formatDate(label, "long")}
                  />
                  <Bar dataKey="totalViews" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <NoDataFound
                title="No view data"
                description="No barcode scans were found for the selected filters."
              />
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Top Assets</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Highest viewed barcode assets
              </p>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {summaryLoading ? (
              <div className="h-40 flex items-center justify-center text-sm text-slate-500">
                Loading top assets...
              </div>
            ) : topAssets.length > 0 ? (
              topAssets.map((asset) => (
                <div
                  key={asset.assetId}
                  className="rounded-lg border border-slate-200 p-3 bg-slate-50/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {asset?.assetNo || "—"}
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {asset?.barcodeValue || "No barcode"}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                      {formatNumber(asset?.totalViews ?? 0)} views
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    {asset?.dealer?.name || "Unknown dealer"}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    Last viewed: {formatDate(asset?.lastViewedAt, "longTime")}
                  </div>
                </div>
              ))
            ) : (
              <NoDataFound
                title="No top assets"
                description="Scans will appear once barcodes are used."
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-slate-500" />
          <h2 className="text-base font-semibold text-slate-900">
            Asset-wise View Report
          </h2>
        </div>
        <div className="w-full max-w-sm">
          <SearchBar
            placeholder="Search barcode, asset no, fixture..."
            onSearch={(value) => {
              setPage(1);
              setSearch(value);
            }}
          />
        </div>
      </div>

      <SmartTable
        title="Barcode Views"
        totalcount={totalAssets}
        data={assetRows}
        columns={assetColumns}
        loading={assetsLoading}
        emptyMessage="No scans found"
        emptyDescription="No barcode scans match your selected filters."
        sortField={sortBy}
        sortDirection={sortOrder}
        onSortChange={handleSortChange}
        showSr
        currentPage={currentPage}
        pageSize={limit}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 border border-slate-200 rounded-lg">
          <div className="text-sm text-slate-700">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeViewsReportPage;
