"use client";

import { useProfile } from "@/shared/store/useProfile";
import { Flex } from "@/shared/ui/Flex";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  const { profile } = useProfile();
  const fires = profile?.fires || 0;

  return (
    <Flex className="justify-between !items-start mb-4">
      <div>
        <h3 className="text-[#857889]">{t("yourBalance")}</h3>
        <Flex className="gap-x-2">
          <h3 className="font-bold text-[26px]">{fires}</h3>
          <GradientHotIcon />
        </Flex>
        <h3 className="text-[#857889]">{t("from").toLowerCase()} 100,000</h3>
      </div>
      <div className="text-right">
        <h3 className="text-[#857889]">{t("rate")}</h3>
        <Flex className="gap-x-2">
          <h3 className="font-bold text-[26px]">50%</h3>
          <div className="relative">
            <Image
              src={"/icons/blackRoundedInfo.svg"}
              width={25}
              height={25}
              alt="hot"
            />
            <div className="bg-tooltip absolute top-0 left-0 translate-y-[75%] -translate-x-[78%] z-[99] text-white w-[180px] h-[50px] flex items-center text-center px-3 text-[12px] rounded-lg">
              <h3 className="relative z-[10] bg-tooltip">{t("rateTooltip")}</h3>
              <div className="absolute top-0 right-[17px] rounded-[2px] rotate-45 w-5 h-5 bg-tooltip z-[1] -translate-y-[4px]" />
            </div>
          </div>
        </Flex>
      </div>
    </Flex>
  );
};
