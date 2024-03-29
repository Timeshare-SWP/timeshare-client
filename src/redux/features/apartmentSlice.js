import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  apartmentData: null,
  loadingApartment: false,
  error: "",
};

export const createApartment = createAsyncThunk(
  "apartment/createApartment",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/apartments`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllApartmentOfTimeshare = createAsyncThunk(
  "apartment/getAllApartmentOfTimeshare",
  async (timeshare_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(
        `/api/apartments/timeshare/${timeshare_id}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getApartmentById = createAsyncThunk(
  "apartment/getApartmentById",
  async (apartment_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/apartments/${apartment_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteApartment = createAsyncThunk(
  "apartment/deleteApartment",
  async (apartment_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.delete(`/api/apartments/${apartment_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updateApartment = createAsyncThunk(
  "apartment/updateApartment",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.patch(`/api/apartments`, {...data});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);



export const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //createApartment
    builder.addCase(createApartment.pending, (state) => {
      state.loadingApartment = true;
      state.error = "";
    });
    builder.addCase(createApartment.fulfilled, (state, action) => {
      state.loadingApartment = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createApartment.rejected, (state, action) => {
      state.loadingApartment = false;
      state.error = action.payload;
    });

    //getAllApartmentOfTimeshare
    builder.addCase(getAllApartmentOfTimeshare.pending, (state) => {
      state.loadingApartment = true;
      state.error = "";
    });
    builder.addCase(getAllApartmentOfTimeshare.fulfilled, (state, action) => {
      state.loadingApartment = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllApartmentOfTimeshare.rejected, (state, action) => {
      state.loadingApartment = false;
      state.error = action.payload;
    });

    //deleteApartment
    builder.addCase(deleteApartment.pending, (state) => {
      state.loadingApartment = true;
      state.error = "";
    });
    builder.addCase(deleteApartment.fulfilled, (state, action) => {
      state.loadingApartment = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(deleteApartment.rejected, (state, action) => {
      state.loadingApartment = false;
      state.error = action.payload;
    });

    //getApartmentById
    builder.addCase(getApartmentById.pending, (state) => {
      state.loadingApartment = true;
      state.error = "";
    });
    builder.addCase(getApartmentById.fulfilled, (state, action) => {
      state.loadingApartment = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getApartmentById.rejected, (state, action) => {
      state.loadingApartment = false;
      state.error = action.payload;
    });

    //updateApartment
    builder.addCase(updateApartment.pending, (state) => {
      state.loadingApartment = true;
      state.error = "";
    });
    builder.addCase(updateApartment.fulfilled, (state, action) => {
      state.loadingApartment = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(updateApartment.rejected, (state, action) => {
      state.loadingApartment = false;
      state.error = action.payload;
    });


  },
});

export default apartmentSlice.reducer;
