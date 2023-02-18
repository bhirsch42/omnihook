import { configureStore } from "@reduxjs/toolkit";
import { pilotsReducer } from "./pilotsSlice";

export const store = configureStore({
  reducer: {
    pilots: pilotsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
