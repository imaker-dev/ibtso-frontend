import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, LayoutGrid, List, Plus, Trash2 } from "lucide-react";
import { deleteAsset, fetchAllAssets } from "../../redux/slices/assetSlice";
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

const AllAssetsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [view, setView] = useStoredViewMode("all-assets", "list");

  const { allAssetsData, loading, isDeletingAsset } = useSelector(
    (state) => state.asset,
  );
  const { data, total } = allAssetsData || {};
  const fetchAssets = () => {
    dispatch(fetchAllAssets());
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const clearAssetStates = () => {
    setShowDeleteOverlay(false);
    setSelectedAsset(null);
  };

  const assetColumns = [
    {
      label: "Asset",
      key: "asset",
      render: (asset) => (
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white">
            <Package className="h-5 w-5 text-slate-700" />
          </div>

          {/* Asset info */}
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {asset?.assetNo}
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-medium text-slate-500">
                Fixture · {asset?.fixtureNo}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-medium text-slate-500">
                {asset?.brand}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    {
      label: "Dealer",
      key: "dealer",
      render: (asset) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-900">
            {asset?.dealer?.name || "—"}
          </span>
          <span className="text-xs text-slate-500">
            {asset?.dealer?.shopName || "—"}
          </span>
        </div>
      ),
    },

    {
      label: "Stand / Type",
      key: "standType",
      render: (asset) => (
        <span className="text-sm font-medium text-slate-700">
          {asset?.standType}
        </span>
      ),
    },

    {
      label: "Location",
      key: "location",
      render: (asset) => (
        <div className="flex items-start gap-2 max-w-[220px]">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
          <span className="text-xs text-slate-600 line-clamp-2">
            {asset?.location?.address}
          </span>
        </div>
      ),
    },

    {
      label: "Installed On",
      key: "installationDate",
      render: (asset) => (
        <span className="text-sm font-medium text-slate-700">
          {formatDate(asset?.installationDate, "long")}
        </span>
      ),
    },

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

    {
      label: "Status",
      key: "status",
      render: (asset) => <AssetStatusBadge status={asset?.status} />,
    },
  ];

  const rowActions = [
    {
      label: "View Details",
      onClick: (asset) => navigate(`/assets/asset?assetId=${asset?._id}`),
      icon: Eye,
    },
    {
      label: "Update Details",
      onClick: (asset) => navigate(`/assets/add?assetId=${asset?._id}`),
      icon: Edit2,
    },
    {
      label: "Delete Asset",
      onClick: (asset) => {
        (setSelectedAsset(asset), setShowDeleteOverlay(true));
      },
      type: "danger",
      icon: Trash2,
    },
  ];

  const actions = [
    {
      label: "Add Asset",
      type: "secondary",
      icon: Plus,
      onClick: () => navigate(`/assets/add`),
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
          <SearchBar className="py-3"/>
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
                onView={() => navigate(`/assets/asset?assetId=${asset._id}`)}
                onEdit={() => navigate(`/assets/add?assetId=${asset._id}`)}
                onDelete={() => {
                  setSelectedAsset(asset);
                  setShowDeleteOverlay(true);
                }}
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
