import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  provinceData: null,
  loadingProvince: false,
  error: "",
};

export const getPublicProvinces = createAsyncThunk(
  "province/getPublicProvinces",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://vapi.vnappmob.com/api/province/"
      );

      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getPublicDistrict = createAsyncThunk(
  "province/getPublicProvinces",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${79}`
      );

      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getPublicWard = createAsyncThunk(
  "province/getPublicProvinces",
  async (districtId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${districtId}`
      );

      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getPublicProvinces
    builder.addCase(getPublicProvinces.pending, (state) => {
      state.provinceData = true;
      state.error = "";
    });
    builder.addCase(getPublicProvinces.fulfilled, (state, action) => {
      state.loadingFeedback = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getPublicProvinces.rejected, (state, action) => {
      state.loadingFeedback = false;
      state.error = action.payload;
    });

    //getPublicDistrict
    builder.addCase(getPublicDistrict.pending, (state) => {
      state.provinceData = true;
      state.error = "";
    });
    builder.addCase(getPublicDistrict.fulfilled, (state, action) => {
      state.loadingFeedback = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getPublicDistrict.rejected, (state, action) => {
      state.loadingFeedback = false;
      state.error = action.payload;
    });

    //getPublicWard
    builder.addCase(getPublicWard.pending, (state) => {
      state.provinceData = true;
      state.error = "";
    });
    builder.addCase(getPublicWard.fulfilled, (state, action) => {
      state.loadingFeedback = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getPublicWard.rejected, (state, action) => {
      state.loadingFeedback = false;
      state.error = action.payload;
    });
  },
});

export default provinceSlice.reducer;
