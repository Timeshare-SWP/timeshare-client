import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";
import { saveOtpToSessionStorage } from "../utils/handleOtp";

const initialState = {
  notificationData: null,
  loadingNoti: false,
  error: "",
};

export const sendOtpWhenRegister = createAsyncThunk(
  "notification/sendOtpWhenRegister",
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

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //sendOtpWhenRegister
    builder.addCase(sendOtpWhenRegister.pending, (state) => {
      state.loadingNoti = true;
      state.error = "";
    });
    builder.addCase(sendOtpWhenRegister.fulfilled, (state, action) => {
      state.loadingNoti = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(sendOtpWhenRegister.rejected, (state, action) => {
      state.loadingNoti = false;
      state.error = action.payload;
    });

    
  },
});

export default notificationSlice.reducer;
