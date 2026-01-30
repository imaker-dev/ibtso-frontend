import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import AssetServices from "../services/AssetServices";

export const createAsset = createAsyncThunk(
  "/create/asset",
  async (values) => {
    const res = await AssetServices.createAssetApi(values);
    return res.data;
  },
);
export const fetchAllAssets = createAsyncThunk("/fetch/assets", async () => {
  const res = await AssetServices.getAllAssetsApi();
  return res.data;
});
export const fetchAssetById = createAsyncThunk("/fetch/asset/:id", async (id) => {
  const res = await AssetServices.getAssetByIdApi(id);
  return res.data;
});
export const deleteAsset = createAsyncThunk("/delete/asset", async (id) => {
  const res = await AssetServices.deleteAssetApi(id);
  return res.data;
});

const assetSlice = createSlice({
  name: "asset",
  initialState: {
    loading: false,
    isFetchingDetails:false,
    isCreatingAsset:false,
    isDeletingAsset:false,
    allAssetsData: null,
    assetDetails: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAsset.pending, (state) => {
        state.isCreatingAsset = true;
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.isCreatingAsset = false;
        toast.success(action.payload.message);
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.isCreatingAsset = false;
        toast.error(action.error.message);
      })
      .addCase(fetchAllAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.allAssetsData = action.payload;
      })
      .addCase(fetchAllAssets.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })
      .addCase(fetchAssetById.pending, (state) => {
        state.isFetchingDetails = true;
      })
      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.isFetchingDetails = false;
        state.assetDetails = action.payload.data;
      })
      .addCase(fetchAssetById.rejected, (state, action) => {
        state.isFetchingDetails = false;
        toast.error(action.error.message);
      })
      .addCase(deleteAsset.pending, (state) => {
        state.isDeletingAsset = true;
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.isDeletingAsset = false;
        toast.success(action.payload.message)
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.isDeletingAsset = false;
        toast.error(action.error.message);
      })
  },
});

// Export reducer
const { reducer } = assetSlice;
export default reducer;
