import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import NotFoundPage from "../pages/NotFoundPage";
import routeConfig from "./config/RouteConfig.jsx";
import clientRouteConfig from "./config/ClientRouteConfig.jsx";
import { USER_ROLES } from "../constants/roles";
import TemporaryPasswordGuard from "./TemporaryPasswordGuard";

const AuthenticatedRoutes = ({data}) => {
  // Choose route config based on user role
  const getRouteConfig = () => {
    if (data?.role === USER_ROLES.CLIENT) {
      return clientRouteConfig;
    }
    return routeConfig;
  };

  const currentRouteConfig = getRouteConfig();

  return (
    <TemporaryPasswordGuard>
      <AppLayout>
        <Routes>
          {currentRouteConfig.map(({ path, element: Component }, idx) => (
            <Route key={idx} path={path} element={Component} />
          ))}

           {/* Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </TemporaryPasswordGuard>
  );
};

export default AuthenticatedRoutes;
