import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../src/redux/slices/authSlice";
import dealerSlice from '../src/redux/slices/dealerSlice';
import assetSlice from '../src/redux/slices/assetSlice';
import dashboardSlice from '../src/redux/slices/dashboardSlice';
import brandSlice from '../src/redux/slices/brandSlice';
import clientSlice from '../src/redux/slices/clientSlice';
import clientDashboardSlice from '../src/redux/slices/clientDashboardSlice';

const reducer = {
  auth: authSlice,
  dealer:dealerSlice,
  asset:assetSlice,
  dashboard:dashboardSlice,
  brand:brandSlice,
  client:clientSlice,
  clientDashboard:clientDashboardSlice,
};

const store = configureStore({
  reducer,
});

export default store;
