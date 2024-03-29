import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";
import { saveOtpToSessionStorage } from "../utils/handleOtp";

const initialState = {
  notificationData: null,
  loadingReservedPlace: false,
  error: "",
};

export const viewAllReservedPlace = createAsyncThunk(
  "reservedPlace/viewAllReservedPlace",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/reservePlaces`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createReservedPlace = createAsyncThunk(
  "reservedPlace/createReservedPlace",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/reservePlaces`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const cancelReservedPlace = createAsyncThunk(
  "reservedPlace/cancelReservedPlace",
  async (transaction_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.delete(
        `/api/reservePlaces/cancel?transaction_id=${transaction_id}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const viewAllCustomerWhoReservePlaceByTimeshareId = createAsyncThunk(
  "reservedPlace/viewAllCustomerWhoReservePlaceByTimeshareId",
  async (timeshare_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/reservePlaces/whoReservePlace/${timeshare_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createPaymentUrlForReserving = createAsyncThunk(
  "reservedPlace/createPaymentUrlForReserving",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/vnpays/create_payment_url`, {...data});

      return response.data;
    } catch (error) {
      console.log('api', error)
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const checkReservingTimeshare = createAsyncThunk(
  "reservedPlace/checkReservingTimeshare",
  async (timeshare_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/reservePlaces/checkReservingTimeshare?timeshare_id=${timeshare_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const reservedPlaceSlice = createSlice({
  name: "reservedPlace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //viewAllReservedPlace
    builder.addCase(viewAllReservedPlace.pending, (state) => {
      state.loadingReservedPlace = true;
      state.error = "";
    });
    builder.addCase(viewAllReservedPlace.fulfilled, (state, action) => {
      state.loadingReservedPlace = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(viewAllReservedPlace.rejected, (state, action) => {
      state.loadingReservedPlace = false;
      state.error = action.payload;
    });

    //createReservedPlace
    builder.addCase(createReservedPlace.pending, (state) => {
      state.loadingReservedPlace = true;
      state.error = "";
    });
    builder.addCase(createReservedPlace.fulfilled, (state, action) => {
      state.loadingReservedPlace = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createReservedPlace.rejected, (state, action) => {
      state.loadingReservedPlace = false;
      state.error = action.payload;
    });

    //cancelReservedPlace
    builder.addCase(cancelReservedPlace.pending, (state) => {
      // state.loadingReservedPlace = true;
      state.error = "";
    });
    builder.addCase(cancelReservedPlace.fulfilled, (state, action) => {
      // state.loadingReservedPlace = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(cancelReservedPlace.rejected, (state, action) => {
      // state.loadingReservedPlace = false;
      state.error = action.payload;
    });

    //checkReservingTimeshare
    builder.addCase(checkReservingTimeshare.pending, (state) => {
      // state.loadingReservedPlace = true;
      state.error = "";
    });
    builder.addCase(checkReservingTimeshare.fulfilled, (state, action) => {
      // state.loadingReservedPlace = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(checkReservingTimeshare.rejected, (state, action) => {
      // state.loadingReservedPlace = false;
      state.error = action.payload;
    });
  },
});

export default reservedPlaceSlice.reducer;
