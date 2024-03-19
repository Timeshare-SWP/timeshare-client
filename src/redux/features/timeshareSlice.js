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

export const getTimeshareById = createAsyncThunk(
  "timeshare/getTimeshareById",
  async (timeshare_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/timeshares/:${timeshare_id}`);
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

export const createTimeshareImage = createAsyncThunk(
  "timeshare/createTimeshareImage",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/timeshares/timeshare_image`, {
        ...data,
      });

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

      const response = await instance.patch(`/api/timeshares/changeStatus`, {
        ...data,
      });

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

      const response = await instance.patch(
        `/api/timeshares/changeSellTimeshareStatus`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTimeshare = createAsyncThunk(
  "timeshare/deleteTimeshare",
  async (timeshare_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.delete(`/api/timeshares/${timeshare_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const buyTimeshare = createAsyncThunk(
  "timeshare/buyTimeshare",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/transactions/buyTimeshare`, {
        ...data,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const confirmSellTimeshare = createAsyncThunk(
  "timeshare/confirmSellTimeshare",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.patch(
        `/api/transactions/confirmSellTimeshare`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const searchTimeshareByName = createAsyncThunk(
  "timeshare/searchTimeshareByName",
  async (searchName, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(
        `/api/timeshares/search?searchName=${searchName}`
      );

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

    //getTimeshareById
    builder.addCase(getTimeshareById.pending, (state) => {
      state.loadingTimeshare = true;
      state.error = "";
    });
    builder.addCase(getTimeshareById.fulfilled, (state, action) => {
      state.loadingTimeshare = false;
      state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(getTimeshareById.rejected, (state, action) => {
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

    //createTimeshareImage
    builder.addCase(createTimeshareImage.pending, (state) => {
      state.loadingTimeshare = true;
      state.error = "";
    });
    builder.addCase(createTimeshareImage.fulfilled, (state, action) => {
      state.loadingTimeshare = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createTimeshareImage.rejected, (state, action) => {
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

    //deleteTimeshare
    builder.addCase(deleteTimeshare.pending, (state) => {
      state.loadingUpdate = true;
      state.error = "";
    });
    builder.addCase(deleteTimeshare.fulfilled, (state, action) => {
      state.loadingUpdate = false;
      // state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(deleteTimeshare.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    });

    //buyTimeshare
    builder.addCase(buyTimeshare.pending, (state) => {
      state.loadingUpdate = true;
      state.error = "";
    });
    builder.addCase(buyTimeshare.fulfilled, (state, action) => {
      state.loadingUpdate = false;
      // state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(buyTimeshare.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    });

    //confirmSellTimeshare
    builder.addCase(confirmSellTimeshare.pending, (state) => {
      state.loadingUpdate = true;
      state.error = "";
    });
    builder.addCase(confirmSellTimeshare.fulfilled, (state, action) => {
      state.loadingUpdate = false;
      // state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(confirmSellTimeshare.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    });

    //searchTimeshareByName
    builder.addCase(searchTimeshareByName.pending, (state) => {
      state.loadingUpdate = true;
      state.error = "";
    });
    builder.addCase(searchTimeshareByName.fulfilled, (state, action) => {
      state.loadingUpdate = false;
      // state.dataTimeshareList = action.payload;
      state.error = "";
    });
    builder.addCase(searchTimeshareByName.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    });
  },
});

export default timeshareSlice.reducer;
