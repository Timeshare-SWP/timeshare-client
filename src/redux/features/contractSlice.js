import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstanceWithToken } from "../utils/https";

const initialState = {
  contractData: null,
  loadingContract: false,
  error: "",
};

export const getContractByTransactionId = createAsyncThunk(
  "contract/getContractByTransactionId",
  async (transaction_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/contracts/${transaction_id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllContractStatusByContractId = createAsyncThunk(
  "contract/getAllContractStatusByContractId",
  async (contract_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(`/api/contracts/contractStatus/${contract_id}`);

      return response.data;
    } catch (error) { 
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createContractImage = createAsyncThunk(
  "contract/createContractImage",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/contracts/contractImage`, {
        ...data,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createContract = createAsyncThunk(
  "contract/createContract",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.post(`/api/contracts`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updateContract = createAsyncThunk(
  "contract/updateContract",
  async (data, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.put(`/api/contracts`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const confirmContractByCustomer = createAsyncThunk(
  "contract/confirmContractByCustomer",
  async (contract_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.patch(
        `/api/contracts/confirmContract?contract_id=${contract_id}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const checkTimeshareHaveContract = createAsyncThunk(
  "contract/checkTimeshareHaveContract",
  async (timeshare_id, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(
        `api/contracts/checkTimeshareHaveContract?timeshare_id=${timeshare_id}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const checkAllTransactionHaveContract = createAsyncThunk(
  "contract/checkAllTransactionHaveContract",
  async (_, thunkAPI) => {
    try {
      const instance = getInstanceWithToken();

      const response = await instance.get(
        `/api/contracts/checkAllTransactionHaveContract`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);


export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getContractByTransactionId
    builder.addCase(getContractByTransactionId.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(getContractByTransactionId.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getContractByTransactionId.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });

    //createContractImage
    builder.addCase(createContractImage.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(createContractImage.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createContractImage.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });

    //createContract
    builder.addCase(createContract.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(createContract.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createContract.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });
    
    //updateContract
    builder.addCase(updateContract.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(updateContract.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(updateContract.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });

    //confirmContractByCustomer
    builder.addCase(confirmContractByCustomer.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(confirmContractByCustomer.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(confirmContractByCustomer.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });

    //getAllContractStatusByContractId
    builder.addCase(getAllContractStatusByContractId.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(getAllContractStatusByContractId.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllContractStatusByContractId.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });

    //checkTimeshareHaveContract
    builder.addCase(checkTimeshareHaveContract.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(checkTimeshareHaveContract.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(checkTimeshareHaveContract.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });

    //checkAllTransactionHaveContract
    builder.addCase(checkAllTransactionHaveContract.pending, (state) => {
      state.loadingContract = true;
      state.error = "";
    });
    builder.addCase(checkAllTransactionHaveContract.fulfilled, (state, action) => {
      state.loadingContract = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(checkAllTransactionHaveContract.rejected, (state, action) => {
      state.loadingContract = false;
      state.error = action.payload;
    });

  },
});

export default contractSlice.reducer;
