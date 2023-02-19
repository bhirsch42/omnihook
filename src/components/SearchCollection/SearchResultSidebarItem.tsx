export function SearchResultSidebarItem({
  item,
}: {
  item: { name: string; id: string };
}) {
  return (
    <a className="block" href={`#${item.id}`}>
      {item.name}
    </a>
  );
}
