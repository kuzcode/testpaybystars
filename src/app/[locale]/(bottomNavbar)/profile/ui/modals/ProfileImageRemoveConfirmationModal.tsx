"use client";

import { deleteUserImage, IProfileImage } from "@/shared/api/usersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/shared/store/useModal";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";
import Image from "next/image";
import React from "react";

export const ProfileImageRemoveConfirmationModal = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // const { fetchProfile } = useFetchProfile();
  const { isOpen, type, toggleModal, data } = useModal((state) => state);

  const image = data as IProfileImage;
  const modal = isOpen && type === "profile-image-remove-confirmation";

  const mutation = useMutation({
    mutationFn: () => deleteUserImage(image?.id),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({ queryKey: ["fetchMyProfile"] });
    },
  });

  const onClose = () => toggleModal(type, data, false);

  return (
    <Vaul isOpen={modal} onClose={onClose} height={380}>
      <div className="text-center space-y-6">
        <div className="w-[150px] h-[150px] relative mx-auto">
          <Image
            fill
            src={image?.fileUrl as string}
            alt="profile image"
            className="mx-auto rounded-full object-cover object-center"
          />
        </div>
        <div className="space-y-4">
          <p className="text-[#857889]">{t("removeImageConfirmation")}</p>
        </div>
      </div>

      <Button
        onClick={() => mutation.mutate()}
        text={t("yes")}
        loading={mutation.isPending}
      />
    </Vaul>
  );
};
