import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { Flex } from "./Flex";

interface Props {
  className?: string;
  count: number | string;
}

export const HotScoreBadge: React.FC<Props> = ({ className, count }) => {
  return (
    <Flex
      className={clsx(
        "bg-gradient-to-tr from-gradientSecondary to-gradientPrimary h-[34px] pl-3 pr-1.5 gap-x-0.5 rounded-full justify-center",
        className,
      )}
    >
      <h3 className="text-white font-semibold text-[20px]">{count}</h3>
      <div className="w-[32px] h-[32px] relative">
        <Image
          src={"/icons/hotWhite.svg"}
          fill
          alt="hot"
          className="translate-y-0.5"
        />
      </div>
    </Flex>
  );
};
