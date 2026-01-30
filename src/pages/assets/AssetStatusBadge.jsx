import React from "react";

const assetStatusStyles = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-200 text-gray-700",
};

const AssetStatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  const label = normalizedStatus
    ? normalizedStatus.toUpperCase()
    : "UNKNOWN";

  const baseClasses =
    "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold tracking-wide";

  const style =
    assetStatusStyles[normalizedStatus] || "bg-slate-100 text-slate-700";

  return <span className={`${baseClasses} ${style}`}>{label}</span>;
};

export default AssetStatusBadge;
