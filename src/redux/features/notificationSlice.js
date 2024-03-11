import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  notificationData: null,
  loadingNoti: false,
  error: "",
};

export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/notifications`, {...data});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const viewAllNotifications = createAsyncThunk(
  "notification/viewAllNotifications",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/notifications`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const markAllNotifications = createAsyncThunk(
  "notification/markAllNotifications",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.patch(`/api/notifications/readAll`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const markSelectedNotification = createAsyncThunk(
  "notification/markSelectedNotification",
  async (notiId, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.patch(`/api/notifications/read?notification_id=${notiId}`);

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
    //createNotification
    builder.addCase(createNotification.pending, (state) => {
      state.loadingNoti = true;
      state.error = "";
    });
    builder.addCase(createNotification.fulfilled, (state, action) => {
      state.loadingNoti = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createNotification.rejected, (state, action) => {
      state.loadingNoti = false;
      state.error = action.payload;
    });

    //viewAllNotifications
    builder.addCase(viewAllNotifications.pending, (state) => {
      state.loadingNoti = true;
      state.error = "";
    });
    builder.addCase(viewAllNotifications.fulfilled, (state, action) => {
      state.loadingNoti = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(viewAllNotifications.rejected, (state, action) => {
      state.loadingNoti = false;
      state.error = action.payload;
    });

    //markAllNotifications
    builder.addCase(markAllNotifications.pending, (state) => {
      state.loadingNoti = true;
      state.error = "";
    });
    builder.addCase(markAllNotifications.fulfilled, (state, action) => {
      state.loadingNoti = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(markAllNotifications.rejected, (state, action) => {
      state.loadingNoti = false;
      state.error = action.payload;
    });

    //markSelectedNotification
    builder.addCase(markSelectedNotification.pending, (state) => {
      state.loadingNoti = true;
      state.error = "";
    });
    builder.addCase(markSelectedNotification.fulfilled, (state, action) => {
      state.loadingNoti = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(markSelectedNotification.rejected, (state, action) => {
      state.loadingNoti = false;
      state.error = action.payload;
    });

    
  },
});

export default notificationSlice.reducer;
