import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 – Page Not Found";
  }, []);

  return (
    <div className="relative min-h-[85dvh] flex items-center justify-center bg-primary-500 overflow-hidden rounded-md">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="bg-tertiary-500 border border-tertiary-700 rounded-xl shadow-xl p-10 text-center">
          {/* 404 */}
          <div className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-secondary-400 to-secondary-600 mb-4">
            404
          </div>

          <h1 className="text-2xl font-semibold text-primary-50 mb-2">
            Page not found
          </h1>

          <p className="text-primary-300 text-sm leading-relaxed mb-8">
            The page you are trying to access doesn’t exist or may have been
            removed. Please use the options below to continue.
          </p>

          {/* Error meta */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-mono text-primary-400 border border-tertiary-700 rounded-md bg-primary-600">
            HTTP 404 · ROUTE_NOT_FOUND
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium bg-tertiary-600 text-primary-100 border border-tertiary-700 hover:bg-tertiary-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium bg-secondary-500 text-white hover:bg-secondary-600 transition shadow-sm"
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
