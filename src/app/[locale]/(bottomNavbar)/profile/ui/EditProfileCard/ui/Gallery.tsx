"use client";

import React from "react";
import { useProfile } from "@/shared/store/useProfile";
import { MiniImageCard, MiniImageCardWrapper } from "@/shared/ui/MiniImageCard";
import { useModal } from "@/shared/store/useModal";
import { IProfileImage, uploadProfileImage } from "@/shared/api/usersApi";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { LOCAL_STORAGE } from "@/shared/lib/constants";

export const Gallery = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const { toggleModal } = useModal();

  const [images, setImages] = React.useState<IProfileImage[]>([]);
  const [pendingImagesLengthFromAuthForm, setPendingImagesLengthFromAuthForm] =
    React.useState(0);

  const combinedImages = React.useMemo(() => {
    return [...(profile?.images || []), ...images];
  }, [images, profile?.images]);

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const image: IProfileImage = {
      id: Date.now().toString(),
      fileUrl: files[0],
      fileName: "",
    };
    // setImages((prev) => [...prev, image]);
    const formData = new FormData();
    formData.append("files", files[0]);
    await toast.promise(
      uploadProfileImage(formData),
      {
        loading: t("imageUploading"),
        success: t("imageUploaded"),
        error: t("error"),
      },
      {
        position: "top-right",
        style: {
          fontWeight: 500,
        },
      }
    );
    queryClient.refetchQueries({ queryKey: ["fetchMyProfile"] });
  };

  const handleImageClick = () => {};

  const handleRemoveClick = (imageId: number | string) => {
    const image = combinedImages.find((image) => image.id === imageId);

    const isLocalImage = image?.fileName === "";

    if (isLocalImage) {
      setImages((prev) => prev.filter((image) => image.id !== imageId));
      return;
    }

    toggleModal("profile-image-remove-confirmation", image, true);
  };

  React.useEffect(() => {
    const pendingImagesLengthFromAuthFormLS = localStorage.getItem(
      LOCAL_STORAGE.AUTH_IMAGE_COUNT
    );
    if (pendingImagesLengthFromAuthFormLS) {
      setPendingImagesLengthFromAuthForm(
        Number(pendingImagesLengthFromAuthFormLS)
      );
    }
  }, []);

  return (
    <MiniImageCardWrapper
      onChangeImage={(e) => onChangeImage(e)}
      label={t("photos")}
    >
      {Array.from({ length: pendingImagesLengthFromAuthForm }).map(
        (_, index) => {
          return (
            <div
              key={index}
              className="w-full h-[18vw] animate-pulse relative bg-gray-200 rounded-xl"
            ></div>
          );
        }
      )}
      {combinedImages.map((image) => {
        return (
          <MiniImageCard
            key={image.id}
            handleImageClick={handleImageClick}
            handleRemoveClick={handleRemoveClick}
            imageId={image.id}
            imgUrl={image.fileUrl}
          />
        );
      })}
    </MiniImageCardWrapper>
  );
};
