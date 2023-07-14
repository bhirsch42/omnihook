import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "./axiosClient";
import React from "react";

type User = {
  id: string;
  username: string;
};

const SessionContext = React.createContext<{ user: User | null }>({
  user: null,
});

export const SessionManager: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["login"],
    queryFn: () =>
      axiosClient.get("/login").then((res) => {
        // console.log("login/", res.data);
        return res;
      }),
  });

  return (
    <SessionContext.Provider value={{ user: null }}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSession() {
  return React.useContext(SessionContext);
}
