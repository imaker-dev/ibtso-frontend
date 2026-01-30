import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import NotFoundPage from "../pages/NotFoundPage";
import routeConfig from "./config/RouteConfig";

const AuthenticatedRoutes = ({data}) => {
  return (
    <AppLayout>
      <Routes>
        {routeConfig.map(({ path, element: Component }, idx) => (
          <Route key={idx} path={path} element={<Component />} />
        ))}

         {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
};

export default AuthenticatedRoutes;
