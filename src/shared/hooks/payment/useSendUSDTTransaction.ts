"use client";

import { Address, JettonMaster, toNano } from "@ton/ton";
import React from "react";
import toast from "react-hot-toast";

import { calculateUsdtAmount } from "@/shared/helpers/commonHelpers";
import { JettonWallet } from "@/shared/wrappers/jettonWallet";

import { useTonConnect } from "./useTonConnect";

const USDT_MASTER_ADDRESS = Address.parse(
  "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
);
const JETTON_TRANSFER_GAS_FEES = toNano("0.038");
const orderId = "";

export const useSendUSDTTransaction = () => {
  const { sender, walletAddress, tonClient } = useTonConnect();

  const handleCompletePayment = React.useCallback(
    async (totalCost: number, authorWalletAddress: string) => {
      try {
        if (!walletAddress) {
          toast.error("Wallet address is not found");
          return;
        }

        if (!tonClient) {
          toast.error("Ton connection error");
          return;
        }

        const jettonMaster = tonClient.open(
          JettonMaster.create(USDT_MASTER_ADDRESS),
        );
        const usersUsdtAddress =
          await jettonMaster.getWalletAddress(walletAddress);

        // creating and opening jetton wallet instance.
        // First argument (provider) will be automatically substituted in methods, which names starts with 'get' or 'send'
        const jettonWallet = tonClient.open(
          JettonWallet.createFromAddress(usersUsdtAddress),
        );

        await jettonWallet.sendTransfer(sender, {
          // @ts-ignore
          fwdAmount: 1n,
          comment: orderId,
          jettonAmount: calculateUsdtAmount(totalCost * 100),
          toAddress: Address.parse(authorWalletAddress),
          value: JETTON_TRANSFER_GAS_FEES,
        });
        // navigate("/transactionSuccess");
      } catch (error) {
        console.log("Error during transaction check:", error);
      }
    },
    [tonClient, walletAddress, sender, orderId],
  );
  return handleCompletePayment;
};
