"use client";

import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MiniImageUploadButton: React.FC<Props> = ({ onChangeImage }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <button
      onClick={handleUploadImage}
      className="w-full h-[18vw] border border-[#C4C4C4] rounded-xl bg-[#F5F5F5] flex items-center justify-center"
    >
      <div className="bg-white w-8 h-8 rounded-xl flex items-center justify-center">
        <Image src="/icons/greyPlus.svg" width={14} height={14} alt="add" />
        <input
          onChange={onChangeImage}
          ref={inputRef}
          type="file"
          className="absolute opacity-0 pointer-events-none"
        />
      </div>
    </button>
  );
};
