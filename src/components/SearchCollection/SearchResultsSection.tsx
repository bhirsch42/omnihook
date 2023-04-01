import { ReactNode } from "react";
import { Collection } from "../../utils/collection";

export type SearchResultsSectionProps<T> = {
  query: string;
  collection: Collection<T>;
  renderItem: (item: T) => React.ReactNode;
  label?: ReactNode;
  className?: string;
};

export function SearchResultsSection<T>({
  query,
  collection,
  renderItem,
  label,
  className,
}: SearchResultsSectionProps<T>) {
  const items = query === "" ? collection.all() : collection.search(query);

  return items.length > 0 ? (
    <div className={className}>
      {label && <div className="mb-3">{label}</div>}
      {items.map(renderItem)}
    </div>
  ) : null;
}
