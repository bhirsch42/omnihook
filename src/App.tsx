import { useState } from "react";
import "./App.css";
import { Outlet } from "@tanstack/react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-3 App">
      <div className="text-4xl">Omnihook</div>
      <Outlet />
    </div>
  );
}

export default App;
