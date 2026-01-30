import React from "react";
import { Package, MapPin, Eye, Edit2, Trash2 } from "lucide-react";
import AssetStatusBadge from "./AssetStatusBadge";

const AssetCard = ({ asset, onView, onEdit, onDelete }) => {
  const dealer = asset?.dealer;

  return (
    <div
      className="group rounded-2xl border border-slate-200 bg-white
                    transition-all duration-300 hover:-translate-y-1 hover:shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50">
            <Package className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {asset.assetNo}
            </h3>
            <p className="text-xs text-slate-500">
              Fixture · {asset.fixtureNo}
            </p>
          </div>
        </div>

        <AssetStatusBadge status={asset.status} />
      </div>

      {/* Details */}
      <div className="p-5 space-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-800">
            {dealer?.name || "—"}
          </span>
          <span className="text-slate-400">•</span>
          <span>{dealer?.shopName || "—"}</span>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
          <span className="line-clamp-2">
            {asset.location?.address || "N/A"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-slate-100 grid grid-cols-3 gap-2">
        <button
          onClick={onView}
          className="btn bg-secondary-500 hover:bg-secondary-600 text-white"
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </button>

        <button
          onClick={onEdit}
          className="btn bg-primary-500 hover:bg-primary-600 text-white"
        >
          <Edit2 className="h-4 w-4 mr-1" />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="btn bg-red-500 hover:bg-red-600 text-white"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
