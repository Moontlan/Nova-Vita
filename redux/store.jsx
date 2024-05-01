import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./institucionSlice.jsx";

export const store = configureStore({
  reducer: {
    institucion: userReducer,
  },
});