"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
  href: string;
  children: React.ReactNode;
}

export const CustomLink: React.FC<Props> = ({
  className,
  href,
  children,
  ...props
}) => {
  const sp = useSearchParams();

  const [searchParams, setSearchParams] = React.useState("");

  const customHref = href + searchParams;

  React.useEffect(() => {
    setSearchParams("?" + sp.toString());
  }, [sp]);

  return (
    <Link href={customHref} className={clsx("", className)} {...props}>
      {children}
    </Link>
  );
};
