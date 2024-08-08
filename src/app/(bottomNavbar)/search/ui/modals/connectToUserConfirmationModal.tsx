"use client";

import { IMyLikedUser } from "@/shared/api/usersApi";
import { useModal } from "@/shared/store/useModal";
import { Button } from "@/shared/ui/Button";
import { Flex } from "@/shared/ui/Flex";
import { GradientHotIcon } from "@/shared/ui/GradientHotIcon";
import { Icon } from "@/shared/ui/Icon";
import { Vaul } from "@/shared/ui/modals/Vaul";
import Image from "next/image";
import React from "react";

export const ConnectToUserConfirmationModal = () => {
  const { isOpen, type, toggleModal, data } = useModal((state) => state);
  const typedData = data as IMyLikedUser;
  const modal = isOpen && type === "connect-to-user";

  const onClose = async () => {
    if (isOpen) {
      toggleModal("connect-to-user", data);
    }
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
            <Image
              src={"/icons/brave.svg"}
              width={24}
              height={24}
              alt="brave"
            />
          </Flex>
          {/* <p
          className="text-textPrimary max-w-[250px] inline-flex items-baseline
        "
        >
          Do you really want to connect with this soul? It will cost
          <span className="flex items-center">
            <span>12</span>
            <GradientHotIcon />
          </span>
        </p> */}
          <p className="mx-auto text-textPrimary max-w-[250px]">
            Do you really want to connect with this soul? It will cost
            <span className="inline-flex items-center">
              <span className="mx-1 font-bold text-[#000] text-[17px]">10</span>
              <GradientHotIcon className="scale-[0.85]" />
            </span>
          </p>
          {/* <div className="space-y-4">
          <p className="text-[#857889]">
            To do this, you need to allow the application to access the
            location.
          </p>
        </div> */}
        </div>
      </div>

      <div className="space-y-2">
        <Button
          onClick={() => {}}
          text="Confirm"
          className="bg-gradient-to-b from-gradientPrimary to-gradientSecondary"
        />
        <Button
          onClick={onClose}
          text="Cancel"
          className="bg-white !text-textPrimary"
        />
      </div>
    </Vaul>
  );
};
