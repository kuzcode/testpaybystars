"use client";

import React from "react";
import { WalletConnectedCard } from "./WalletConnectedCard";
import { WalletNotConnectedCard } from "./WalletNotConnectedCard";
import { useTonAddress } from "@tonconnect/ui-react";
import { useProfile } from "@/shared/store/useProfile";

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
      <WalletConnectedCard /> <WalletNotConnectedCard />
    </>
  );
};
