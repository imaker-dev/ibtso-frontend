import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  LayoutGrid,
  List,
  Plus,
  Trash2,
} from "lucide-react";
import {
  deleteAsset,
  downloadAssetById,
  fetchAllAssets,
} from "../../redux/slices/assetSlice";
import SmartTable from "../../components/layout/SmartTable";
import { Package, MapPin, Barcode } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import AssetStatusBadge from "./AssetStatusBadge";
import AssetDeleteModal from "../../partial/asset/AssetDeleteModal";
import { handleResponse } from "../../utils/helpers/helpers";
import { useStoredViewMode } from "../../hooks/hooks";
import Tabs from "../../components/Tabs";
import SearchBar from "../../components/SearchBar";
import GridStateHandler from "../../components/layout/GridStateHandler";
import AssetCard from "./AssetCard";
import AssetCardSkeleton from "./AssetCardSkeleton";
import { downloadBlob } from "../../utils/blob";

const AllAssetsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [searhTerm, setSearchTerm] = useState("");
  const [view, setView] = useStoredViewMode("all-assets", "list");

  const { allAssetsData, loading, isDeletingAsset, assetToDownloadId } =
    useSelector((state) => state.asset);
  const isAnyActivityRuning = loading || isDeletingAsset || assetToDownloadId;

  const { data, total } = allAssetsData || {};

  const fetchAssets = () => {
    dispatch(fetchAllAssets({ search: searhTerm }));
  };

  useEffect(() => {
    fetchAssets();
  }, [searhTerm]);

  const clearAssetStates = () => {
    setShowDeleteOverlay(false);
    setSelectedAsset(null);
  };

  const handleDownloadAsset = async (asset) => {
    const fileName = `${asset?.assetNo || "file"}_${asset?.brand || "brand"}`;

    await handleResponse(dispatch(downloadAssetById(asset?._id)), (res) => {
      downloadBlob({ data: res.payload, fileName });
    });
  };

  const assetColumns = [
    /* ---------------- ASSET ---------------- */
    {
      label: "Asset",
      key: "asset",
      render: (asset) => (
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon */}
          <div className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white">
            <Package className="h-5 w-5 text-slate-700" />
          </div>

          {/* Text */}
          <div className="min-w-0">
            {/* Asset No */}
            <div className="text-sm font-semibold text-slate-900 truncate">
              {asset?.assetNo || "—"}
            </div>

            {/* Fixture */}
            <div className="text-xs text-slate-500 truncate">
              Fixture · {asset?.fixtureNo || "—"} ·{" "}
              <span className="inline-flex text-[11px] font-medium text-slate-600">
                {asset?.images?.length || 0} file
                {(asset?.images?.length || 0) === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    /* ---------------- BRAND ---------------- */
    {
      label: "Brand",
      key: "brand",
      render: (asset) => (
        <span className="inline-flex rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
          {asset?.brandId?.name || "—"}
        </span>
      ),
    },

    /* ---------------- STAND ---------------- */
    {
      label: "Stand",
      key: "standType",
      render: (asset) => (
        <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
          {asset?.standType || "—"}
        </span>
      ),
    },

    /* ---------------- DEALER ---------------- */
    {
      label: "Dealer",
      key: "dealer",
      render: (asset) => (
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900 truncate">
            {asset?.dealerId?.name || "—"}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {asset?.dealerId?.shopName || "—"}
          </div>
        </div>
      ),
    },

    /* ---------------- CLIENT ---------------- */
    {
      label: "Client",
      key: "client",
      render: (asset) => {
        const client = asset?.clientId;

        if (!client) {
          return (
            <span className="text-xs font-medium text-slate-400">
              Not Assigned
            </span>
          );
        }

        return (
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900 truncate">
              {client.name || "Unnamed Client"}
            </div>

            <div className="text-xs text-slate-500 truncate">
              {client?.company || "No company"}
            </div>
          </div>
        );
      },
    },

    /* ---------------- INSTALLED ---------------- */
    {
      label: "Installed On",
      key: "installationDate",
      render: (asset) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-700">
            {formatDate(asset?.installationDate, "long")}
          </span>
        </div>
      ),
    },

    /* ---------------- BARCODE ---------------- */
    {
      label: "Barcode",
      key: "barcode",
      render: (asset) => (
        <div className="flex items-center gap-2">
          <Barcode className="h-4 w-4 text-slate-500" />

          {asset?.barcodeImageUrl ? (
            <a
              href={asset.barcodeImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              View
            </a>
          ) : (
            <span className="text-xs text-slate-400">N/A</span>
          )}
        </div>
      ),
    },

    /* ---------------- STATUS ---------------- */
    {
      label: "Status",
      key: "status",
      render: (asset) => <AssetStatusBadge status={asset?.status} />,
    },
  ];

  const rowActions = [
    {
      label: "View Asset",
      onClick: (asset) => navigate(`/asset-management/asset?assetId=${asset?._id}`),
      icon: Eye,
      disabled: isAnyActivityRuning,
    },
    {
      label: "Update Asset",
      onClick: (asset) => navigate(`/asset-management/add?assetId=${asset?._id}`),
      icon: Edit2,
      disabled: isAnyActivityRuning,
      color: "blue",
    },
    {
      label: "Download Asset",
      onClick: (asset) => handleDownloadAsset(asset),
      icon: Download,
      color: "emerald",
      disabled: isAnyActivityRuning,
      loading: (asset) => assetToDownloadId === asset?._id,
    },
    {
      label: "Delete Asset",
      onClick: (asset) => {
        (setSelectedAsset(asset), setShowDeleteOverlay(true));
      },
      color: "red",
      icon: Trash2,
      disabled: isAnyActivityRuning,
    },
  ];

  const actions = [
    {
      label: "Add Asset",
      type: "secondary",
      icon: Plus,
      onClick: () => navigate(`/asset-management/add`),
    },
  ];

  const handleDeleteAsset = async (id) => {
    await handleResponse(dispatch(deleteAsset(id)), () => {
      fetchAssets();
      clearAssetStates();
    });
  };

  const tabs = [
    { id: "list", label: "List", icon: List },
    { id: "grid", label: "Grid", icon: LayoutGrid },
  ];

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="All Assets"
          description="Manage, track, and organize all registered assets from a single place."
          actions={actions}
        />

        <div className="flex items-center gap-2">
          <SearchBar
            className="py-3"
            onSearch={(value) => setSearchTerm(value)}
            placeholder="Search assets..."
          />
          <Tabs tabs={tabs} value={view} onChange={setView} />
        </div>

        {view === "grid" ? (
          <GridStateHandler
            loading={loading}
            data={data}
            columns={3}
            emptyMessage="No Assets Found"
            emptyDescription="There are no assets available yet."
            emptyIcon={Package}
            renderSkeleton={(i) => <AssetCardSkeleton key={i} />}
          >
            {(data || []).map((asset) => (
              <AssetCard
                key={asset._id}
                asset={asset}
                onView={() => navigate(`/asset-management/asset?assetId=${asset._id}`)}
                onEdit={() => navigate(`/asset-management/add?assetId=${asset._id}`)}
                onDelete={() => {
                  setSelectedAsset(asset);
                  setShowDeleteOverlay(true);
                }}
                onDownload={(asset) => handleDownloadAsset(asset)}
                downloading={assetToDownloadId === asset._id}
              />
            ))}
          </GridStateHandler>
        ) : (
          <SmartTable
            title="All Assets"
            totalcount={total ?? 0}
            data={data || []}
            columns={assetColumns}
            actions={rowActions}
            emptyMessage="No assets found"
            emptyDescription="There are no assets registered yet."
            loading={loading}
          />
        )}
      </div>
      <AssetDeleteModal
        isOpen={showDeleteOverlay}
        onClose={clearAssetStates}
        asset={selectedAsset}
        onSubmit={handleDeleteAsset}
        loading={isDeletingAsset}
      />
    </>
  );
};

export default AllAssetsPage;
