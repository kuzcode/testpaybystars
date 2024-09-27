import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Flex } from "@/shared/ui/Flex";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import { PointBadge } from "@/shared/ui/PointBadge";
import Image from "next/image";
import React from "react";
import { Header } from "./Header";

const COUNTRIES = ["Monkey", "Elephant", "Lion"];

export const BalanceCard = () => {
  return (
    <Card className="!pb-3">
      <Header />
      <div className="relative bg-[#D9D9D9]/[36%] h-2.5 mt-2 mb-8 rounded-full border-y border-[#000000]/[9%]">
        <div className="absolute inset-y-0 left-0 w-4 h-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FEFEE9] to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-4 h-4 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#FEFEE9] to-transparent"></div>

        <div className="w-full abolsute top-1/2 left-0 h-[10px] flex items-center justify-around -translate-y-[1px]">
          {COUNTRIES.map((country, idx) => {
            return <PointBadge key={idx} text={country} />;
          })}
        </div>
      </div>

      <Button text="Deposit" className="mt-4" />
    </Card>
  );
};
