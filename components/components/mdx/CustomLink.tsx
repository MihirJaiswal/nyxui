import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type CustomLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

export const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};
