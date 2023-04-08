export function TieredSizeView({
  tieredSize,
  className,
}: {
  tieredSize: number[][];
  className?: string;
}) {
  return (
    <div
      className={`flex text-sm font-medium rounded-lg overflow-hidden my-1 ${className}`}
    >
      {tieredSize.map((sizes, i) => (
        <div className="flex flex-col mr-0.5 last:mr-0" key={i}>
          {sizes.map((size, j) => (
            <div
              className="bg-bgcolor-700 h-4 px-2 flex items-center justify-center text-center mb-0.5 last:mb-0 w-8"
              key={j}
            >
              {size.toString().replace("0.", ".")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
