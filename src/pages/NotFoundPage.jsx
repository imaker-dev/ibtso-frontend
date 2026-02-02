import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 – Page Not Found";
  }, []);

  return (
    <div className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[linear-gradient(to_right,#6366f120_1px,transparent_1px),
        linear-gradient(to_bottom,#6366f120_1px,transparent_1px)] 
        bg-[size:48px_48px]"
      />

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="bg-white rounded-xl p-10 text-center">
          {/* 404 */}
          <div className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-secondary-500 to-secondary-700 mb-4">
            404
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Page not found
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            The page you are trying to access doesn’t exist or may have been
            removed. Please use the options below to continue.
          </p>

          {/* Error meta */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-mono 
                          text-gray-600 border border-gray-200 rounded-md bg-gray-100"
          >
            HTTP 404 · ROUTE_NOT_FOUND
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 
                         rounded-md text-sm font-medium 
                         bg-gray-100 text-gray-800 border border-gray-200 
                         hover:bg-gray-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 
                         rounded-md text-sm font-medium 
                         bg-secondary-500 text-white 
                         hover:bg-secondary-600 transition shadow-sm"
            >
              Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
