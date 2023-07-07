import "./App.scss";
import { Outlet } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ChoosePilot } from "./pages/ChoosePilot.page";
import { WindowManager } from "./components/WindowManager";
import { selectActivePilotSafe } from "./store/pilots/selectors/selectActivePilotSafe";
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

  const pilot = useAppSelector(selectActivePilotSafe);

  return (
    <div className="p-3 App">
      {pilot ? (
        <WindowManager>
          <Outlet />
        </WindowManager>
      ) : (
        <ChoosePilot />
      )}
    </div>
  );
}

export default App;
