import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";
import { saveOtpToSessionStorage } from "../utils/handleOtp";

const initialState = {
  authData: null,
  loadingAuth: false,
  error: "",
  otp: "",
};

export const sendOtpWhenRegister = createAsyncThunk(
  "auth/sendOtpWhenRegister",
  async (email, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const body = {
        email: email,
      };

      const response = await instance.post(`/api/users/otpRegister`, body);

      saveOtpToSessionStorage(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyOtpWhenRegister = createAsyncThunk(
  "auth/verifyOtpWhenRegister",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(
        `/api/users/verifyOtpRegister`,
        data
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/users/register`, data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //sendOtpWhenRegister
    builder.addCase(sendOtpWhenRegister.pending, (state) => {
      state.loadingAuth = true;
      state.error = "";
    });
    builder.addCase(sendOtpWhenRegister.fulfilled, (state, action) => {
      state.loadingAuth = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(sendOtpWhenRegister.rejected, (state, action) => {
      state.loadingAuth = false;
      state.error = action.payload;
    });

    //verifyOtpWhenRegister
    builder.addCase(verifyOtpWhenRegister.pending, (state) => {
      state.loadingAuth = true;
      state.error = "";
    });
    builder.addCase(verifyOtpWhenRegister.fulfilled, (state, action) => {
      state.loadingAuth = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(verifyOtpWhenRegister.rejected, (state, action) => {
      state.loadingAuth = false;
      state.error = action.payload;
    });

    //registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loadingAuth = true;
      state.error = "";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loadingAuth = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loadingAuth = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
