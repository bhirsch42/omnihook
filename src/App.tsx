import "./App.css";
import { Outlet } from "@tanstack/react-router";
import { selectActivePilotSafe } from "./store/pilotsSlice";
import { useAppSelector } from "./store/hooks";
import { Pilots } from "./pages/Pilots.page";

function App() {
  const pilot = useAppSelector(selectActivePilotSafe);

  return <div className="p-3 App">{pilot ? <Outlet /> : <Pilots />}</div>;
}

export default App;
