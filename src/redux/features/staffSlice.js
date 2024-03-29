import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  supportData: null,
  loadingStaff: false,
  error: "",
};

export const viewAllStaff = createAsyncThunk(
  "staff/viewAllStaff",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/users/staffs`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);


export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //viewAllStaff
    builder.addCase(viewAllStaff.pending, (state) => {
      state.loadingStaff = true;
      state.error = "";
    });
    builder.addCase(viewAllStaff.fulfilled, (state, action) => {
      state.loadingStaff = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(viewAllStaff.rejected, (state, action) => {
      state.loadingStaff = false;
      state.error = action.payload;
    });
  },
});

export default staffSlice.reducer;
