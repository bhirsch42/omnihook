import { configureStore, Middleware } from "@reduxjs/toolkit";
import { pilotsReducer } from "./pilots";
import { encountersReducer } from "./encounters";

const LOCAL_STORAGE_KEY = "omnihook-data";

const localStorageJson = localStorage.getItem(LOCAL_STORAGE_KEY);

const persistedState = localStorageJson ? JSON.parse(localStorageJson) : {};

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getState()));
    return returnValue;
  };
};

export const store = configureStore({
  reducer: {
    pilots: pilotsReducer,
    encounters: encountersReducer,
  },
  preloadedState: persistedState as any,
  middleware: [localStorageMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
