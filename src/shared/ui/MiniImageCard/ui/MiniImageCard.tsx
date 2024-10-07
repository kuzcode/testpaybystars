import Image from "next/image";
import React from "react";

type TImageId = number | string;

interface Props {
  imageId: TImageId;
  imgUrl: string | File;
  handleImageClick: (imageId: TImageId) => void;
  handleRemoveClick: (imageId: TImageId) => void;
}

export const MiniImageCard: React.FC<Props> = ({
  imageId,
  imgUrl,
  handleImageClick,
  handleRemoveClick,
}) => {
  const url = typeof imgUrl === "string" ? imgUrl : URL.createObjectURL(imgUrl);

  return (
    <div className="w-full h-[18vw] relative bg-[#F5F5F5] rounded-xl">
      <Image
        src={url}
        fill
        alt="profile-img"
        className="w-full object-cover object-center rounded-xl"
        onClick={() => handleImageClick(imageId)}
      />
      <button
        onClick={() => handleRemoveClick(imageId)}
        className="absolute top-0 right-0 -translate-y-[30%] translate-x-[30%]"
      >
        <Image src={"/icons/cancel.svg"} width={20} height={20} alt="remove" />
      </button>
    </div>
  );
};
