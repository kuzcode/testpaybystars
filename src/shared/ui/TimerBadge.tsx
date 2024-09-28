"use client";

import React from "react";
import { Flex } from "./Flex";
import Image from "next/image";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
}

export const TimerBadge: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <Flex
      className={clsx(
        "bg-gradient-to-b from-gradientSecondary to-gradientPrimary w-fit py-1 px-3 gap-x-2 rounded-full",
        className
      )}
    >
      <Image src={"/icons/clock.svg"} width={24} height={24} alt="clock" />
      <p className="text-white font-semibold text-[16px] whitespace-nowrap">
        2{t("d")} 10{t("h")}
      </p>
    </Flex>
  );
};
