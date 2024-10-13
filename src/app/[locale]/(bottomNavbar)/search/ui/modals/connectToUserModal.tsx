"use client";

import React from "react";
import Image from "next/image";
import { buyContact, IUser } from "@/shared/api/usersApi";
import { useModal } from "@/shared/store/useModal";
import { Button } from "@/shared/ui/Button";
import { Flex } from "@/shared/ui/Flex";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { GradientRoundedWaves } from "@/shared/ui/GradientRoundedWaves";
import { ModalTitle } from "@/shared/ui/modals/ModalTitle";
import { useProfile } from "@/shared/store/useProfile";
import toast from "react-hot-toast";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { LetterIcon } from "@/shared/ui/LetterIcon";
import { Icon } from "@/shared/ui/Icon";

export const ConnectToUserModal = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { profile } = useProfile();
  const { isOpen, type, toggleModal, data } = useModal((state) => state);
  const customToast = useCustomToast();

  const typedData = data as IUser;
  const profileImage = typedData?.images?.length
    ? typedData.images[0].fileUrl
    : "/images/girl.png";

  const mutation = useMutation({
    mutationFn: () => buyContact(typedData?.id),
    onSuccess: (data) => {
      const username = data.username;
      toggleModal("connect-to-user", data, false);
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
      window.Telegram.WebApp.openTelegramLink(`https://t.me/${username}`);
    },
  });

  const modal = isOpen && type === "connect-to-user";

  const onClose = async () => {
    if (isOpen) {
      toggleModal("connect-to-user", data, false);
    }
  };

  const onConfirm = () => {
    if (profile?.fires < typedData?.contactPrice) {
      customToast({ type: "error", message: "notEnoughFires" });
      return;
    }
    mutation.mutate();
  };

  return (
    <Vaul isOpen={modal} onClose={onClose} className="!pb-3">
      <div>
        <GradientRoundedWaves>
          <Image
            src={profileImage}
            fill
            alt="profile-photo"
            className="rounded-full object-cover object-top"
          />
        </GradientRoundedWaves>

        <div className="text-center space-y-2">
          <ModalTitle>
            {typedData?.firstName} {typedData?.lastName}
          </ModalTitle>
          <Flex className="justify-center gap-x-1">
            <Icon type="verified" />
            <LetterIcon
              deposit={typedData?.usdtBalance}
              hideText
              className="scale-[1.07]"
            />
          </Flex>
          <Flex className="justify-center gap-x-2"></Flex>
          <p className="mx-auto text-textPrimary max-w-[250px]">
            {t("connectConfirmation")}
            <span className="inline-flex items-center">
              <span className="mx-1 font-bold text-[#000] text-[17px]">
                {typedData?.contactPrice || 0}
              </span>
              <GradientHotIcon className="scale-[0.85]" />
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          onClick={onConfirm}
          text={mutation.isPending ? t("loading") : t("confirm")}
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
