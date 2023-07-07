import { PropsWithChildren } from "react";

export function WindowViewLabel({ children }: PropsWithChildren) {
  return (
    <div className="absolute -top-6 -left-1 bg-bgcolor-400 text-bgcolor-900 font-bold pl-3 pr-8 clip-tr cursor-move">
      {children}
    </div>
  );
}
