import Image from "next/image";
import { withBasePath } from "@/lib/paths";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { width: 48, height: 48, className: "h-10 w-10" },
  md: {
    width: 88,
    height: 88,
    className: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
  },
  lg: { width: 200, height: 200, className: "h-36 w-36 sm:h-44 sm:w-44" },
  hero: {
    width: 360,
    height: 360,
    className: "h-52 w-52 sm:h-64 sm:w-64 md:h-72 md:w-72",
  },
} as const;

export function BrandLogo({
  size = "md",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const dims = SIZES[size];

  return (
    <Image
      src={withBasePath("/logo.png")}
      alt="Scoop's BBQ & Catering"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={`${dims.className} object-contain ${className}`.trim()}
    />
  );
}
