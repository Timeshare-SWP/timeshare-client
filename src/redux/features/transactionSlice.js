import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";
import { saveOtpToSessionStorage } from "../utils/handleOtp";

const initialState = {
  notificationData: null,
  loadingTransaction: false,
  error: "",
};

export const searchCustomerByNameToInvite = createAsyncThunk(
  "transaction/searchCustomerToInvite",
  async (stringName, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(
        `/api/transactions/searchCustomerToInvite?fullName=${stringName}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const inviteToJoinTimeshare = createAsyncThunk(
  "transaction/inviteToJoinTimeshare",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(
        `/api/transactions/transactionInvite`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const replyToJoinTimeshare = createAsyncThunk(
  "transaction/replyToJoinTimeshare",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(
        `/api/transactions/replyTransactionInvite`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //searchCustomerByNameToInvite
    builder.addCase(searchCustomerByNameToInvite.pending, (state) => {
      state.error = "";
    });
    builder.addCase(searchCustomerByNameToInvite.fulfilled, (state, action) => {
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(searchCustomerByNameToInvite.rejected, (state, action) => {
      state.error = action.payload;
    });

    //inviteToJoinTimeshare
    builder.addCase(inviteToJoinTimeshare.pending, (state) => {
      state.error = "";
    });
    builder.addCase(inviteToJoinTimeshare.fulfilled, (state, action) => {
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(inviteToJoinTimeshare.rejected, (state, action) => {
      state.error = action.payload;
    });

    //replyToJoinTimeshare
    builder.addCase(replyToJoinTimeshare.pending, (state) => {
      state.error = "";
    });
    builder.addCase(replyToJoinTimeshare.fulfilled, (state, action) => {
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(replyToJoinTimeshare.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default transactionSlice.reducer;
