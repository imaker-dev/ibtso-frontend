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

const routeConfig = [
  { path: "/", element: Dashboard },
  { path: "/dealers", element: AllDealersPage },
  { path: "/dealers/add", element: AddDealerPage },
  { path: "/dealers/dealer", element: DealerDetailsPage },
  { path: "/clients", element: AllClientsPage },
  { path: "/clients/add", element: AddClientPage },
  { path: "/clients/client", element: ClientDetailsPage },
  { path: "/assets", element: AllAssetsPage },
  { path: "/assets/add", element: AddAssetPage },
  { path: "/assets/asset", element: AssetDetailsPage },
  { path: "/brands", element: AllBrandsPage },

];

export default routeConfig;
