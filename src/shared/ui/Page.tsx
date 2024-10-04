import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  disableHeightLimit?: boolean;
  children: React.ReactNode;
}

export const Page: React.FC<Props> = ({
  className,
  disableHeightLimit = false,
  children,
}) => {
  return (
    <div
      className={clsx(
        "w-screen bg-gradient-to-b from-[#FFFFFF] to-[#F5F4F9]",
        className,
        {
          "h-screen": !disableHeightLimit,
          "!pb-8": disableHeightLimit,
        }
      )}
    >
      {children}
    </div>
  );
};
