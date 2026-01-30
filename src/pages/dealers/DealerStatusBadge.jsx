import React from "react";

const dealerStatusStyles = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-200 text-gray-700",
};

const DealerStatusBadge = ({ status }) => {
  const normalizedStatus = status ? "active" : "inactive";

  const label = normalizedStatus.toUpperCase();

  const baseClasses =
    "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold tracking-wide";

  const style =
    dealerStatusStyles[normalizedStatus] ||
    "bg-slate-100 text-slate-700";

  return <span className={`${baseClasses} ${style}`}>{label}</span>;
};

export default DealerStatusBadge;
