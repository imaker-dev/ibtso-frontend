import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const TemporaryPasswordGuard = ({ children }) => {
  const { meData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if user has temporary password and is not already on change password page
    if (
      meData?.isTemporaryPassword &&
      meData?.role === "CLIENT" &&
      location.pathname !== "/change-password"
    ) {
      navigate("/change-password", { replace: true });
    }
  }, [meData, navigate, location.pathname]);

  // If user has temporary password and not on change password page, show loading
  if (
    meData?.isTemporaryPassword &&
    meData?.role === "CLIENT" &&
    location.pathname !== "/change-password"
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to password change...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default TemporaryPasswordGuard;
