import React, { useEffect } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import PageHeader from "../../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssetById } from "../../redux/slices/assetSlice";
import {
  Barcode,
  Calendar,
  Download,
  Edit,
  ExternalLink,
  MapPin,
  Package,
  Phone,
  Store,
} from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import AssetDetailsSkeleton from "./AssetDetailsSkeleton";
import AssetStatusBadge from "./AssetStatusBadge";
import NoDataFound from "../../components/NoDataFound";
import { useNavigate } from "react-router-dom";

const AssetDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assetId } = useQueryParams();

  const { assetDetails, isFetchingDetails } = useSelector(
    (state) => state.asset,
  );

  const { dealerId, creator } = assetDetails || {};

  useEffect(() => {
    if (assetId) {
      dispatch(fetchAssetById(assetId));
    }
  }, [assetId]);

  const actions = [
    {
      label: "Update Asset",
      type: "secondary",
      icon: Edit,
      onClick: () => navigate(`/assets/add?assetId=${assetId}`),
    },
  ];

  if (isFetchingDetails) {
    return <AssetDetailsSkeleton />;
  }

  if (!isFetchingDetails && !assetDetails) {
    return (
      <NoDataFound
        title="Asset Not Found"
        description="The asset you’re looking for doesn’t exist or may have been removed. Please check the link or return to the assets list."
        className="h-[80dvh]"
        icon={Package}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={"Asset Details"}
        description="View detailed information, current status, and related metadata for this asset."
        actions={actions}
        showBackButton
      />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-gray-900  flex items-center gap-2 ">
                <Package className="h-5 w-5 text-secondary-800" />
                Basic Information
              </h2>
              <AssetStatusBadge status={assetDetails?.status} />
            </div>

            <div className="p-5 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Fixture Number
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {assetDetails?.fixtureNo || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Asset Number
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {assetDetails?.assetNo || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Stand Type
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {assetDetails?.standType || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Brand
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {assetDetails?.brand || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900  flex items-center gap-2 border-b border-slate-200 p-5">
              <Package className="h-5 w-5 text-secondary-800" />
              Dimensions
            </h2>
            <div className="p-5 grid sm:grid-cols-3 gap-4 ">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                <p className="text-xs font-medium text-blue-700 uppercase tracking-wider mb-2">
                  Length
                </p>
                <p className="text-lg font-bold text-blue-900">
                  {assetDetails?.dimension?.length || "0"}{" "}
                  <span className="text-sm font-medium">
                    {assetDetails?.dimension?.unit || "cm"}
                  </span>
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
                <p className="text-xs font-medium text-purple-700 uppercase tracking-wider mb-2">
                  Height
                </p>
                <p className="text-lg font-bold text-purple-900">
                  {assetDetails?.dimension?.height || "0"}{" "}
                  <span className="text-sm font-medium">
                    {assetDetails?.dimension?.unit || "cm"}
                  </span>
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg">
                <p className="text-xs font-medium text-indigo-700 uppercase tracking-wider mb-2">
                  Depth
                </p>
                <p className="text-lg font-bold text-indigo-900">
                  {assetDetails?.dimension?.depth || "0"}{" "}
                  <span className="text-sm font-medium">
                    {assetDetails?.dimension?.unit || "cm"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Installation Details */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-slate-200 p-5">
              <Calendar className="h-5 w-5 text-secondary-800" />
              Installation & Tracking
            </h2>
            <div className="p-5 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Installation Date
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(assetDetails?.installationDate, "long") || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Created At
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(assetDetails?.createdAt, "long") || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Barcode Section */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-slate-200 p-5">
              <Barcode className="h-5 w-5 text-secondary-800" />
              Barcode Information
            </h2>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                  Barcode Value
                </p>
                <p className="text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-900 break-all">
                  {assetDetails?.barcodeValue || "N/A"}
                </p>
              </div>

              {/* Barcode Image */}
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                  Barcode Image
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-center min-h-40">
                  <img
                    src={assetDetails?.barcodeImageUrl}
                    alt="Asset Barcode"
                    className={`max-h-40 max-w-full`}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (assetDetails?.barcodeImageUrl) {
                    window.open(assetDetails.barcodeImageUrl, "_blank");
                  }
                }}
                disabled={!assetDetails?.barcodeImageUrl}
                className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200
             hover:bg-gray-100 transition-colors font-medium text-sm
             flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                Download Barcode
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Location & Dealer */}
        <div className="space-y-6">
          {/* Dealer Information */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-slate-200 p-5">
              <Store className="h-5 w-5 text-secondary-800" />
              Dealer Information
            </h2>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Shop Name
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {dealerId?.shopName || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Dealer Name
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {dealerId?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Dealer Code
                </p>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded border border-gray-200 text-gray-900">
                  {dealerId?.dealerCode || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${dealerId?.phone}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Phone className="h-4 w-4" />
                  {dealerId?.phone || "N/A"}
                </a>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${dealerId?.email}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {dealerId?.email || "N/A"}
                </a>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-xs text-gray-900">
                  {dealerId?.location?.address || "N/A"}
                </p>

                {dealerId?.location?.googleMapLink && (
                  <a
                    href={dealerId.location.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                  >
                    View on Map
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
