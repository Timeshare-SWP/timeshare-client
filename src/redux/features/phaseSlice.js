import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  phaseData: null,
  loadingPhase: false,
  error: "",
};

export const createPhase = createAsyncThunk(
  "phase/createPhase",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/phases`, {...data});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updatePhase = createAsyncThunk(
  "phase/updatePhase",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.put(`/api/phases`, {...data});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const phaseSlice = createSlice({
  name: "phase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //createPhase
    builder.addCase(createPhase.pending, (state) => {
      state.loadingPhase = true;
      state.error = "";
    });
    builder.addCase(createPhase.fulfilled, (state, action) => {
      state.loadingPhase = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createPhase.rejected, (state, action) => {
      state.loadingPhase = false;
      state.error = action.payload;
    });

    //updatePhase
    builder.addCase(updatePhase.pending, (state) => {
      state.loadingPhase = true;
      state.error = "";
    });
    builder.addCase(updatePhase.fulfilled, (state, action) => {
      state.loadingPhase = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(updatePhase.rejected, (state, action) => {
      state.loadingPhase = false;
      state.error = action.payload;
    });


    
  },
});

export default phaseSlice.reducer;
