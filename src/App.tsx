import "./App.css";
import { Outlet } from "@tanstack/react-router";
import { selectActivePilotSafe } from "./store/pilotsSlice";
import { useAppSelector } from "./store/hooks";
import { Pilots } from "./pages/Pilots.page";
import { WindowManager } from "./components/WindowManager";

function App() {
  const pilot = useAppSelector(selectActivePilotSafe);

  return (
    <div className="p-3 App">
      {pilot ? (
        <WindowManager>
          <Outlet />
        </WindowManager>
      ) : (
        <Pilots />
      )}
    </div>
  );
}

export default App;
