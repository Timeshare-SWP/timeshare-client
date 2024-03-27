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

export const viewAllTransaction = createAsyncThunk(
  "transaction/viewAllTransaction",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/transactions`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const countQuantifyOfBuyer = createAsyncThunk(
  "transaction/countQuantifyOfBuyer",
  async (timeshare_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/transactions/countQuantifyOfBuyer/${timeshare_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

// này là lấy những transaction đang được yêu cầu xác nhận
export const viewWaitingTransaction = createAsyncThunk(
  "transaction/viewWaitingTransaction",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/transactions/waitingTransaction`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

// này là lấy những transaction đã được từ chối hoặc đồng ý
// tức là qua giai đoạn quản lý mua bán hợp đồng các thứ
export const viewRejectedSelectedTransaction = createAsyncThunk(
  "transaction/viewRejectedSelectedTransaction",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/transactions/selected&RejectedTransaction`);

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

    //viewAllTransaction
    builder.addCase(viewAllTransaction.pending, (state) => {
      state.error = "";
      state.loadingTransaction = true;
    });
    builder.addCase(viewAllTransaction.fulfilled, (state, action) => {
      state.loadingTransaction = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(viewAllTransaction.rejected, (state, action) => {
      state.loadingTransaction = false;
      state.error = action.payload;
    });

    //countQuantifyOfBuyer
    builder.addCase(countQuantifyOfBuyer.pending, (state) => {
      state.error = "";
      state.loadingTransaction = true;
    });
    builder.addCase(countQuantifyOfBuyer.fulfilled, (state, action) => {
      state.loadingTransaction = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(countQuantifyOfBuyer.rejected, (state, action) => {
      state.loadingTransaction = false;
      state.error = action.payload;
    });

    //viewRejectedSelectedTransaction
    builder.addCase(viewRejectedSelectedTransaction.pending, (state) => {
      state.error = "";
      state.loadingTransaction = true;
    });
    builder.addCase(viewRejectedSelectedTransaction.fulfilled, (state, action) => {
      state.loadingTransaction = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(viewRejectedSelectedTransaction.rejected, (state, action) => {
      state.loadingTransaction = false;
      state.error = action.payload;
    });
    
    //viewWaitingTransaction
    builder.addCase(viewWaitingTransaction.pending, (state) => {
      state.error = "";
      state.loadingTransaction = true;
    });
    builder.addCase(viewWaitingTransaction.fulfilled, (state, action) => {
      state.loadingTransaction = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(viewWaitingTransaction.rejected, (state, action) => {
      state.loadingTransaction = false;
      state.error = action.payload;
    });
  },
});

export default transactionSlice.reducer;
