import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const ModalTitle: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx("font-bold text-[24px]", className)}>{children}</div>
  );
};
