"use client";

import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnectListener } from "./useTonConnectListener";
import { useProfile } from "../store/useProfile";

export const useConnectTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userLocalWallet = useTonAddress();

  const activateTonWalletListener = useTonConnectListener();

  const connectTonWallet = async () => {
    if (userLocalWallet) {
      await tonConnectUI.disconnect();
    }
    activateTonWalletListener();
    tonConnectUI.openModal();
  };

  return connectTonWallet;
};
