"use client";

import { deleteUserImage, IProfileImage } from "@/shared/api/usersApi";
import { useModal } from "@/shared/store/useModal";
import { Button } from "@/shared/ui/Button";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export const ProfileImageRemoveConfirmationModal = () => {
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

  const onClose = () => toggleModal(type, null, false);

  return (
    <Vaul isOpen={modal} onClose={onClose} height={360}>
      <div className="text-center space-y-6">
        <div className="w-[150px] h-[150px] relative mx-auto">
          <Image
            fill
            src={image?.fileUrl}
            alt="profile image"
            className="mx-auto rounded-full object-cover object-center"
          />
        </div>
        <div className="space-y-4">
          <p className="text-[#857889]">Вы точно хотите удалить это фото?</p>
        </div>
      </div>

      <Button
        onClick={() => mutation.mutate()}
        text="Да"
        loading={mutation.isPending}
      />
    </Vaul>
  );
};
