import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import AuthServices from "../services/AuthServices";
import { TOKEN_KEYS } from "../../constants";

const logIn = !!localStorage.getItem(TOKEN_KEYS.ACCESS);

export const signin = createAsyncThunk("/admin/signin", async (values) => {
  const res = await AuthServices.signinApi(values);
  return res.data;
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    logIn,
    loading:false,
    isLogging:false,
    meData: null,
  },
  reducers: {
    clearLoginState: (state) => {
      state.logIn = false;
      localStorage.removeItem(TOKEN_KEYS.ACCESS);
      toast.success("logout sucessfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLogging = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLogging = false;
        state.logIn = true;
        localStorage.setItem(
          TOKEN_KEYS.ACCESS,
          action.payload.token
        );
        toast.success("Logged in successfully");
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLogging = false;
        toast.error(action.error.message);
      })

  },
});

// Export actions
export const { clearLoginState } = authSlice.actions;

// Export reducer
const { reducer } = authSlice;
export default reducer;
