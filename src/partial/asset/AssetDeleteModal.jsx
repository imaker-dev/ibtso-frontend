import React from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import ModalBlank from "../../components/ModalBlank";

const AssetDeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
  asset,
  loading = false,
}) => {
  return (
    <ModalBlank
      id={"delete-asset"}
      isOpen={isOpen}
      onClose={onClose}
      className="relative w-full max-w-lg animate-in fade-in zoom-in-95"
    >
      <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 ring-4 ring-rose-50">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Delete Asset
              </h2>
              <p className="text-sm text-gray-500">
                This action is permanent and cannot be undone
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            You’re about to permanently delete the following asset. Please
            review the details carefully before proceeding.
          </p>

          {/* Asset Summary Card */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Asset No
                </p>
                <p className="font-semibold text-gray-900">
                  {asset?.assetNo || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Fixture No
                </p>
                <p className="font-semibold text-gray-900">
                  {asset?.fixtureNo || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Brand
                </p>
                <p className="font-semibold text-gray-900">
                  {asset?.brand || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Dealer
                </p>
                <p className="font-semibold text-gray-900">
                  {asset?.dealerId?.shopName || "—"}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Location
                </p>
                <p className="font-semibold text-gray-900 truncate">
                  {asset?.location?.address || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
            Deleting this asset will remove all related records, barcode data,
            and history associated with it.
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn   text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={() => asset?._id && onSubmit(asset?._id)}
            disabled={loading}
            className="btn inline-flex items-center gap-2 bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Asset
              </>
            )}
          </button>
        </div>
      </div>
    </ModalBlank>
  );
};

export default AssetDeleteModal;
