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
export const updateDealer = createAsyncThunk(
  "/update/dealer",
  async ({id,values}) => {
    const res = await DealerServices.updateDealerApi(id,values);
    return res.data;
  },
);
export const fetchAllDealers = createAsyncThunk("/fetch/dealers", async ({search}) => {
  const res = await DealerServices.getAllDealersApi(search);
  return res.data;
});
export const fetchDealerById = createAsyncThunk("/fetch/dealer/:id", async (id) => {
  const res = await DealerServices.getDealerByIdApi(id);
  return res.data;
});
export const downloadDealerBarcodeById = createAsyncThunk("/download/dealer/barcode/:id", async ({dealerId,startDate,endDate}) => {
  const res = await DealerServices.downloadDealerAllBarcodeApi(dealerId,startDate,endDate);
  return res.data;
});

const dealerSlice = createSlice({
  name: "dealer",
  initialState: {
    loading: false,
    isFetchingDealerDetails:false,
    isCreatingDealer: false,
    isUpdatingDealer: false,
    allDealersData: null,
    fetchDealerById: null,
    dealerBarcodeToDownloadId:null,
  },
  reducers: {
    clearDealerDetails: (state) => {
      state.delearDetails = null;
    },
  },
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
      .addCase(updateDealer.pending, (state) => {
        state.isUpdatingDealer = true;
      })
      .addCase(updateDealer.fulfilled, (state, action) => {
        state.isUpdatingDealer = false;
        toast.success(action.payload.message);
      })
      .addCase(updateDealer.rejected, (state, action) => {
        state.isUpdatingDealer = false;
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
        state.dealerBarcodeToDownloadId = action.meta.arg.dealerId;
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


export const { clearDealerDetails } = dealerSlice.actions;

// Export reducer
const { reducer } = dealerSlice;
export default reducer;
