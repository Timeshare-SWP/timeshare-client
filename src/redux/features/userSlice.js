import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  dataUser: null,
  loadingUser: false,
  error: "",
};

export const checkEmailExisted = createAsyncThunk(
  "user/checkEmailExisted",
  async (email, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const data = {
        email: email,
      };
      const response = await instance.post(`/api/auth/isNewGoogleAccount`, data);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const data = {
        email: email,
      };

      const response = await instance.post(`/api/users/forgotPassword`, data);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({email, otp}, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const data = {
        email: email,
        otp: otp
      };

      const response = await instance.post(`/api/users/resetPassword`, data);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //checkEmailExisted
    builder.addCase(checkEmailExisted.pending, (state) => {
      state.loadingUser = true;
      state.error = "";
    });
    builder.addCase(checkEmailExisted.fulfilled, (state, action) => {
      state.loadingUser = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(checkEmailExisted.rejected, (state, action) => {
      state.loadingUser = false;
      state.error = action.payload;
    });

    //forgotPassword
    builder.addCase(forgotPassword.pending, (state) => {
      state.loadingUser = true;
      state.error = "";
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loadingUser = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loadingUser = false;
      state.error = action.payload;
    });

    //resetPassword
    builder.addCase(resetPassword.pending, (state) => {
      state.loadingUser = true;
      state.error = "";
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loadingUser = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loadingUser = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
