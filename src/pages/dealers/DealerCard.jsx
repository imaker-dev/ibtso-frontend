import React from "react";
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Eye,
  Download,
  ExternalLink,
  Loader2,
  Edit2,
} from "lucide-react";
import DealerStatusBadge from "./DealerStatusBadge";
import { formatDate } from "../../utils/dateFormatter";

// Info Item Component
const InfoItem = ({
  icon: Icon,
  label,
  value,
  clickable = false,
  onClick = () => {},
}) => {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
      <div className="flex-1 min-w-0">
        {/* <p className="text-xs font-medium text-gray-500">{label}</p> */}
        {clickable ? (
          <button
            onClick={onClick}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 truncate hover:underline text-left"
          >
            {value}
          </button>
        ) : (
          <p className="text-sm font-semibold text-gray-900 truncate">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

const DealerCard = ({
  dealer,
  onView = () => {},
  onDownload = () => {},
  onUpdate = () => {}, //
  downloading = false,
  disableActions = false,
}) => {
  const { location } = dealer;

  return (
    <div className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-secondary-300 hover:shadow">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-secondary-50/50 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-secondary-100 border border-secondary-200 flex items-center justify-center flex-shrink-0">
              <Store className="w-6 h-6 text-secondary-600" />
            </div>

            {/* Dealer Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 truncate">
                {dealer.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-gray-700">
                  {dealer.shopName}
                </span>
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <DealerStatusBadge status={dealer.isActive} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Contact Information */}
        <div className="space-y-3">
          <InfoItem
            icon={Mail}
            label="Email"
            value={dealer.email}
            clickable
            onClick={() => (window.location.href = `mailto:${dealer.email}`)}
          />

          <InfoItem
            icon={Phone}
            label="Phone"
            value={dealer.phone}
            clickable
            onClick={() => (window.location.href = `tel:${dealer.phone}`)}
          />
        </div>

        {/* Location */}
        {location && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Location
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {location.address}
                </p>
                {location.googleMapLink && (
                  <button
                    onClick={() =>
                      window.open(location.googleMapLink, "_blank")
                    }
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-1.5 inline-flex items-center gap-1"
                  >
                    View Map
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VAT Registration & Other Info */}
        <div className="grid grid-cols-2 gap-2">
          {dealer.vatRegistration && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-xs font-medium text-gray-500">
                VAT Registration
              </p>
              <p className="text-sm font-bold text-gray-900 mt-1 truncate">
                {dealer.vatRegistration}
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-xs font-medium text-gray-500">Registered</p>
            <p className="text-sm font-bold text-gray-900 mt-1">
              {formatDate(dealer.createdAt, "long")}
            </p>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-3">
        <div className="grid grid-cols-3 gap-3">
          {/* View */}
          <button
            onClick={onView}
            disabled={disableActions}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye className="h-4 w-4" />
            View
          </button>

          {/* Update */}
          <button
            onClick={onUpdate}
            disabled={disableActions}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Edit2 className="h-4 w-4" />
            Update
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            disabled={downloading || disableActions}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {downloading ? "Downloading…" : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealerCard;
