import { Background } from "../schemas/lancerData/background.schema";
import { UserText } from "./UserText";

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
      <UserText text={background.description} />
    </div>
  );
}
