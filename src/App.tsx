import "./App.css";
import { Outlet } from "@tanstack/react-router";
import { useAppSelector } from "./store/hooks";
import { ChoosePilot } from "./pages/ChoosePilot.page";
import { WindowManager } from "./components/WindowManager";
import { selectActivePilotSafe } from "./store/pilots/selectors/selectActivePilotSafe";

function App() {
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
