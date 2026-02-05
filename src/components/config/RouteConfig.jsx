import React from "react";
import Dashboard from "../../pages/Dashboard";
import AllDealersPage from "../../pages/dealers/AllDealersPage";
import AddDealerPage from "../../pages/dealers/AddDealerPage";
import AllAssetsPage from "../../pages/assets/AllAssetsPage";
import AddAssetPage from "../../pages/assets/AddAssetPage";
import AssetDetailsPage from "../../pages/assets/AssetDetailsPage";
import DealerDetailsPage from "../../pages/dealers/DealerDetailsPage";
import AllBrandsPage from "../../pages/brands/AllBrandsPage";
import AllClientsPage from "../../pages/client/AllClientsPage";
import AddClientPage from "../../pages/client/AddClientPage";
import ClientDetailsPage from "../../pages/client/ClientDetailsPage";
import UnauthorizedPage from "../../pages/UnauthorizedPage";
import ProtectedRoute from "../ProtectedRoute";
import { PERMISSIONS } from "../../constants/roles";

const routeConfig = [
  { 
    path: "/", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_DASHBOARD]}>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  { 
    path: "/dealers", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_ALL_DEALERS]}>
        <AllDealersPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/dealers/add", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.ADD_DEALER]}>
        <AddDealerPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/dealers/dealer", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.EDIT_DEALER]}>
        <DealerDetailsPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/clients", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_ALL_CLIENTS]}>
        <AllClientsPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/clients/add", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.ADD_CLIENT]}>
        <AddClientPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/clients/client", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.EDIT_CLIENT]}>
        <ClientDetailsPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/asset-management", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_ALL_ASSETS]}>
        <AllAssetsPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/asset-management/add", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.ADD_ASSET]}>
        <AddAssetPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/asset-management/asset", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.EDIT_ASSET]}>
        <AssetDetailsPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/brands", 
    element: (
      <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_BRANDS]}>
        <AllBrandsPage />
      </ProtectedRoute>
    )
  },
  { 
    path: "/unauthorized", 
    element: <UnauthorizedPage />
  },
];

export default routeConfig;
