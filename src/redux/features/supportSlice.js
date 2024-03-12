import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  supportData: null,
  loadingSupport: false,
  error: "",
};

export const createSupport = createAsyncThunk(
  "support/createSupport",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/supports`, {...data});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);


export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //createSupport
    builder.addCase(createSupport.pending, (state) => {
      state.loadingSupport = true;
      state.error = "";
    });
    builder.addCase(createSupport.fulfilled, (state, action) => {
      state.loadingSupport = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createSupport.rejected, (state, action) => {
      state.loadingSupport = false;
      state.error = action.payload;
    });

   
    
  },
});

export default supportSlice.reducer;
