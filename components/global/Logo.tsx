import type React from "react";
import { cn } from "@/lib/utils";

type LogoProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  alt?: string;
};

const Logo = ({ alt = "", className, ...props }: LogoProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/nyx-logo.webp"
    alt={alt}
    width={1024}
    height={1024}
    draggable={false}
    className={cn(
      "block aspect-square h-full w-full object-cover dark:invert-0 invert",
      className,
    )}
    {...props}
  />
);

export default Logo;
