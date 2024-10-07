"use client";

import React from "react";
import { WalletCard } from "./walletCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePayment } from "@/shared/store/usePayment";
import { getAuthorWalletApi } from "@/shared/api/paymentApi";
import { getFireProposalList } from "@/shared/api/firesApi";
import { IFirePrice } from "@/shared/interfaces";

export const WalletCardList = () => {
  const { setAuthorWalletAddress, firePriceList, setFirePriceList } =
    usePayment();

  const fireMutation = useMutation({
    mutationFn: () => getFireProposalList(),
    onSuccess: (data: IFirePrice[]) => {
      setFirePriceList(data);
    },
  });

  const mutation = useMutation({
    mutationFn: () => getAuthorWalletApi("ton"),
    onSuccess: (data) => {
      setAuthorWalletAddress(data.walletAddress);
    },
  });

  React.useEffect(() => {
    mutation.mutate();
    if (!firePriceList?.length) {
      fireMutation.mutate();
    }
  }, []);

  console.log(firePriceList);

  return (
    <div className="space-y-2">
      {firePriceList?.map((price, index) => {
        return <WalletCard key={index} price={price} />;
      })}
    </div>
  );
};
