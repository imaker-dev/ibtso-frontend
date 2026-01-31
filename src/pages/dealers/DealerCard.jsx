import React from "react";
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Eye,
  Download,
  ExternalLink,
} from "lucide-react";
import DealerStatusBadge from "./DealerStatusBadge";

const DealerCard = ({
  dealer,
  onView,
  onDownload,
  downloading,
  disableActions,
}) => {
  const { location } = dealer || {};

  return (
    <div
      className="group rounded-2xl bg-white border border-slate-200
                 transition-all duration-300 hover:shadow-lg hover:border-slate-300"
    >
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100">
            <Store className="h-5 w-5 text-slate-700" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {dealer?.name}
            </h3>
            <p className="text-xs text-slate-500 truncate">
              {dealer?.shopName}
            </p>
          </div>
        </div>

        <DealerStatusBadge status={dealer?.isActive} />
      </div>

      {/* ================= Body ================= */}
      <div className="px-5 pb-5 space-y-3 text-xs text-slate-600">
        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="truncate">{dealer?.email || "—"}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-slate-400 shrink-0" />
          <span>{dealer?.phone || "—"}</span>
        </div>

        {/* Location + Map */}
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
      </div>

      {/* ================= Actions ================= */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onView}
            disabled={disableActions}
            className="inline-flex items-center justify-center gap-2
                       rounded-lg bg-white border border-slate-200
                       px-4 py-2 text-xs font-medium text-slate-700
                       hover:bg-slate-100 transition
                       disabled:opacity-60"
          >
            <Eye className="h-4 w-4" />
            View
          </button>

          <button
            onClick={onDownload}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2
                       rounded-lg bg-emerald-500 px-4 py-2
                       text-xs font-medium text-white
                       hover:bg-emerald-600 transition
                       disabled:opacity-60"
          >
            {downloading ? (
              "Downloading…"
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealerCard;
