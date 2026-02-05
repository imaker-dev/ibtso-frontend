import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usePreventNumberInputScroll, useScrollToTop } from "./hooks/useScroll";
import AuthPage from "./pages/AuthPage";
import ClientLoginPage from "./pages/ClientLoginPage";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import AppSkeleton from "./components/layout/AppSkeleton";
import { fetchMeData } from "./redux/slices/authSlice";
import { USER_ROLES } from "./constants/roles";
import RoleDebugger from "./components/RoleDebugger";

const App = () => {
  const dispatch = useDispatch();

  const { logIn, loading, meData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logIn) {
      dispatch(fetchMeData());
    }
  }, [logIn, dispatch]);

  useScrollToTop();
  usePreventNumberInputScroll();

  if (loading) {
    return <AppSkeleton />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Auth Routes */}
        {logIn ? (
          <Route path="/auth" element={<Navigate to="/" replace />} />
        ) : (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/client-auth" element={<ClientLoginPage />} />
            <Route path="/*" element={<Navigate to="/auth" replace />} />
          </>
        )}

        {/* Protected Routes */}
        {logIn && (
          <Route path="/*" element={<AuthenticatedRoutes data={meData} />} />
        )}
      </Routes>
      
      {/* Debug component - remove in production */}
      {/* {logIn && <RoleDebugger />} */}
    </Suspense>
  );
};

export default App;
