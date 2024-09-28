"use client";

import React from "react";
import { Card } from "@/shared/ui/Card";
import { Flex } from "@/shared/ui/Flex";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export const WalletCard = () => {
  const { t } = useTranslation();
  return (
    <Card className="flex items-center justify-between border border-black/[18%] !bg-white !py-3 rounded-[25px]">
      <Flex className="gap-x-4">
        <Image
          src={"/icons/hotPlus.svg"}
          width={48}
          height={48}
          alt="hot-plus"
          className="translate-y-0.5"
        />
        <div>
          <h3 className="font-bold text-black text-[27px]">12,000</h3>
          <h5 className="text-[#CCCCCC] font-semibold text-[13px] -translate-y-1.5">
            $ 0.05 {t("perItem")}
          </h5>
        </div>
      </Flex>
      <div className="bg-gradient-to-b from-gradientPrimary to-gradientSecondary text-white h-[48px] rounded-[14px] w-[100px] flex items-center justify-center font-semibold text-[18px]">
        $ 5,000
      </div>
    </Card>
  );
};
