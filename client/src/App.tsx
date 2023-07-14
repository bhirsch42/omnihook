import "./App.scss";
import { Outlet } from "@tanstack/react-router";
import { useAppDispatch } from "./store/hooks";
import { loadLancerData } from "./store/collections";
import rawLancerData from "lancer-data";
import { useDebug } from "./debug";
import { once } from "ramda";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

const loadData = once(async (dispatch: Dispatch<AnyAction>) => {
  dispatch(loadLancerData(rawLancerData));

  if (import.meta.env.DEV) {
    dispatch(
      loadLancerData((await import("./data/dev__npcData")).dev__rawNpcData)
    );
  }
});

function App() {
  const dispatch = useAppDispatch();
  loadData(dispatch);
  useDebug();

  return (
    <div className="p-3 App">
      <Outlet />
    </div>
  );
}

export default App;
