"use client";

import React from "react";
import { Header } from "./Header";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { useConnectTonWallet } from "@/shared/hooks/useConnectTonWallet";
import { useIsWalletConnected } from "@/shared/hooks/useIsWalletConnected";
import { useCustomPush } from "@/shared/hooks/useCustomPush";
import { letters } from "@/shared/ui/LetterIcon/lib/getLetterName";
import { LetterIcon } from "@/shared/ui/LetterIcon";

export const BalanceCard = () => {
  const { t } = useTranslation();
  const isWalletConnected = useIsWalletConnected();
  const connectTonWallet = useConnectTonWallet();
  const push = useCustomPush();

  const deposit = () => {
    if (isWalletConnected) {
      push("/wallet");
      return;
    }
    connectTonWallet();
  };

  return (
    <Card className="!pb-3">
      <Header />
      <div className="relative bg-[#D9D9D9]/[36%] h-2.5 mt-2 mb-8 rounded-full border-y border-[#000000]/[9%]">
        <div className="absolute inset-y-0 left-0 w-4 h-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FEFEE9] to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-4 h-4 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#FEFEE9] to-transparent"></div>

        <div className="w-full abolsute top-1/2 left-0 h-[10px] flex items-center justify-around -translate-y-[1px]">
          {letters.slice(0, 3).map((letter, idx) => {
            return <LetterIcon key={idx} deposit={letter.limit} />;
            // return <PointBadge key={idx} text={country.name} />;
          })}
        </div>
      </div>

      <Button onClick={deposit} text={t("deposit")} className="mt-4" />
    </Card>
  );
};
