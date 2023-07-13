import "./App.scss";
import { Outlet } from "@tanstack/react-router";
import { useAppDispatch } from "./store/hooks";
import { loadLancerData } from "./store/collections";
import rawLancerData from "lancer-data";
import { useDebug } from "./debug";
import { once } from "ramda";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { axiosClient } from "./axiosClient";

const loadData = once(async (dispatch: Dispatch<AnyAction>) => {
  dispatch(loadLancerData(rawLancerData));

  if (import.meta.env.DEV) {
    dispatch(
      loadLancerData((await import("./data/dev__npcData")).dev__rawNpcData)
    );
  }
});

const queryClient = new QueryClient();

const SessionManager: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["login"],
    queryFn: () => axiosClient.get("/protected"),
  });

  console.log({ isLoading, error, data });

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

function App() {
  const dispatch = useAppDispatch();
  loadData(dispatch);
  useDebug();

  return (
    <div className="p-3 App">
      <QueryClientProvider client={queryClient}>
        <SessionManager>
          <Outlet />
        </SessionManager>
      </QueryClientProvider>
    </div>
  );
}

export default App;
