"use client";

import React from "react";
import { WalletConnectedCard } from "./WalletConnectedCard";
import { WalletNotConnectedCard } from "./WalletNotConnectedCard";
import { useTonAddress } from "@tonconnect/ui-react";

export const WalletState = () => {
  const tonAddress = useTonAddress();
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    if (tonAddress) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [tonAddress]);

  return (
    <>{isConnected ? <WalletConnectedCard /> : <WalletNotConnectedCard />}</>
  );
};
