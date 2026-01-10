import React, { useEffect, useState, Suspense } from "react";

const iconLibraries: Record<string, () => Promise<any>> = {
  Ai: () => import("react-icons/ai"),
  Bs: () => import("react-icons/bs"),
  Bi: () => import("react-icons/bi"),
  Ci: () => import("react-icons/ci"),
  Di: () => import("react-icons/di"),
  Fi: () => import("react-icons/fi"),
  Fa: () => import("react-icons/fa"),
  Fc: () => import("react-icons/fc"),
  Gi: () => import("react-icons/gi"),
  Go: () => import("react-icons/go"),
  Hi: () => import("react-icons/hi"),
  Hi2: () => import("react-icons/hi2"),
  Im: () => import("react-icons/im"),
  Io: () => import("react-icons/io"),
  Io5: () => import("react-icons/io5"),
  Lu: () => import("react-icons/lu"),
  Md: () => import("react-icons/md"),
  Ri: () => import("react-icons/ri"),
  Si: () => import("react-icons/si"),
  Sl: () => import("react-icons/sl"),
  Tb: () => import("react-icons/tb"),
  Ti: () => import("react-icons/ti"),
  Vsc: () => import("react-icons/vsc"),
  Wi: () => import("react-icons/wi"),
};

type NamedIconProps = {
  name: string; // e.g., HiAdjustmentsHorizontal
  size?: number;
  color?: string;
};

export const NamedIcon: React.FC<NamedIconProps> = ({ name, size = 16, color }) => {
  const [IconComponent, setIconComponent] = useState<React.FC<any> | null>(null);
  console.log("🚀 ~ NamedIcon ~ name:", name)

  useEffect(() => {
    const prefix = Object.keys(iconLibraries).find((p) => name.startsWith(p));
    console.log("🚀 ~ NamedIcon ~ prefix:", prefix)
    if (!prefix) return;

    iconLibraries[prefix]().then((mod) => {
      const Icon = mod[name];
      setIconComponent(() => Icon || null);
    });
  }, [name]);

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />;
};