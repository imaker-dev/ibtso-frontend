import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import DashboardServices from "../services/DashboardServices";

export const fetchDashbordStats = createAsyncThunk(
  "/fetch/dashboard/stats",
  async () => {
    const res = await DashboardServices.getDashboardStatsApi();
    return res.data;
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    dashordStats: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashbordStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashbordStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashordStats = action.payload.data;
      })
      .addCase(fetchDashbordStats.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  },
});

// Export reducer
const { reducer } = dashboardSlice;
export default reducer;
