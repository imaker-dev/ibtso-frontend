import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../src/redux/slices/authSlice";
import dealerSlice from '../src/redux/slices/dealerSlice';
import assetSlice from '../src/redux/slices/assetSlice';
import dashboardSlice from '../src/redux/slices/dashboardSlice';

const reducer = {
  auth: authSlice,
  dealer:dealerSlice,
  asset:assetSlice,
  dashboard:dashboardSlice,
};

const store = configureStore({
  reducer,
});

export default store;
