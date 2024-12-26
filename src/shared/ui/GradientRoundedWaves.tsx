import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const GradientRoundedWaves: React.FC<Props> = ({
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "w-[180px] h-[180px] border border-primary/40 rounded-full flex items-center justify-center mx-auto",
        className,
      )}
    >
      <div className="w-[155px] h-[155px] border border-primary rounded-full flex items-center justify-center">
        <div className="w-[130px] h-[130px] relative">{children}</div>
      </div>
    </div>
  );
};
