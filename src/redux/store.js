import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import timeshareReducer from "./features/timeshareSlice";
import notificationReducer from "./features/notificationSlice";
import reservedPlaceReducer from "./features/reservedPlaceSlice";
import transactionReducer from "./features/transactionSlice";
import contractReducer from "./features/contractSlice";
import phaseReducer from "./features/phaseSlice";
import feedbackReducer from "./features/feedbackSlice";
import supportReducer from "./features/supportSlice";
import apartmentReducer from "./features/apartmentSlice";
import staffReducer from "./features/staffSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    timeshare: timeshareReducer,
    notification: notificationReducer,
    reservedPlace: reservedPlaceReducer,
    transaction: transactionReducer,
    contract: contractReducer,
    phase: phaseReducer,
    feedback: feedbackReducer,
    support: supportReducer,
    apartment: apartmentReducer,
    staff: staffReducer
  },
});
