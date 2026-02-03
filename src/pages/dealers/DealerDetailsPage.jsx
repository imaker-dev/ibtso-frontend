import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealerById } from "../../redux/slices/dealerSlice";
import {
  Barcode,
  Edit,
  Edit2,
  ExternalLink,
  Eye,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Store,
  Trash2,
  User,
} from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import SmartTable from "../../components/layout/SmartTable";
import { useNavigate } from "react-router-dom";
import AssetStatusBadge from "../assets/AssetStatusBadge";
import AssetDeleteModal from "../../partial/asset/AssetDeleteModal";
import {
  deleteAsset,
  downloadMultipleAssetById,
} from "../../redux/slices/assetSlice";
import { handleResponse } from "../../utils/helpers/helpers";
import NoDataFound from "../../components/NoDataFound";
import DealerDetailsSkeleton from "./DealerDetailsSkeleton";
import DealerStatusBadge from "./DealerStatusBadge";
import SearchBar from "../../components/SearchBar";
import { downloadBlob } from "../../utils/blob";

const DealerDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dealerId } = useQueryParams();

  const { isDeletingAsset, isDownloadingMultipleAssets } = useSelector(
    (state) => state.asset,
  );
  const { delearDetails, isFetchingDealerDetails } = useSelector(
    (state) => state.dealer,
  );
  const { dealer, assets, assetCount, assignedBrands } = delearDetails || {};

  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedAssetId, setSelectedAssetId] = useState([]);

  const downloadSelectedAssets = async () => {
    const fileName = `dealer-assets-${dealerId}`;
    await handleResponse(
      dispatch(downloadMultipleAssetById(selectedAssetId)),
      (res) => {
        downloadBlob({ data: res.payload, fileName });
        setSelectedAssetId([]);
      },
    );
  };

  const fetchDealerDetails = () => {
    dispatch(fetchDealerById(dealerId));
  };

  useEffect(() => {
    if (dealerId) {
      fetchDealerDetails();
    }
  }, [dealerId]);

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
              {/* <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-medium text-slate-500">
                {asset?.brand}
              </span> */}
            </div>
          </div>
        </div>
      ),
    },

    {
      label: "Stand / Type",
      key: "standType",
      render: (asset) => (
        <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {asset?.standType || "—"}
        </span>
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
      label: "View",
      onClick: (asset) => navigate(`/assets/asset?assetId=${asset?._id}`),
      icon: Eye,
    },
    {
      label: "Update Details",
      onClick: (asset) => navigate(`/assets/add?assetId=${asset?._id}`),
      icon: Edit2,
      color: "blue",
    },
    {
      label: "Delete Asset",
      onClick: (asset) => {
        (setSelectedAsset(asset), setShowDeleteOverlay(true));
      },
      icon: Trash2,
      color: "red",
    },
  ];

  const clearStates = () => {
    setShowDeleteOverlay(false);
    setSelectedAsset(null);
  };

  const handleDeleteAsset = async (id) => {
    await handleResponse(dispatch(deleteAsset(id)), () => {
      fetchDealerDetails();
      clearStates();
    });
  };

  if (isFetchingDealerDetails) {
    return <DealerDetailsSkeleton />;
  }
  
  if (!isFetchingDealerDetails && !delearDetails) {
    return (
      <NoDataFound
        title="Dealer Not Found"
        description="The dealer you’re looking for doesn’t exist or may have been removed. Please check the link or return to the dealers list."
        className="h-[80dvh]"
        icon={Store}
      />
    );
  }

  const actions = [
    {
      label: "Update Dealer",
      type: "secondary",
      icon: Edit,
      onClick: () => navigate(`/dealers/add?dealerId=${dealerId}`),
    },
  ];
  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Dealer Details"
          description="View and manage dealer information, contact details, and associated assets."
          actions={actions}
          showBackButton
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm  hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900  flex items-center gap-2 border-b border-slate-200 p-5">
              <User className="h-5 w-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Full Name
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {dealer?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Shop Name
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {dealer?.shopName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Dealer Code
                </p>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded border border-gray-200 text-gray-900 break-all">
                  {dealer?.dealerCode || "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Contact & Location */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900  flex items-center gap-2 border-b border-slate-200 p-5">
              <Phone className="h-5 w-5 text-blue-600" />
              Contact & Location
            </h3>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${dealer?.phone}`}
                  className="text-base font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {dealer?.phone || "N/A"}
                </a>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${dealer?.email}`}
                  className="text-base font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {dealer?.email || "N/A"}
                </a>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Address
                </p>
                <p className="text-xs text-gray-900 leading-relaxed">
                  {dealer?.location?.address || "N/A"}
                </p>
                {dealer?.location?.googleMapLink && (
                  <a
                    href={dealer?.location.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 mt-2"
                  >
                    View on Map
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Business Information */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900  flex items-center gap-2 border-b border-slate-200 p-5">
              <Store className="h-5 w-5 text-blue-600" />
              Business Information
            </h3>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                  Assigned Brands
                </p>

                {assignedBrands && assignedBrands.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {assignedBrands.map((item) => (
                      <span
                        key={item?.brand?._id}
                        className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100"
                      >
                        {item?.brand?.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">
                    No brands assigned
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  VAT Registration
                </p>
                <p className="text-base font-mono bg-gray-50 p-2 rounded border border-gray-200 text-gray-900">
                  {dealer?.vatRegistration || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Status
                </p>
                <DealerStatusBadge status={dealer.isActive} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar className="py-2.5" />

          {selectedAssetId?.length > 0 && (
            <button
              onClick={downloadSelectedAssets}
              disabled={isDownloadingMultipleAssets}
              className={`btn inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700`}
            >
              {isDownloadingMultipleAssets ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Downloading
                </>
              ) : (
                <>
                  Download
                  <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                    {selectedAssetId.length}
                  </span>
                </>
              )}
            </button>
          )}
        </div>

        <SmartTable
          title="Dealer Assets"
          totalcount={assetCount ?? 0}
          data={assets || []}
          columns={assetColumns}
          actions={rowActions}
          emptyMessage="No assets found"
          emptyDescription="This dealer does not have any assets assigned yet. Once assets are allocated, they will appear here with their details and status."
          loading={isFetchingDealerDetails}
          selectable
          rowKey="id"
          selectedRows={selectedAssetId}
          onSelectionChange={setSelectedAssetId}
        />
      </div>

      <AssetDeleteModal
        isOpen={showDeleteOverlay}
        onClose={clearStates}
        asset={selectedAsset}
        onSubmit={handleDeleteAsset}
        loading={isDeletingAsset}
      />
    </>
  );
};

export default DealerDetailsPage;
