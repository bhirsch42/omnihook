import { ReactNode } from "react";
import { Collection } from "../../data/lancerData";

export type SearchResultsProps<T> = {
  query: string;
  collection: Collection<T>;
  renderItem: (item: T) => React.ReactNode;
  label?: ReactNode;
  className?: string;
};

export function SearchResults<T>({
  query,
  collection,
  renderItem,
  label,
  className,
}: SearchResultsProps<T>) {
  const items = query === "" ? collection.all : collection.search(query);

  return items.length > 0 ? (
    <div className={className}>
      {label && <div className="mb-3">{label}</div>}
      {items.map(renderItem)}
    </div>
  ) : null;
}
