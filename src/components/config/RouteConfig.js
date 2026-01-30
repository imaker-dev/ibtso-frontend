import React from "react";
import Dashboard from "../../pages/Dashboard";
import AllDealersPage from "../../pages/dealers/AllDealersPage";
import AddDealerPage from "../../pages/dealers/AddDealerPage";
import AllAssetsPage from "../../pages/assets/AllAssetsPage";
import AddAssetPage from "../../pages/assets/AddAssetPage";
import AssetDetailsPage from "../../pages/assets/AssetDetailsPage";
import DealerDetailsPage from "../../pages/dealers/DealerDetailsPage";

const routeConfig = [
  { path: "/", element: Dashboard },
  { path: "/dealers", element: AllDealersPage },
  { path: "/dealers/add", element: AddDealerPage },
  { path: "/dealers/dealer", element: DealerDetailsPage },
  { path: "/assets", element: AllAssetsPage },
  { path: "/assets/add", element: AddAssetPage },
  { path: "/assets/asset", element: AssetDetailsPage },

];

export default routeConfig;
