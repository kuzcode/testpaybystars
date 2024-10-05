"use client";

import React from "react";
import { WalletCard } from "./walletCard";
import { getAuthorWalletApi } from "@/shared/api/paymentApi";
import { useMutation } from "@tanstack/react-query";
import { usePayment } from "@/shared/store/usePayment";

export const WalletCardList = () => {
  const { setAuthorWalletAddress } = usePayment();
  const mutation = useMutation({
    mutationFn: () => getAuthorWalletApi("ton"),
    onSuccess: (data) => {
      setAuthorWalletAddress(data.walletAddress);
    },
  });

  React.useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => {
        return <WalletCard key={index} />;
      })}
    </div>
  );
};
