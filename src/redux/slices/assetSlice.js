import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import AssetServices from "../services/AssetServices";

export const createAsset = createAsyncThunk("/create/asset", async (values) => {
  const res = await AssetServices.createAssetApi(values);
  return res.data;
});
export const updateAsset = createAsyncThunk(
  "/update/asset",
  async ({ id, values }) => {
    const res = await AssetServices.updateAssetApi(id, values);
    return res.data;
  },
);
export const fetchAllAssets = createAsyncThunk("/fetch/assets", async ({search}) => {
  const res = await AssetServices.getAllAssetsApi(search);
  return res.data;
});
export const fetchAssetById = createAsyncThunk(
  "/fetch/asset/:id",
  async (id) => {
    const res = await AssetServices.getAssetByIdApi(id);
    return res.data;
  },
);
export const deleteAsset = createAsyncThunk("/delete/asset", async (id) => {
  const res = await AssetServices.deleteAssetApi(id);
  return res.data;
});
export const downloadAssetById = createAsyncThunk(
  "/download/asset/:id",
  async (id) => {
    const res = await AssetServices.downloadAssetById(id);
    return res.data;
  },
);
export const downloadMultipleAssetById = createAsyncThunk(
  "/download/multiple/asset",
  async (values) => {
    const res = await AssetServices.downloadMultipleAssetById(values);
    return res.data;
  },
);

const assetSlice = createSlice({
  name: "asset",
  initialState: {
    loading: false,
    isFetchingDetails: false,
    isCreatingAsset: false,
    isUpdatingAsset: false,
    isDeletingAsset: false,
    allAssetsData: null,
    assetDetails: null,
    assetToDownloadId: null,
    isDownloadingMultipleAssets:false,
  },
  reducers: {
    clearAssetDetails: (state) => {
      state.assetDetails = null;
    },
  },
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
      .addCase(updateAsset.pending, (state) => {
        state.isUpdatingAsset = true;
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        state.isUpdatingAsset = false;
        toast.success(action.payload.message);
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.isUpdatingAsset = false;
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
        toast.success(action.payload.message);
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.isDeletingAsset = false;
        toast.error(action.error.message);
      })
      .addCase(downloadAssetById.pending, (state, action) => {
        state.assetToDownloadId = action.meta.arg;
      })
      .addCase(downloadAssetById.fulfilled, (state, action) => {
        state.assetToDownloadId = null;
        toast.success("Asset downloaded successfully");
      })
      .addCase(downloadAssetById.rejected, (state, action) => {
        state.assetToDownloadId = null;
        toast.error(action.error.message);
      })
      .addCase(downloadMultipleAssetById.pending, (state, action) => {
        state.isDownloadingMultipleAssets = true;
      })
      .addCase(downloadMultipleAssetById.fulfilled, (state, action) => {
        state.isDownloadingMultipleAssets = false;
        toast.success("Downloaded selected assets successfully");
      })
      .addCase(downloadMultipleAssetById.rejected, (state, action) => {
        state.isDownloadingMultipleAssets = false;
        toast.error(action.error.message);
      })
  },
});

export const { clearAssetDetails } = assetSlice.actions;
// Export reducer
const { reducer } = assetSlice;
export default reducer;
