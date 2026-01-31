import React, { useEffect, useMemo, useState } from "react";
import { Download, Calendar, Layers, Info, Loader2 } from "lucide-react";
import ModalBasic from "../../components/ModalBasic";

const DOWNLOAD_MODES = [
  {
    value: "all",
    label: "All Assets",
    description: "Download all QR codes",
    icon: Layers,
  },
  {
    value: "range",
    label: "Date Range",
    description: "Filter by created date",
    icon: Calendar,
  },
];

const getSafeDealerName = (dealer) => {
  const raw = dealer?.shopName || dealer?.name || "dealer";
  return raw
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const DealerAssetDownloadModal = ({
  isOpen,
  onClose,
  onSubmit,
  dealer,
  loading = false,
}) => {
  const [mode, setMode] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMode("all");
      setStartDate("");
      setEndDate("");
    }
  }, [isOpen]);

  // Auto-switch to range when dates are picked
  useEffect(() => {
    if ((startDate || endDate) && mode !== "range") {
      setMode("range");
    }
  }, [startDate, endDate, mode]);

  const isInvalidRange =
    startDate && endDate && new Date(startDate) > new Date(endDate);

  const createFileName = () => {
    const safeName = getSafeDealerName(dealer);

    if (mode !== "range") {
      return `dealer-${safeName}-all-assets`;
    }

    if (startDate && endDate) {
      return `dealer-${safeName}-${startDate}_to_${endDate}`;
    }

    if (startDate) {
      return `dealer-${safeName}-from-${startDate}`;
    }

    if (endDate) {
      return `dealer-${safeName}-until-${endDate}`;
    }

    return `dealer-${safeName}-all-assets`;
  };

  const isDownloadDisabled =
    loading || (mode === "range" && !startDate && !endDate) || isInvalidRange;

  const handleSubmit = () => {
    if (isDownloadDisabled) return;

    onSubmit({
      dealerId: dealer?._id,
      startDate: mode === "range" ? startDate || null : null,
      endDate: mode === "range" ? endDate || null : null,
      fileName: createFileName(),
    });
  };

  return (
    <ModalBasic
      id="download-dealer-assets"
      title="Download QR Assets"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-6">
        {/* Dealer Info */}
        <div className="px-6 pt-5">
          <div className="rounded-xl text-sm border border-gray-200 bg-gray-50 px-5 py-4 space-y-3">
            <div>
                <span className="text-gray-500 font-medium">Shop:</span>{" "}
                <span className="font-semibold text-gray-900">
                  {dealer?.shopName || "—"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Dealer:</span>{" "}
                <span className="text-gray-700">{dealer?.name || "—"}</span>
              </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 space-y-5">
          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOWNLOAD_MODES.map(({ value, label, description, icon: Icon }) => {
              const selected = mode === value;

              return (
                <label
                  key={value}
                  className={`cursor-pointer rounded-xl border p-4 transition
                    ${
                      selected
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="download-mode"
                    value={value}
                    checked={selected}
                    onChange={() => {
                      setMode(value);
                      if (value !== "range") {
                        setStartDate("");
                        setEndDate("");
                      }
                    }}
                    className="sr-only"
                  />

                  <div className="flex items-start gap-4">
                    <Icon
                      size={20}
                      className={`mt-0.5 ${
                        selected ? "text-emerald-600" : "text-gray-400"
                      }`}
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {label}
                      </p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Date Range */}
          {mode === "range" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Start date (optional)
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full form-input"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  End date (optional)
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full form-input"
                />
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-700">
            <Info size={16} className="mt-0.5 shrink-0" />
            <p>
              Choose a start date, end date, or both. Leave empty to download
              everything.
              {isInvalidRange && (
                <span className="block mt-1 font-medium text-red-600">
                  End date must be after start date.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isDownloadDisabled}
            className="btn bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Preparing…
              </>
            ) : (
              <>
                <Download size={16} className="mr-2" />
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </ModalBasic>
  );
};

export default DealerAssetDownloadModal;
