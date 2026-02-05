import React from "react";
import ClientDashboard from "../../pages/ClientDashboard";
import ClientProfilePage from "../../pages/ClientProfilePage";
import AllAssetsPage from "../../pages/assets/AllAssetsPage";
import AssetDetailsPage from "../../pages/assets/AssetDetailsPage";
import ChangePasswordPage from "../../pages/ChangePasswordPage";
import UnauthorizedPage from "../../pages/UnauthorizedPage";

// Client-specific routes - reusing admin pages where possible
const clientRouteConfig = [
  { 
    path: "/", 
    element: <ClientDashboard />
  },
  { 
    path: "/profile", 
    element: <ClientProfilePage />
  },
  { 
    path: "/my-assets", 
    element: <AllAssetsPage /> // Reusing admin assets page
  },
  { 
    path: "/asset-management/asset", 
    element: <AssetDetailsPage /> // Asset detail page
  },
  { 
    path: "/change-password", 
    element: <ChangePasswordPage />
  },
  { 
    path: "/unauthorized", 
    element: <UnauthorizedPage />
  },
];

export default clientRouteConfig;
