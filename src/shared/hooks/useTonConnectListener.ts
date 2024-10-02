"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { usePayment } from "../store/usePayment";
import { connectWalletApi } from "../api/paymentApi";

export const useTonConnectListener = () => {
  const { tonConnectListenerActivated, activateTonConnectListener } =
    usePayment();
  const [tonConnectUI] = useTonConnectUI();

  const connectWallet = async (address: string) => {
    const response = await connectWalletApi({
      blockchainType: "ton",
      walletAddress: address,
    });

    // dispatch(
    //   connectWalletApi({ blockchainType: "TON", walletAddress: address })
    // ).then((res) => {
    //   if (res.meta.requestStatus === "fulfilled") {
    //     // dispatch(getUserWalletApi());
    //     // dispatch(setWalletSuccessfullyConnectedModal(true));
    //   }
    //   if (res.meta.requestStatus === "rejected") {
    //     if ((res.payload.message as string).includes("activated")) {
    //       //   dispatch(setWalletNotActivatedModal(true));
    //     }
    //   }
    // }),
    //   {
    //     loading: "Loading",
    //     success: "Success",
    //     error: "Error",
    //   };
  };

  const activateListener = () => {
    if (tonConnectListenerActivated) return;
    activateTonConnectListener();

    const onStatusChange = (wallet: any) => {
      console.log(wallet);
      if (wallet?.account.address) {
        connectWallet(wallet.account.address);
      }
    };

    tonConnectUI.onStatusChange(onStatusChange);
  };

  return activateListener;
};
