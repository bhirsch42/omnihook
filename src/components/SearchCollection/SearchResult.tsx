import { PropsWithChildren } from "react";

export function SearchResult({
  children,
  className,
  id,
}: PropsWithChildren<{ className?: string; id: string }>) {
  return (
    <div className={`${className} pt-2`} id={id}>
      <div className="bg-bgcolor-800 p-3">{children}</div>
    </div>
  );
}
