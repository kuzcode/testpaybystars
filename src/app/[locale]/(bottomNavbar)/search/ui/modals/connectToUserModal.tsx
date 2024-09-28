"use client";

import React from "react";
import Image from "next/image";
import { buyContact, IUser } from "@/shared/api/usersApi";
import { useModal } from "@/shared/store/useModal";
import { Button } from "@/shared/ui/Button";
import { Flex } from "@/shared/ui/Flex";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import { Icon } from "@/shared/ui/Icon";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const ConnectToUserModal = () => {
  const { t } = useTranslation();
  const { isOpen, type, toggleModal, data } = useModal((state) => state);

  const typedData = data as IUser;

  const mutation = useMutation({
    mutationFn: () => buyContact(typedData?.id),
    onSuccess: () => {
      toggleModal("connect-to-user", data, false);
    },
  });

  const modal = isOpen && type === "connect-to-user";

  const onClose = async () => {
    if (isOpen) {
      toggleModal("connect-to-user", data, false);
    }
  };

  const onConfirm = () => {
    mutation.mutate();
  };

  return (
    <Vaul isOpen={modal} onClose={onClose} className="!pb-3">
      <div>
        <div className="w-[205px] h-[205px] border border-primary/20 rounded-full flex items-center justify-center mx-auto">
          <div className="w-[180px] h-[180px] border border-primary/40 rounded-full flex items-center justify-center">
            <div className="w-[155px] h-[155px] border border-primary rounded-full flex items-center justify-center">
              <div className="w-[130px] h-[130px] relative">
                <Image
                  src={"/images/girl.png"}
                  fill
                  alt="filter"
                  className="rounded-full bg-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="font-bold text-[24px]">
            {typedData?.firstName} {typedData?.lastName}
          </h3>
          <Flex className="justify-center gap-x-2">
            <Icon type="verified" />
            {/* <Image
              src={"/icons/brave.svg"}
              width={24}
              height={24}
              alt="brave"
            /> */}
          </Flex>
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
