import { PropsWithChildren } from "react";

export function SearchResult({
  children,
  className,
  id,
}: PropsWithChildren<{ className?: string; id: string }>) {
  return (
    <div
      id={id}
      className={`bg-bgcolor-800 p-3 mt-2 scroll-mt-2 ${className}`}
      style={{ scrollPaddingBlockStart: "1rem" }}
    >
      {children}
    </div>
  );
}
