"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  disconnectWalletApi,
  refreshBalanceApi,
} from "@/shared/api/paymentApi";
import { useProfile } from "@/shared/store/useProfile";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Flex } from "@/shared/ui/Flex";

export const WalletConnectedCard = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const queryClient = useQueryClient();
  const tonAddress = useTonAddress();
  const { profile } = useProfile();

  const balance = profile?.usdtBalance || 0;

  const mutation = useMutation({
    mutationFn: () =>
      disconnectWalletApi({
        blockchainType: "ton",
        walletAddress: tonAddress,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
      tonConnectUI.disconnect();
    },
  });

  const refreshBalanceMutation = useMutation({
    mutationFn: () => refreshBalanceApi("ton"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
    },
  });

  const onDisconnect = () => mutation.mutate();

  React.useEffect(() => {
    refreshBalanceMutation.mutate();
  }, []);

  return (
    <Card>
      <div>
        <h3 className="text-[#857889]">{t("totalGained")}</h3>
        <Flex className="gap-x-2">
          <h3 className="font-bold text-[26px]">{balance} USDT </h3>
          {/* {balance} USDT <span className="text-[#CCCCCC]">~ 0 RUB</span> */}
        </Flex>
        <h3 className="text-[#857889]">{t("availableForWithdraw")}: 0 USDT</h3>
        <Button text="Get Bonus" disabled className="mt-3" />
        <div className="text-center">
          <button
            onClick={onDisconnect}
            className="text-[#857889] font-semibold text-center mt-6 mb-2 text-[19px]"
          >
            {t("disconnectWallet")}
          </button>
        </div>
      </div>
    </Card>
  );
};
