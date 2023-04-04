import { configureStore, Middleware } from "@reduxjs/toolkit";
import { pilotsReducer } from "./pilots";
import { encountersReducer } from "./encounters";
import { npcsReducer } from "./npcs";
import { collectionsReducer } from "./collections";

const LOCAL_STORAGE_KEY = "omnihook-data";

const localStorageJson = localStorage.getItem(LOCAL_STORAGE_KEY);

const persistedState = localStorageJson ? JSON.parse(localStorageJson) : {};

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    const state = getState();
    delete state.collections;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    return returnValue;
  };
};

export const store = configureStore({
  reducer: {
    pilots: pilotsReducer,
    encounters: encountersReducer,
    npcs: npcsReducer,
    collections: collectionsReducer,
  },
  // preloadedState: persistedState as any,
  // middleware: [localStorageMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
