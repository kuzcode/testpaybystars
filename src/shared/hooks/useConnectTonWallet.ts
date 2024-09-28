"use client";

import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

export const useConnectTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userLocalWallet = useTonAddress();

  //   const activateTonWalletListener = useTonConnectListener();

  const connectTonWallet = async () => {
    // if (userLocalWallet && !userNetworkWallet.length) {
    //   await tonConnectUI.disconnect();
    // }
    // activateTonWalletListener();
    tonConnectUI.openModal();
  };

  return connectTonWallet;
};
