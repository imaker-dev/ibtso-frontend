import React from "react";
import {
  Package,
  MapPin,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  Barcode,
} from "lucide-react";
import AssetStatusBadge from "./AssetStatusBadge";

const AssetCard = ({ asset, onView, onEdit, onDelete }) => {
  const { dealerId, location } = asset || {};

  return (
    <div className="group rounded-2xl bg-white border border-slate-200
                    transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl
                          bg-slate-100 text-slate-700">
            <Package className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {asset?.assetNo}
            </h3>
            <p className="text-xs text-slate-500">
              Fixture · {asset?.fixtureNo}
            </p>
          </div>
        </div>

        <AssetStatusBadge status={asset?.status} />
      </div>

      {/* ================= Body ================= */}
      <div className="px-5 pb-5 space-y-3 text-xs text-slate-600">
        
        {/* Dealer */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-900">
            {dealerId?.name || "—"}
          </span>
          <span className="text-slate-300">•</span>
          <span className="truncate">
            {dealerId?.shopName || "—"}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />

          <div className="flex flex-col gap-1">
            <span className="line-clamp-2">
              {location?.address || "N/A"}
            </span>

            {location?.googleMapLink && (
              <button
                onClick={() =>
                  window.open(location.googleMapLink, "_blank")
                }
                className="inline-flex items-center gap-1 text-xs font-medium
                           text-blue-600 hover:underline w-fit"
              >
                View Map
                <ExternalLink className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5">
            <Barcode className="h-4 w-4 text-slate-400" />
            {asset?.barcodeImageUrl ? (
              <a
                href={asset.barcodeImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                View Barcode
              </a>
            ) : (
              <span className="text-xs text-slate-400">No barcode</span>
            )}
          </div>
        </div>
      </div>

      {/* ================= Actions ================= */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onView}
            className="inline-flex items-center justify-center gap-1.5
                       rounded-lg bg-white border border-slate-200
                       px-3 py-2 text-xs font-medium text-slate-700
                       hover:bg-slate-100 transition"
          >
            <Eye className="h-4 w-4" />
            View
          </button>

          <button
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-1.5
                       rounded-lg bg-white border border-slate-200
                       px-3 py-2 text-xs font-medium text-slate-700
                       hover:bg-slate-100 transition"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center gap-1.5
                       rounded-lg bg-red-50 border border-red-200
                       px-3 py-2 text-xs font-medium text-red-600
                       hover:bg-red-100 transition"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
