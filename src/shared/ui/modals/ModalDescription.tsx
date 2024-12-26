import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  main: React.JSX.Element;
  span: React.JSX.Element;
  children: React.ReactNode;
}

export const ModalDescription: React.FC<Props> = ({
  className,
  main,
  span,
  children,
}) => {
  return (
    <p className={clsx("mx-auto text-textPrimary max-w-[250px]", className)}>
      {main}
      <span className="inline-flex items-center">
        <span className="mx-1 font-bold text-[#000] text-[17px]">{span}</span>
        {children}
      </span>
    </p>
  );
};
