import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import ClientServices from "../services/ClientServices";

export const fetchClientDashboardStats = createAsyncThunk(
  "/fetch/client/dashboard/stats",
  async () => {
    const res = await ClientServices.getClientDashboardStatsApi();
    return res.data;
  },
);

export const fetchClientAssets = createAsyncThunk(
  "/fetch/client/assets",
  async (params) => {
    const res = await ClientServices.getClientAssetsApi(params);
    return res.data;
  },
);

export const updateClientProfile = createAsyncThunk(
  "/update/client/profile",
  async (values) => {
    const res = await ClientServices.updateClientProfileApi(values);
    return res.data;
  },
);

export const changeClientPassword = createAsyncThunk(
  "/change/client/password",
  async (values) => {
    const res = await ClientServices.changeClientPasswordApi(values);
    return res.data;
  },
);

const clientDashboardSlice = createSlice({
  name: "clientDashboard",
  initialState: {
    loading: false,
    assetsLoading: false,
    dashboardStats: null,
    clientAssets: null,
    assetsPagination: null,
  },
  reducers: {
    clearClientDashboardState: (state) => {
      state.dashboardStats = null;
      state.clientAssets = null;
      state.assetsPagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard stats
      .addCase(fetchClientDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload.data;
      })
      .addCase(fetchClientDashboardStats.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })
      // Fetch client assets
      .addCase(fetchClientAssets.pending, (state) => {
        state.assetsLoading = true;
      })
      .addCase(fetchClientAssets.fulfilled, (state, action) => {
        state.assetsLoading = false;
        state.clientAssets = action.payload.data.assets;
        state.assetsPagination = action.payload.data.pagination;
      })
      .addCase(fetchClientAssets.rejected, (state, action) => {
        state.assetsLoading = false;
        toast.error(action.error.message);
      })
      // Update profile
      .addCase(updateClientProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClientProfile.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Profile updated successfully");
      })
      .addCase(updateClientProfile.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })
      // Change password
      .addCase(changeClientPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeClientPassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Password changed successfully");
      })
      .addCase(changeClientPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  },
});

export const { clearClientDashboardState } = clientDashboardSlice.actions;

const { reducer } = clientDashboardSlice;
export default reducer;
