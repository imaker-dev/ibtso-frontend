import React from "react";
import {
  Package,
  MapPin,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  Barcode,
  Download,
  Zap,
  Calendar,
  Loader2,
} from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import AssetStatusBadge from "./AssetStatusBadge";

// Action Button Component
const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  disabled = false,
  loading = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200";
  const variants = {
    default:
      "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
    danger:
      "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300",
    primary:
      "bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}

      {label && <span>{label}</span>}
    </button>
  );
};

const AssetCard = ({
  asset,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onDownload = () => {},
  downloading = false,
}) => {
  const { dealerId, location, dimension } = asset;

  return (
    <div className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-secondary-300 hover:shadow">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-secondary-50/50 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-secondary-100 border border-secondary-200 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-secondary-600" />
            </div>

            {/* Asset Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 truncate">
                {asset.assetNo}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Fixture:{" "}
                <span className="font-semibold text-gray-700">
                  {asset.fixtureNo}
                </span>
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <AssetStatusBadge status={asset.status} />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-4 space-y-4">
        {/* Brand / Dealer / Client */}
        <div className="space-y-3">
          {/* Brand */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Brand</span>
            <span className="text-sm font-semibold text-gray-900">
              {asset.brandId?.name || "—"}
            </span>
          </div>

          {/* Dealer */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Dealer</span>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {dealerId?.name || "—"}
              </p>
            </div>
          </div>

          {/* Client */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Client</span>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {asset.clientId?.name || "Not Assigned"}
              </p>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        {dimension && (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 text-center">
              <p className="text-xs text-gray-500">Length</p>
              <p className="text-sm font-bold text-gray-900">
                {dimension.length}
                <span className="text-xs text-gray-500 ml-1">
                  {dimension.unit}
                </span>
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 text-center">
              <p className="text-xs text-gray-500">Height</p>
              <p className="text-sm font-bold text-gray-900">
                {dimension.height}
                <span className="text-xs text-gray-500 ml-1">
                  {dimension.unit}
                </span>
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 text-center">
              <p className="text-xs text-gray-500">Depth</p>
              <p className="text-sm font-bold text-gray-900">
                {dimension.depth}
                <span className="text-xs text-gray-500 ml-1">
                  {dimension.unit}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Barcode Section */}
        {asset.barcodeImageUrl && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Barcode className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-600">
                  Barcode Available
                </span>
              </div>
              <button
                onClick={() => window.open(asset.barcodeImageUrl, "_blank")}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                View
              </button>
            </div>
          </div>
        )}

        {/* Date Info */}
        {asset.installationDate && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              Installed:{" "}
              <span className="font-semibold text-gray-700">
                {formatDate(asset.installationDate, "long")}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
        <div className="grid grid-cols-4 gap-2">
          <ActionButton icon={Eye} onClick={onView} />
          <ActionButton icon={Edit2} onClick={onEdit} />
          <ActionButton
            icon={Download}
            onClick={() => onDownload(asset)}
            disabled={!asset.barcodeImageUrl}
            loading={downloading}
          />
          <ActionButton icon={Trash2} onClick={onDelete} variant="danger" />
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
