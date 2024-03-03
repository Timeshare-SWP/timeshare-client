import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import timeshareReducer from "./features/timeshareSlice";
import notificationReducer from "./features/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    timeshare: timeshareReducer,
    notification: notificationReducer
  },
});
