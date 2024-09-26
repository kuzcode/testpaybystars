import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        "p-4 border border-[#000000] bg-white border-opacity-[18%] rounded-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};
