import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { IUploadImage } from "@/shared/interfaces";
import { MiniImageCard, MiniImageCardWrapper } from "@/shared/ui/MiniImageCard";

interface Props {
  className?: string;
  images: IUploadImage[];
  setImages: React.Dispatch<React.SetStateAction<IUploadImage[]>>;
}

export const ProfileImageShowcaseSection: React.FC<Props> = ({
  className,
  images,
  setImages,
}) => {
  const { t } = useTranslation();

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const randomId = Math.floor(Math.random() * 1000);
      const file = e.target.files[0];
      const newImage = { id: randomId, url: file };
      setImages((prev) => [...prev, newImage]);
    }
  };

  const removeImage = (id: number) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };

  return (
    <MiniImageCardWrapper
      className={clsx("my-4", className)}
      onChangeImage={onChangeImage}
      label={t("photos")}
    >
      {images.map((image) => {
        return (
          <MiniImageCard
            handleImageClick={() => {}}
            handleRemoveClick={(imageId) => removeImage(imageId as number)}
            imageId={image.id}
            imgUrl={image.url}
            key={image.id}
          />
        );
      })}
    </MiniImageCardWrapper>
  );
};
