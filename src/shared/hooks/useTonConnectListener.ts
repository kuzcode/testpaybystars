"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { usePayment } from "../store/usePayment";
import { connectWalletApi } from "../api/paymentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSuccessToast } from "./useSuccessToast";

export const useTonConnectListener = () => {
  const queryClient = useQueryClient();
  const callSuccessToast = useSuccessToast();
  const mutation = useMutation({
    mutationFn: (address: string) =>
      connectWalletApi({
        blockchainType: "ton",
        walletAddress: address,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
      callSuccessToast();
    },
  });

  const { tonConnectListenerActivated, activateTonConnectListener } =
    usePayment();
  const [tonConnectUI] = useTonConnectUI();

  const connectWallet = async (address: string) => {
    mutation.mutate(address);

    // need to show modals

    //   if (res.meta.requestStatus === "fulfilled") {
    //     // dispatch(setWalletSuccessfullyConnectedModal(true));
    //   }
    //   if (res.meta.requestStatus === "rejected") {
    //     if ((res.payload.message as string).includes("activated")) {
    //       //   dispatch(setWalletNotActivatedModal(true));
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
