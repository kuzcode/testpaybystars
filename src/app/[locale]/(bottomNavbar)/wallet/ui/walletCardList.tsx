"use client";

import React from "react";
import { WalletCard } from "./walletCard";
import { fetchEnergyPrices } from "@/shared/api/energyApi";

export const WalletCardList = () => {
  React.useEffect(() => {
    fetchEnergyPrices();
  }, []);

  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => {
        return <WalletCard key={index} />;
      })}
    </div>
  );
};
