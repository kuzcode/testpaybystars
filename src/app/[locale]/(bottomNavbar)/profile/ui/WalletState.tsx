import React from "react";
import { WalletConnectedCard } from "./WalletConnectedCard";
import { WalletNotConnectedCard } from "./WalletNotConnectedCard";

export const WalletState = () => {
  return (
    <>
      {/* <WalletConnectedCard /> */}
      <WalletNotConnectedCard />
    </>
  );
};
