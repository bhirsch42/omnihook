export function UnspentPoints({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  if (count === 0) return null;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-sm whitespace-nowrap">
        Unspent points:
        <span className="ml-2 font-bold">{count}</span>
      </div>
      <div className="w-3 h-3 ml-2 bg-red-500 rounded-full"></div>
    </div>
  );
}
