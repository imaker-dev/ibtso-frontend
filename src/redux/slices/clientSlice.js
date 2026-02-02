import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import ClientServices from "../services/ClientServices";

export const createClient = createAsyncThunk(
  "/create/client",
  async (values) => {
    const res = await ClientServices.createClientApi(values);
    return res.data;
  },
);
export const updateClient = createAsyncThunk(
  "/update/client",
  async ({ id, values }) => {
    const res = await ClientServices.updateClientApi(id, values);
    return res.data;
  },
);

export const fetchAllClients = createAsyncThunk("/fetch/clients", async () => {
  const res = await ClientServices.getAllClientsApi();
  return res.data;
});
export const fetchClientById = createAsyncThunk(
  "/fetch/client/:id",
  async (id) => {
    const res = await ClientServices.getClientByIdApi(id);
    return res.data;
  },
);

const clientSlice = createSlice({
  name: "client",
  initialState: {
    loading: false,
    isCreatingClient: false,
    isUpdatingClient: false,
    allClientsData: null,
    isFetchingClientDetails: false,
    clientDetails: null,
  },
  reducers: {
    clearClientDetails: (state) => {
      state.clientDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.isCreatingClient = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.isCreatingClient = false;
        toast.success(action.payload.message);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isCreatingClient = false;
        toast.error(action.error.message);
      })
      .addCase(updateClient.pending, (state) => {
        state.isUpdatingClient = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.isUpdatingClient = false;
        toast.success(action.payload.message);
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isUpdatingClient = false;
        toast.error(action.error.message);
      })
      .addCase(fetchAllClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.allClientsData = action.payload.data;
      })
      .addCase(fetchAllClients.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })
      .addCase(fetchClientById.pending, (state) => {
        state.isFetchingClientDetails = true;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.isFetchingClientDetails = false;
        state.clientDetails = action.payload.data;
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.isFetchingClientDetails = false;
        toast.error(action.error.message);
      });
  },
});

export const { clearClientDetails } = clientSlice.actions;

// Export reducer
const { reducer } = clientSlice;
export default reducer;
