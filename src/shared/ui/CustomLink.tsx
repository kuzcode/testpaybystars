"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useCustomHref } from "../hooks/useCustomHref";

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
  const customHref = useCustomHref(href);

  return (
    <Link href={customHref} className={clsx("", className)} {...props}>
      {children}
    </Link>
  );
};
