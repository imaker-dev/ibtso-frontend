import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import BarcodeReportServices from "../services/BarcodeReportServices";

export const fetchBarcodeViewSummary = createAsyncThunk(
  "/fetch/barcodes/reports/views/summary",
  async (params = {}) => {
    const res = await BarcodeReportServices.getBarcodeViewSummaryApi(params);
    return res.data;
  },
);

export const fetchBarcodeViewAssets = createAsyncThunk(
  "/fetch/barcodes/reports/views/assets",
  async (params = {}) => {
    const res = await BarcodeReportServices.getBarcodeViewAssetsApi(params);
    return res.data;
  },
);

const barcodeReportSlice = createSlice({
  name: "barcodeReport",
  initialState: {
    summaryLoading: false,
    assetsLoading: false,
    summary: null,
    assets: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBarcodeViewSummary.pending, (state) => {
        state.summaryLoading = true;
      })
      .addCase(fetchBarcodeViewSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload.data;
      })
      .addCase(fetchBarcodeViewSummary.rejected, (state, action) => {
        state.summaryLoading = false;
        toast.error(action.error.message);
      })
      .addCase(fetchBarcodeViewAssets.pending, (state) => {
        state.assetsLoading = true;
      })
      .addCase(fetchBarcodeViewAssets.fulfilled, (state, action) => {
        state.assetsLoading = false;
        state.assets = action.payload;
      })
      .addCase(fetchBarcodeViewAssets.rejected, (state, action) => {
        state.assetsLoading = false;
        toast.error(action.error.message);
      });
  },
});

const { reducer } = barcodeReportSlice;
export default reducer;
