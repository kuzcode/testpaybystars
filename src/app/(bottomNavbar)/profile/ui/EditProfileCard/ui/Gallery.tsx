"use client";

import React from "react";
import { useProfile } from "@/shared/store/useProfile";
import { MiniImageCard, MiniImageCardWrapper } from "@/shared/ui/MiniImageCard";
import { useModal } from "@/shared/store/useModal";
import { IProfileImage } from "@/shared/api/usersApi";

export const Gallery = () => {
  const { profile } = useProfile();
  const { toggleModal } = useModal();

  const [images, setImages] = React.useState<IProfileImage[]>([]);

  const combinedImages = React.useMemo(() => {
    return [...(profile?.images || []), ...images];
  }, [images, profile?.images]);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const image: IProfileImage = {
      id: Date.now().toString(),
      fileUrl: files[0],
      fileName: "",
    };
    setImages((prev) => [...prev, image]);
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
      label="Photos"
    >
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
