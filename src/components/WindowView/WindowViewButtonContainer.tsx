import { PropsWithChildren } from "react";

export function WindowViewButtonContainer({ children }: PropsWithChildren) {
  return (
    <div className="absolute top-0 right-0 bg-bgcolor-400 text-bgcolor-900 font-bold pl-6 pr-1 clip-bl items-center pb-1 grid gap-2 grid-cols-2">
      {children}
    </div>
  );
}
