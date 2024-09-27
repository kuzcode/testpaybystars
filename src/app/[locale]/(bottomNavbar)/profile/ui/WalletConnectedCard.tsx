import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Flex } from "@/shared/ui/Flex";
import React from "react";

export const WalletConnectedCard = () => {
  return (
    <Card>
      <div>
        <h3 className="text-[#857889]">Total gained</h3>
        <Flex className="gap-x-2">
          <h3 className="font-bold text-[26px]">
            678 USDT <span className="text-[#CCCCCC]">~ 0 RUB</span>
          </h3>
        </Flex>
        <h3 className="text-[#857889]">Available for withdraw: 0 USDT</h3>
        <Button text="Get Bonus" disabled className="mt-3" />
        <h3 className="text-[#857889] font-semibold text-center mt-6 mb-2 text-[19px]">
          Disconnect Wallet
        </h3>
      </div>
    </Card>
  );
};
