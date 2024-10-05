"use client";

import React from "react";
import Image from "next/image";
import { Flex } from "@/shared/ui/Flex";
import { Button } from "@/shared/ui/Button";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { useTranslation } from "react-i18next";
import { useModal } from "@/shared/store/useModal";
import { CustomLink } from "@/shared/ui/CustomLink";
import { ModalTitle } from "@/shared/ui/modals/ModalTitle";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import { ModalDescription } from "@/shared/ui/modals/ModalDescription";
import { GradientRoundedWaves } from "@/shared/ui/GradientRoundedWaves";

export const NotEnoughEnerguModal = () => {
  const { t } = useTranslation();
  const { isOpen, type, toggleModal, data } = useModal((state) => state);

  const modal = isOpen && type === "not-enough-energy";

  const onClose = async () => {
    if (isOpen) {
      toggleModal("not-enough-energy", data, false);
    }
  };

  return (
    <Vaul isOpen={modal} onClose={onClose} className="!pb-3" height={530}>
      <div>
        <GradientRoundedWaves>
          <Image
            src={"/icons/lowEnergy.png"}
            fill
            alt="filter"
            className="rounded-full bg-cover"
          />
        </GradientRoundedWaves>

        <div className="text-center space-y-2 mt-4">
          <ModalTitle>{t("lowEnergy")}</ModalTitle>
          <Flex className="justify-center gap-x-2"></Flex>
          <ModalDescription
            main={<>{t("energyEndDescription", { time: "" })}</>}
            span={<>100</>}
          >
            <GradientHotIcon className="scale-[0.85]" />
          </ModalDescription>
        </div>
      </div>

      <div className="space-y-2">
        <CustomLink href="/wallet" onClick={onClose}>
          <Button
            text={t("pay")}
            className="bg-gradient-to-b from-gradientPrimary to-gradientSecondary"
          />
        </CustomLink>
        <Button
          onClick={onClose}
          text={t("cancel")}
          className="bg-white !text-textPrimary"
        />
      </div>
    </Vaul>
  );
};
