import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import BrandServices from "../services/BrandServices";

export const createBrand = createAsyncThunk("/create/brand", async (values) => {
  const res = await BrandServices.createBrandApi(values);
  return res.data;
});

export const fetchAllBrands = createAsyncThunk("/fetch/brands", async () => {
  const res = await BrandServices.getAllBrandsApi();
  return res.data;
});

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    loading: false,
    isCreatingBrand: false,
    allBrandsData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.isCreatingBrand = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isCreatingBrand = false;
        toast.success(action.payload.message);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isCreatingBrand = false;
        toast.error(action.error.message);
      })
      .addCase(fetchAllBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.allBrandsData = action.payload.data;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  },
});

// Export reducer
const { reducer } = brandSlice;
export default reducer;
