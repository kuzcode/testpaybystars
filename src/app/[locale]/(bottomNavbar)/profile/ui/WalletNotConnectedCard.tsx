"use client";

import React from "react";
import { Card } from "@/shared/ui/Card";
import { Step } from "@/shared/ui/Step";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";

export const WalletNotConnectedCard = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <Step
        title={t("connectTonWallet")}
        subTitle={t("connectTonWalletToGetBonuses")}
        icon="ton"
        actions={
          <Button
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
