import React from "react";

/**
 * Minimal Premium App Skeleton
 * - Sidebar skeleton
 * - Header skeleton
 * - Centered brand logo in main content
 */
const AppSkeleton = () => {
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50 animate-pulse">
      {/* ================= Sidebar Skeleton ================= */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 px-4 py-6">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="h-8 w-32 bg-gray-200 rounded-lg" />
        </div>

        {/* Nav items */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
            >
              <div className="h-6 w-6 bg-gray-300 rounded-md" />
              <div className="h-4 w-28 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </aside>

      {/* ================= Content Area ================= */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ================= Header Skeleton ================= */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        </header>

        {/* ================= Main Content Skeleton ================= */}
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          {/* Center logo placeholder */}
          <img src="/Images/logo.png" alt="logo" className="w-44 lg:w-60" />
        </main>
      </div>
    </div>
  );
};

export default AppSkeleton;
