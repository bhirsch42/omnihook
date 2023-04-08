import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch, AppThunk } from ".";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch<
  ThunkDispatch<RootState, never, AnyAction>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
