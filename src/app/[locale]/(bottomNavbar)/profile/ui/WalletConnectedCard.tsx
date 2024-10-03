"use client";

import React from "react";
import { Card } from "@/shared/ui/Card";
import { Flex } from "@/shared/ui/Flex";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { disconnectWalletApi } from "@/shared/api/paymentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

export const WalletConnectedCard = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const queryClient = useQueryClient();
  const tonAddress = useTonAddress();

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

  const onDisconnect = () => mutation.mutate();

  return (
    <Card>
      <div>
        <h3 className="text-[#857889]">{t("totalGained")}</h3>
        <Flex className="gap-x-2">
          <h3 className="font-bold text-[26px]">
            678 USDT <span className="text-[#CCCCCC]">~ 0 RUB</span>
          </h3>
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
