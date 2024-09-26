import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Step } from "@/shared/ui/Step";
import React from "react";

export const WalletNotConnectedCard = () => {
  return (
    <Card>
      <Step
        title="Connect a ton wallet"
        subTitle="Connect the TON wallet to deposit bonuses"
        icon="ton"
        actions={
          <Button
            text="Connect Wallet"
            className="mt-3 !w-[200px] bg-gradient-to-b to-gradientPrimary from-gradientSecondary"
          />
        }
      />
      <Step
        title="Get bonuses"
        subTitle="Get bonuses daily"
        icon="roundedLock"
        showLine={false}
      />
    </Card>
  );
};
