export function UserText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const blocks = text.split("<br>");

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        return (
          <p
            className="mb-1 last:mb-0"
            key={i}
            dangerouslySetInnerHTML={{ __html: block }}
          />
        );
      })}
    </div>
  );
}
