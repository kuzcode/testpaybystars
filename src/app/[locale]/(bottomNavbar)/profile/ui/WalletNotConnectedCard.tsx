"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import { useConnectTonWallet } from "@/shared/hooks/useConnectTonWallet";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Step } from "@/shared/ui/Step";

export const WalletNotConnectedCard = () => {
  const { t } = useTranslation();
  const connectTonWallet = useConnectTonWallet();

  const onWalletConnect = () => connectTonWallet();
  // toggleModal("payment-network-types", null, true);

  return (
    <Card>
      <Step
        title={t("connectTonWallet")}
        subTitle={t("connectTonWalletToGetBonuses")}
        icon="ton"
        actions={
          <Button
            onClick={onWalletConnect}
            text={t("connectWallet")}
            className="mt-3 !w-fit px-4 bg-gradient-to-b to-gradientPrimary from-gradientSecondary"
          />
        }
      />
      <Step
        title={t("getBonuses")}
        subTitle={t("getBonusesDaily")}
        icon="roundedLock"
        showLine={false}
      />
    </Card>
  );
};
