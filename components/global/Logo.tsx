import * as React from "react";
import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = Omit<ImageProps, "src" | "alt"> & {
  alt?: string;
};

const Logo = ({ alt = "", className, ...props }: LogoProps) => (
  <Image
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
