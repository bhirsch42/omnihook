import { Background } from "../schemas/lancerData/background.schema";

export function BackgroundView({
  background,
  className,
}: {
  background: Background;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-lg font-bold">{background.name}</div>
      <div dangerouslySetInnerHTML={{ __html: background.description }}></div>
    </div>
  );
}
