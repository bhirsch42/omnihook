import {
  AnyAction,
  configureStore,
  Middleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { pilotsReducer } from "./pilots";
import { encountersReducer } from "./encounters";
import { npcDataSelectors, npcsReducer, npcUpdated } from "./npcData";
import { collectionsReducer } from "./collections";
import { INITIAL_STATE as INITIAL_COLLECTIONS_STATE } from "./collections";
import { omit } from "ramda";
import { mechStatusesReducer } from "./mechStatuses";

const LOCAL_STORAGE_KEY = "omnihook-data";

function loadStateFromLocalStorage() {
  const localStorageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const state = (localStorageJson ? JSON.parse(localStorageJson) : {}) as any;
  return { ...state, collections: INITIAL_COLLECTIONS_STATE };
}

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    const state = getState();
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(omit(["collections"], state))
    );
    return returnValue;
  };
};

export const store = configureStore({
  reducer: {
    pilots: pilotsReducer,
    encounters: encountersReducer,
    npcData: npcsReducer,
    collections: collectionsReducer,
    mechStatuses: mechStatusesReducer,
  },
  preloadedState: loadStateFromLocalStorage() as any,
  middleware: [localStorageMiddleware],
});

export type AppGetState = typeof store.getState;
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
