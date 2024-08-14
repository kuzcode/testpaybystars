import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const AnimatedButtonWrapper: React.FC<Props> = ({ children }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <div
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => {
        const timer = setTimeout(() => {
          setIsClicked(false);
          clearTimeout(timer);
        }, 200);
      }}
      className={clsx("transition-all duration-300", {
        "scale-[0.9]": isClicked,
        "scale-[1]": !isClicked,
      })}
    >
      {children}
    </div>
  );
};
