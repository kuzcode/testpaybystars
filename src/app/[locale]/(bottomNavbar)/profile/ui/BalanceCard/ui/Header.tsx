"use client";

import { useProfile } from "@/shared/store/useProfile";
import { Flex } from "@/shared/ui/Flex";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import Image from "next/image";
import React from "react";

export const Header = () => {
  const { profile } = useProfile();
  const fires = profile?.fires || 0;

  return (
    <Flex className="justify-between !items-start mb-4">
      <div>
        <h3 className="text-[#857889]">Your Balance</h3>
        <Flex className="gap-x-2">
          <h3 className="font-bold text-[26px]">{fires}</h3>
          <GradientHotIcon />
        </Flex>
        <h3 className="text-[#857889]">from 100,000</h3>
      </div>
      <div className="text-right">
        <h3 className="text-[#857889]">Rate</h3>
        <Flex className="gap-x-2">
          <h3 className="font-bold text-[26px]">50%</h3>
          <Image
            src={"/icons/blackRoundedInfo.svg"}
            width={25}
            height={25}
            alt="hot"
          />
        </Flex>
      </div>
    </Flex>
  );
};
