"use client";

import React from "react";
import { useProfile } from "@/shared/store/useProfile";
import { MiniImageCard, MiniImageCardWrapper } from "@/shared/ui/MiniImageCard";
import { useModal } from "@/shared/store/useModal";
import { IProfileImage, uploadProfileImage } from "@/shared/api/usersApi";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Compressor from "compressorjs";

export const Gallery = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { profile, pendingProfileImages } = useProfile();
  const { toggleModal } = useModal();

  const [images, setImages] = React.useState<IProfileImage[]>([]);

  const combinedImages = React.useMemo(() => {
    return [...(profile?.images || []), ...images];
  }, [images, profile?.images]);

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    new Compressor(files[0], {
      quality: 0.2,
      async success(result) {
        // @ts-ignore
        const formData = new FormData();
        formData.append("files", result);
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
      },
      error(err) {
        console.log(err.message);
        toast.error("Compression error");
      },
    });
    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    // setImages((prev) => [...prev, image]);
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

  return (
    <MiniImageCardWrapper
      onChangeImage={(e) => onChangeImage(e)}
      label={t("photos")}
    >
      {Array.from({ length: pendingProfileImages }).map((_, index) => {
        return (
          <div
            key={index}
            className="w-full h-[18vw] animate-pulse relative bg-gray-200 rounded-xl"
          ></div>
        );
      })}
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
