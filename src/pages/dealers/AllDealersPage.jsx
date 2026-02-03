import React, { useEffect, useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  User,
  Eye,
  Plus,
  Calendar,
  List,
  LayoutGrid,
  Download,
  Edit2,
  ExternalLink,
  Tag,
} from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadDealerBarcodeById,
  fetchAllDealers,
} from "../../redux/slices/dealerSlice";
import SmartTable from "../../components/layout/SmartTable";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Tabs from "../../components/Tabs";
import { useStoredViewMode } from "../../hooks/hooks";
import { handleResponse } from "../../utils/helpers/helpers";
import { downloadBlob } from "../../utils/blob";
import DealerStatusBadge from "./DealerStatusBadge";
import GridStateHandler from "../../components/layout/GridStateHandler";
import DealerCardSkeleton from "./DealerCardSkeleton";
import DealerCard from "./DealerCard";
import DealerAssetDownloadModal from "./DealerAssetDownloadModal";

const AllDealersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allDealersData, loading, dealerBarcodeToDownloadId } = useSelector(
    (state) => state.dealer,
  );

  const { data, total, totalPages } = allDealersData || {};

  const [view, setView] = useStoredViewMode("all-dealers", "list");
  const [showDownloadOverlay, setShowDownloadOverlay] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDealers = () => {
    dispatch(fetchAllDealers({search:searchTerm}));
  };
  useEffect(() => {
    fetchDealers();
  }, [searchTerm]);

  const resetDealerStates = () => {
    setShowDownloadOverlay(false);
    setSelectedDealer(null);
  };

  const handleDownloadBarcode = async ({
    fileName,
    dealerId,
    startDate,
    endDate,
  }) => {
    await handleResponse(
      dispatch(downloadDealerBarcodeById({ dealerId, startDate, endDate })),
      (res) => {
        downloadBlob({ data: res.payload, fileName });
        resetDealerStates();
      },
    );
  };

  const dealerColumns = [
    {
      label: "Dealer",
      key: "dealer",
      render: (dealer) => (
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white">
            <Store className="h-5 w-5 text-slate-700" />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {dealer?.name || "—"}
            </div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">
              {dealer?.shopName || "—"}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Brands",
      key: "brands",
      render: (dealer) => {
        const count = dealer?.totalAssignedBrands ?? 0;

        return count > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 border border-purple-100">
            <Tag className="h-3.5 w-3.5" />
            {count} Brand{count > 1 ? "s" : ""}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            <Tag className="h-3.5 w-3.5" />
            None
          </span>
        );
      },
    },

    {
      label: "Contact",
      key: "contact",
      render: (dealer) => (
        <div className="flex flex-col gap-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[180px]">
              {dealer?.email || "—"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{dealer?.phone || "—"}</span>
          </div>
        </div>
      ),
    },

    {
      label: "Location",
      key: "location",
      render: (dealer) => (
        <div className="flex items-start gap-2 max-w-[240px]">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-600 line-clamp-2">
              {dealer?.location?.address || "—"}
            </span>
          </div>
        </div>
      ),
    },

    {
      label: "Created On",
      key: "createdAt",
      render: (dealer) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-700">
            {formatDate(dealer?.createdAt, "long")}
          </span>
        </div>
      ),
    },

    {
      label: "Status",
      key: "status",
      render: (dealer) => <DealerStatusBadge status={dealer?.isActive} />,
    },
  ];

  const rowActions = [
    {
      label: "View Details",
      onClick: (dealer) => navigate(`/dealers/dealer?dealerId=${dealer._id}`),
      icon: Eye,
      disabled: dealerBarcodeToDownloadId,
    },
    {
      label: "Update Dealer",
      onClick: (dealer) => navigate(`/dealers/add?dealerId=${dealer._id}`),
      icon: Edit2,
      disabled: dealerBarcodeToDownloadId,
      color: "blue",
    },
    {
      label: "Download",
      type: "success",
      onClick: (dealer) => {
        (setSelectedDealer(dealer), setShowDownloadOverlay(true));
      },
      icon: Download,
      loading: (dealer) => dealerBarcodeToDownloadId === dealer._id,
      color: "emerald",
    },
  ];

  const actions = [
    {
      label: "Add Dealer",
      type: "secondary",
      icon: Plus,
      onClick: () => navigate(`/dealers/add`),
    },
  ];

  const tabs = [
    {
      id: "list",
      label: "List",
      icon: List,
    },
    {
      id: "grid",
      label: "Grid",
      icon: LayoutGrid,
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="All Dealers"
          description="Browse the list of dealers, view details, and manage their information."
          actions={actions}
        />

        <div className="flex items-center gap-2">
          <SearchBar
            className="py-3"
            placeholder="Search dealers"
            onSearch={(value) => setSearchTerm(value)}
          />

          <Tabs tabs={tabs} value={view} onChange={(value) => setView(value)} />
        </div>

        {view === "grid" ? (
          <GridStateHandler
            loading={loading}
            data={data}
            columns={3}
            emptyMessage="No dealers found"
            emptyDescription="There are no dealers added yet. Once dealers are created, they will appear here with their contact details, location, and status."
            emptyIcon={Store}
            renderSkeleton={(i) => <DealerCardSkeleton key={i} />}
          >
            {(data || []).map((dealer) => (
              <DealerCard
                key={dealer._id}
                dealer={dealer}
                onView={() =>
                  navigate(`/dealers/dealer?dealerId=${dealer._id}`)
                }
                onDownload={() => (
                  setSelectedDealer(dealer),
                  setShowDownloadOverlay(true)
                )}
                onUpdate={() => navigate(`/dealers/add?dealerId=${dealer._id}`)}
                downloading={dealerBarcodeToDownloadId === dealer._id}
                disableActions={dealerBarcodeToDownloadId}
              />
            ))}
          </GridStateHandler>
        ) : (
          <SmartTable
            title="All Dealers"
            totalcount={total ?? 0}
            data={data || []}
            columns={dealerColumns}
            actions={rowActions}
            emptyMessage="No dealers found"
            emptyDescription="There are no dealers added yet. Once dealers are created, they will appear here with their contact details, location, and status."
            loading={loading}
          />
        )}
      </div>

      <DealerAssetDownloadModal
        isOpen={showDownloadOverlay}
        onClose={resetDealerStates}
        onSubmit={handleDownloadBarcode}
        dealer={selectedDealer}
        loading={dealerBarcodeToDownloadId}
      />
    </>
  );
};

export default AllDealersPage;
