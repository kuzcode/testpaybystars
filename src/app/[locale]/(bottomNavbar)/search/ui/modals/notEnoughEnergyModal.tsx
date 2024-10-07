"use client";

import React from "react";
import Image from "next/image";
import { Flex } from "@/shared/ui/Flex";
import { Button } from "@/shared/ui/Button";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { useTranslation } from "react-i18next";
import { useModal } from "@/shared/store/useModal";
import { ModalTitle } from "@/shared/ui/modals/ModalTitle";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import { ModalDescription } from "@/shared/ui/modals/ModalDescription";
import { GradientRoundedWaves } from "@/shared/ui/GradientRoundedWaves";
import { useProfile } from "@/shared/store/useProfile";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyEnergy } from "@/shared/api/usersApi";

export const NotEnoughEnerguModal = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { profile } = useProfile();
  const { isOpen, type, toggleModal, data } = useModal((state) => state);
  const customToast = useCustomToast();

  const modal = isOpen && type === "not-enough-energy";

  const mutation = useMutation({
    mutationFn: () => buyEnergy(),
    onSuccess: () => {
      customToast({ type: "success", message: "success" });
      toggleModal("not-enough-energy", data, false);
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
    },
    onError: () => {
      customToast({ type: "error", message: "error" });
    },
  });

  const pay = () => {
    if (profile?.fires && profile.fires >= 100) {
      mutation.mutate();
    } else {
      customToast({ type: "error", message: "notEnoughFires" });
    }
  };

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
        <Button
          onClick={pay}
          text={t("pay")}
          loading={mutation.isPending}
          className="bg-gradient-to-b from-gradientPrimary to-gradientSecondary"
        />
        <Button
          onClick={onClose}
          text={t("cancel")}
          className="bg-white !text-textPrimary"
        />
      </div>
    </Vaul>
  );
};
