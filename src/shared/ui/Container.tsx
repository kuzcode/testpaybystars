import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return <div className={clsx("px-4", className)}>{children}</div>;
};
