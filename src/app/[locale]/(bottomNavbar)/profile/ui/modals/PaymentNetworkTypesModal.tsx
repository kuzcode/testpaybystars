"use client";

import React from "react";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { useModal } from "@/shared/store/useModal";
import { Card } from "@/shared/ui/Card";
import { ReactSVG } from "react-svg";
import { Flex } from "@/shared/ui/Flex";
import { TNetworkType } from "@/shared/types";
import { useConnectTonWallet } from "@/shared/hooks/useConnectTonWallet";

export const PaymentNetworkTypesModal = () => {
  const connectTonWallet = useConnectTonWallet();

  const { isOpen, type, toggleModal } = useModal((state) => state);

  const modal = isOpen && type === "payment-network-types";

  const onClose = () => toggleModal(type, null, false);

  const onSelect = (type: TNetworkType) => {
    if (type === "ton") {
      connectTonWallet();
    }
    onClose();
  };

  return (
    <Vaul isOpen={modal} onClose={onClose} height={360}>
      <div className="space-y-6">
        <Card onClick={() => onSelect("ton")} className="!border-ton">
          <Flex className="gap-x-3">
            <ReactSVG src="/crypto/ton.svg" className="w-[26px]" />
            <h3 className="font-bold text-ton text-[18px]">TON</h3>
          </Flex>
        </Card>
      </div>
    </Vaul>
  );
};
