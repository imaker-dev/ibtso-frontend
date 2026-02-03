import React from "react";
import {
  Store,
  MapPin,
  Eye,
  Download,
  Edit2,
  Tag,
} from "lucide-react";
import DealerStatusBadge from "./DealerStatusBadge";
import { formatDate } from "../../utils/dateFormatter";
import ActionButton from "../../components/ActionButton";

const DealerCard = ({
  dealer,
  onView = () => {},
  onDownload = () => {},
  onUpdate = () => {},
  downloading = false,
  disableActions = false,
}) => {
  const { location } = dealer || {};
  const brandCount = dealer?.totalAssignedBrands ?? 0;

  return (
    <div className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-secondary-300 hover:shadow">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-secondary-50/50 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-secondary-100 border border-secondary-200 flex items-center justify-center flex-shrink-0">
              <Store className="w-6 h-6 text-secondary-600" />
            </div>

            {/* Dealer Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 truncate">
                {dealer?.name || "—"}
              </h3>

              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
                <span className="text-gray-700">{dealer?.shopName || "—"}</span>

                {/* Brand Count Badge */}
                {brandCount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-700 border border-purple-100">
                    <Tag className="w-3 h-3" />
                    {brandCount} Brand{brandCount > 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <DealerStatusBadge status={dealer?.isActive} />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-4 space-y-4">
        {/* Contact Information */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Email</span>
          <a
            href={`mailto:${dealer?.email}`}
            className="text-sm font-semibold text-gray-900 hover:underline truncate max-w-[180px]"
          >
            {dealer?.email || "—"}
          </a>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Phone</span>
          <a
            href={`tel:${dealer?.phone}`}
            className="text-sm font-semibold text-gray-900 hover:underline"
          >
            {dealer?.phone || "—"}
          </a>
        </div>

        {/* Location */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 mb-1">Location</p>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 min-h-[32px]">
                {location?.address || "No location available"}
              </p>
            </div>
          </div>
        </div>

        {/* VAT + Registration */}
        <div className="grid grid-cols-2 gap-2">
          {dealer?.vatRegistration && (
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
              {formatDate(dealer?.createdAt, "long")}
            </p>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          <ActionButton icon={Eye} onClick={onView} disabled={disableActions} />

          <ActionButton
            icon={Edit2}
            onClick={onUpdate}
            disabled={disableActions}
            color="blue"
          />

          <ActionButton
            icon={Download}
            onClick={onDownload}
            disabled={downloading || disableActions}
            color="emerald"
            loading={downloading}
          />
        </div>
      </div>
    </div>
  );
};

export default DealerCard;
