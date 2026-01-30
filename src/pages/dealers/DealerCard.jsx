import React from "react";
import { Store, Mail, Phone, MapPin, Eye, Download } from "lucide-react";
import DealerStatusBadge from "./DealerStatusBadge";

const DealerCard = ({
  dealer,
  onView,
  onDownload,
  downloading,
  disableActions,
}) => {
  return (
    <div
      className="group relative rounded-2xl border border-slate-200 bg-white
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50">
            <Store className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {dealer.name}
            </h3>
            <p className="text-xs text-slate-500">{dealer.shopName}</p>
          </div>
        </div>

        <DealerStatusBadge status={dealer.isActive} />
      </div>

      {/* Details */}
      <div className="p-5 space-y-2.5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-400" />
          <span className="truncate">{dealer.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-slate-400" />
          <span>{dealer.phone}</span>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
          <span className="line-clamp-2">{dealer?.location?.address}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-slate-100 grid grid-cols-2 gap-3">
        <button
          onClick={onView}
          disabled={disableActions}
          className="btn bg-secondary-500 text-white disabled:opacity-60"
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </button>

        <button
          onClick={onDownload}
          disabled={downloading}
          className="btn bg-emerald-500 text-white disabled:opacity-60"
        >
          {downloading ? (
            "Downloading…"
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DealerCard;
