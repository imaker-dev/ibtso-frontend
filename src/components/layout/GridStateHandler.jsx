import React from "react";
import NoDataFound from "../NoDataFound";

/**
 * Generic grid state handler
 * - does NOT know card layout
 * - skeleton & cards are injected
 */
const GridStateHandler = ({
  loading,
  data = [],
  columns = 3,
  skeletonCount = 6,
  renderSkeleton,
  emptyMessage = "No Data Found",
  emptyDescription = "No data available.",
  emptyIcon,
  children,
}) => {
  const gridClass = `grid gap-6 sm:grid-cols-2 lg:grid-cols-${columns}`;

  // 🔄 Loading
  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((_, i) => renderSkeleton(i))}
      </div>
    );
  }

  // 🚫 Empty
  if (!data.length) {
    return (
      <NoDataFound
        title={emptyMessage}
        description={emptyDescription}
        icon={emptyIcon}
        className="h-[60dvh]"
      />
    );
  }

  // ✅ Render actual content
  return <div className={gridClass}>{children}</div>;
};

export default GridStateHandler;
