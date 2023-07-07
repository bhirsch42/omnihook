import { PropsWithChildren } from "react";

export function SearchResultLabel({ children }: PropsWithChildren) {
  return <div className="text-lg font-bold">=== {children} ===</div>;
}
