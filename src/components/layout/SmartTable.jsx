import React from "react";
import Shimmer from "../Shimmer";
import { Loader2 } from "lucide-react";
import NoDataFound from "../NoDataFound";

export default function SmartTable({
  title,
  totalcount = 0,
  data = [],
  columns = [],
  actions = [],
  emptyMessage = "No data found",
  emptyDescription = "",
  loading = false,
}) {
  const columnCount = columns?.length + (actions?.length > 0 ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm">
      <div className="p-5">
        <h3 className="text-base font-semibold">
          {title} : {totalcount || 0}
        </h3>
      </div>
      <div className="border-t border-slate-200" />

      <div className="relative w-full overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              {columns.map((col, idx) => (
                <th key={idx} className="px-5 py-3">
                  {col.label}
                </th>
              ))}
              {actions?.length > 0 && (
                <th className="px-5 py-3 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(5)].map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-t border-slate-200 ${
                    rowIndex % 2 === 1 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-5 py-4">
                      <Shimmer width="80%" height="16px" />
                    </td>
                  ))}

                  {actions?.length > 0 && (
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {actions.map((_, aIdx) => (
                          <Shimmer
                            key={aIdx}
                            width="36px"
                            height="36px"
                            rounded="lg"
                          />
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : data?.length > 0 ? (
              data?.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className={`${
                    idx % 2 === 1 ? "bg-slate-50" : "bg-white"
                  } border-t border-slate-200 transition-colors hover:bg-slate-100/60`}
                >
                  {columns?.map((col, colIdx) => (
                    <td key={colIdx} className="px-5 py-4">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}

                  {actions?.length > 0 && (
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {actions.map((action) => {
                          const isDisabled =
                            typeof action.disabled === "function"
                              ? action.disabled(row)
                              : Boolean(action.disabled);

                          const isLoading =
                            typeof action.loading === "function"
                              ? action.loading(row)
                              : Boolean(action.loading);

                          const Icon =
                            typeof action.icon === "function"
                              ? action.icon(row)
                              : action.icon;

                          const isButtonDisabled = isDisabled || isLoading;

                          return (
                            <button
                              key={action.label}
                              type="button"
                              disabled={isButtonDisabled}
                              aria-disabled={isButtonDisabled}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isButtonDisabled || !action.onClick) return;
                                action.onClick(row);
                              }}
                              title={
                                isDisabled
                                  ? action.disabledTooltip || action.label
                                  : action.label
                              }
                              className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors
                              ${
                                isButtonDisabled
                                  ? "cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200"
                                  : action.type === "danger"
                                  ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
                                  : action.type === "primary"
                                  ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                                  : action.type === "success"
                                  ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500"
                                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                Icon && <Icon className="h-4 w-4" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-5 py-12" colSpan={columnCount}>
                  <NoDataFound title={emptyMessage} description={emptyDescription} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
