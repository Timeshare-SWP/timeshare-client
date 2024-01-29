import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import timeshareReducer from "./features/timeshareSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    timeshare: timeshareReducer
  },
});
