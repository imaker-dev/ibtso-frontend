import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import DealerServices from "../services/DealerServices";

export const createDealer = createAsyncThunk(
  "/create/dealer",
  async (values) => {
    const res = await DealerServices.createDealerApi(values);
    return res.data;
  },
);
export const fetchAllDealers = createAsyncThunk("/fetch/dealers", async () => {
  const res = await DealerServices.getAllDealersApi();
  return res.data;
});
export const fetchDealerById = createAsyncThunk("/fetch/dealer/:id", async (id) => {
  const res = await DealerServices.getDealerByIdApi(id);
  return res.data;
});
export const downloadDealerBarcodeById = createAsyncThunk("/download/dealer/barcode/:id", async (id) => {
  const res = await DealerServices.downloadDealerAllBarcodeApi(id);
  return res.data;
});

const dealerSlice = createSlice({
  name: "dealer",
  initialState: {
    loading: false,
    isFetchingDealerDetails:false,
    isCreatingDealer: false,
    allDealersData: null,
    fetchDealerById: null,
    dealerBarcodeToDownloadId:null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDealer.pending, (state) => {
        state.isCreatingDealer = true;
      })
      .addCase(createDealer.fulfilled, (state, action) => {
        state.isCreatingDealer = false;
        toast.success(action.payload.message);
      })
      .addCase(createDealer.rejected, (state, action) => {
        state.isCreatingDealer = false;
        toast.error(action.error.message);
      })
      .addCase(fetchAllDealers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDealers.fulfilled, (state, action) => {
        state.loading = false;
        state.allDealersData = action.payload;
      })
      .addCase(fetchAllDealers.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })
      .addCase(fetchDealerById.pending, (state) => {
        state.isFetchingDealerDetails = true;
      })
      .addCase(fetchDealerById.fulfilled, (state, action) => {
        state.isFetchingDealerDetails = false;
        state.delearDetails = action.payload.data;
      })
      .addCase(fetchDealerById.rejected, (state, action) => {
        state.isFetchingDealerDetails = false;
        toast.error(action.error.message);
      })
      .addCase(downloadDealerBarcodeById.pending, (state,action) => {
        state.dealerBarcodeToDownloadId = action.meta.arg;
      })
      .addCase(downloadDealerBarcodeById.fulfilled, (state, action) => {
        state.dealerBarcodeToDownloadId = null;
        toast.success("Downloaded Successfully")
      })
      .addCase(downloadDealerBarcodeById.rejected, (state, action) => {
        state.dealerBarcodeToDownloadId = null;
        toast.error(action.error.message);
      })
  },
});

// Export reducer
const { reducer } = dealerSlice;
export default reducer;
