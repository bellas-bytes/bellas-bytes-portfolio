import type { ComponentType } from "react";
import type { IconType } from "react-icons";

type Props = {
  icon: IconType;
  className?: string;
};

// react-icons v5 declares IconType return as ReactNode, which clashes
// with React 19's stricter JSX.Element. Cast the icon to ComponentType
// once here so callers can keep using <Icon icon={...} /> ergonomically.
export function Icon({ icon, className }: Props) {
  const Cmp = icon as unknown as ComponentType<{ className?: string }>;
  return <Cmp className={className} />;
}
