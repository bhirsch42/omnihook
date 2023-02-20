import { Background } from "../schemas/lancerData/background.schema";

export function BackgroundView({
  background,
  className,
}: {
  background: Background;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-6" id={background.id}></div>
      <div className="text-lg font-bold">{background.name}</div>
      <div dangerouslySetInnerHTML={{ __html: background.description }}></div>
    </div>
  );
}
