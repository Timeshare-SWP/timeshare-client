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

      const response = await instance.post(`/api/phases`, { ...data });

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

      const response = await instance.put(`/api/phases`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deletePhase = createAsyncThunk(
  "phase/deletePhase",
  async (phase_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.delete(`/api/phases/${phase_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getPhaseByContractId = createAsyncThunk(
  "phase/getPhaseByContractId",
  async (contract_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/phases/${contract_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createPaymentUrlForPhase = createAsyncThunk(
  "phase/createPaymentUrlForPhase",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/vnpays/create_payment_url`, {
        ...data,
      });

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

    //deletePhase
    builder.addCase(deletePhase.pending, (state) => {
      state.loadingPhase = true;
      state.error = "";
    });
    builder.addCase(deletePhase.fulfilled, (state, action) => {
      state.loadingPhase = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(deletePhase.rejected, (state, action) => {
      state.loadingPhase = false;
      state.error = action.payload;
    });

    //getPhaseByContractId
    builder.addCase(getPhaseByContractId.pending, (state) => {
      state.loadingPhase = true;
      state.error = "";
    });
    builder.addCase(getPhaseByContractId.fulfilled, (state, action) => {
      state.loadingPhase = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getPhaseByContractId.rejected, (state, action) => {
      state.loadingPhase = false;
      state.error = action.payload;
    });

    //createPaymentUrlForPhase
    builder.addCase(createPaymentUrlForPhase.pending, (state) => {
      state.loadingPhase = true;
      state.error = "";
    });
    builder.addCase(createPaymentUrlForPhase.fulfilled, (state, action) => {
      state.loadingPhase = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createPaymentUrlForPhase.rejected, (state, action) => {
      state.loadingPhase = false;
      state.error = action.payload;
    });
  },
});

export default phaseSlice.reducer;
