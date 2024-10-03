"use client";

import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnectListener } from "./useTonConnectListener";

export const useConnectTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();

  const activateTonWalletListener = useTonConnectListener();

  const connectTonWallet = async () => {
    // if (userLocalWallet && !userNetworkWallet.length) {
    //   await tonConnectUI.disconnect();
    // }
    activateTonWalletListener();
    tonConnectUI.openModal();
  };

  return connectTonWallet;
};
