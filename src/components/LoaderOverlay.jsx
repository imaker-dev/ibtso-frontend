import React from "react";
import { Loader2 } from "lucide-react";

const LoaderOverlay = ({ show = false, text = "Please wait..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-sm px-4">
      <div className="relative flex flex-col items-center gap-4">
        {/* Premium Spinner - Classic Design */}
        <div className="relative flex items-center justify-center">
          {/* Outer subtle ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-300/30 animate-pulse" />

          {/* Spinner Icon */}
          <Loader2
            className="w-12 h-12 text-slate-700 animate-spin"
            strokeWidth={1.5}
          />
        </div>

        {/* Text Content */}
        {text && (
          <div className="text-center">
            <p className="text-sm sm:text-base font-medium text-slate-700 tracking-wide">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoaderOverlay;
