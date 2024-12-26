"use client";

import { useTonAddress } from "@tonconnect/ui-react";
import React from "react";

import { useProfile } from "@/shared/store/useProfile";

import { WalletConnectedCard } from "./WalletConnectedCard";
import { WalletNotConnectedCard } from "./WalletNotConnectedCard";

export const WalletState = () => {
  const tonAddress = useTonAddress();
  const [isConnected, setIsConnected] = React.useState(false);
  const { profile } = useProfile();

  const isWalletConnected = isConnected && profile?.wallets?.length > 0;

  React.useEffect(() => {
    if (tonAddress) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [tonAddress]);

  return (
    <>
      {isWalletConnected ? <WalletConnectedCard /> : <WalletNotConnectedCard />}
    </>
  );
};
