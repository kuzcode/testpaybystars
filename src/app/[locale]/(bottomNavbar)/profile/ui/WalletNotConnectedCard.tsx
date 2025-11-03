"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Step } from "@/shared/ui/Step";

export const WalletNotConnectedCard = () => {
  const { t } = useTranslation();

  const onWalletConnect = () => connectTonWallet();
  // toggleModal("payment-network-types", null, true);

  return (
    <Card>
      <Step
        title={t("getBonuses")}
        subTitle={t("getBonusesDaily")}
        icon="roundedLock"
        showLine={false}
      />
    </Card>
  );
};
