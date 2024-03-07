import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  feedbackData: null,
  loadingFeedback: false,
  error: "",
};

export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/feedbacks`, {...data});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updateFeedback = createAsyncThunk(
  "feedback/updateFeedback",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.put(`/api/feedbacks`, {...data});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "deleteFeedback/deleteFeedback",
  async (feedback_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.delete(`/api/feedbacks?feedback_id=${feedback_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //createFeedback
    builder.addCase(createFeedback.pending, (state) => {
      state.loadingFeedback = true;
      state.error = "";
    });
    builder.addCase(createFeedback.fulfilled, (state, action) => {
      state.loadingFeedback = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createFeedback.rejected, (state, action) => {
      state.loadingFeedback = false;
      state.error = action.payload;
    });

    //updateFeedback
    builder.addCase(updateFeedback.pending, (state) => {
      state.loadingFeedback = true;
      state.error = "";
    });
    builder.addCase(updateFeedback.fulfilled, (state, action) => {
      state.loadingFeedback = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(updateFeedback.rejected, (state, action) => {
      state.loadingFeedback = false;
      state.error = action.payload;
    });

    //deleteFeedback
    builder.addCase(deleteFeedback.pending, (state) => {
      state.loadingFeedback = true;
      state.error = "";
    });
    builder.addCase(deleteFeedback.fulfilled, (state, action) => {
      state.loadingFeedback = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(deleteFeedback.rejected, (state, action) => {
      state.loadingFeedback = false;
      state.error = action.payload;
    });
    
  },
});

export default feedbackSlice.reducer;
