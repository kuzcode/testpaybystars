import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const SkeletonWrapper: React.FC<Props> = ({ className, children }) => {
  return <div className={clsx("space-y-3", className)}>{children}</div>;
};
