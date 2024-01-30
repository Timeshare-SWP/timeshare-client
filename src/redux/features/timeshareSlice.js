import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  loadingTimeshare: false,
  loadingUpdate: false,
  error: "",
  dataTimeshareList: "",
};

export const getTimeshareForGuest = createAsyncThunk(
  "timeshare/getTimeshareForGuest",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/timeshares/guest`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTimeshareForInvestor = createAsyncThunk(
  "timeshare/getTimeshareForInvestor",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/timeshares/investor`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createTimeshare = createAsyncThunk(
  "timeshare/createTimeshare",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/timeshares`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const changeTimeshareStatus = createAsyncThunk(
  "timeshare/changeTimeshareStatus",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.patch(`/api/timeshares/changeStatus`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const changeSellTimeshareStatus = createAsyncThunk(
  "timeshare/changeSellTimeshareStatus",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.patch(`/api/timeshares/changeSellTimeshareStatus`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const timeshareSlice = createSlice({
  name: "timeshare",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getTimeshareForGuest
    builder.addCase(getTimeshareForGuest.pending, (state) => {
      state.loadingTimeshare = true;
      state.error = "";
    });
    builder.addCase(getTimeshareForGuest.fulfilled, (state, action) => {
      state.loadingTimeshare = false;
      state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(getTimeshareForGuest.rejected, (state, action) => {
      state.loadingTimeshare = false;
      state.error = action.payload;
    });

    //createTimeshare
    builder.addCase(createTimeshare.pending, (state) => {
      state.loadingTimeshare = true;
      state.error = "";
    });
    builder.addCase(createTimeshare.fulfilled, (state, action) => {
      state.loadingTimeshare = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createTimeshare.rejected, (state, action) => {
      state.loadingTimeshare = false;
      state.error = action.payload;
    });

    //getTimeshareForInvestor
    builder.addCase(getTimeshareForInvestor.pending, (state) => {
      state.loadingTimeshare = true;
      state.error = "";
    });
    builder.addCase(getTimeshareForInvestor.fulfilled, (state, action) => {
      state.loadingTimeshare = false;
      state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(getTimeshareForInvestor.rejected, (state, action) => {
      state.loadingTimeshare = false;
      state.error = action.payload;
    });

    //changeTimeshareStatus
    builder.addCase(changeTimeshareStatus.pending, (state) => {
      state.loadingUpdate = true;
      state.error = "";
    });
    builder.addCase(changeTimeshareStatus.fulfilled, (state, action) => {
      state.loadingUpdate = false;
      // state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(changeTimeshareStatus.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    });

    //changeSellTimeshareStatus
    builder.addCase(changeSellTimeshareStatus.pending, (state) => {
      state.loadingUpdate = true;
      state.error = "";
    });
    builder.addCase(changeSellTimeshareStatus.fulfilled, (state, action) => {
      state.loadingUpdate = false;
      // state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(changeSellTimeshareStatus.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    });
  },
});

export default timeshareSlice.reducer;
