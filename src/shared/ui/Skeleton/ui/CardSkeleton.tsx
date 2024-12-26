import clsx from "clsx";
import React from "react";

import { Card } from "../../Card";

interface Props {
  className?: string;
  height: number;
  type?: "dismissible" | "card";
}

export const CardSkeleton: React.FC<Props> = ({
  className,
  height,
  type = "card",
}) => {
  return (
    <Card
      style={{ height: `${height}px` }}
      className={clsx("animate-pulse !bg-primary/5", className, {
        "!rounded-[25px]": type === "dismissible",
      })}
    />
  );
};
