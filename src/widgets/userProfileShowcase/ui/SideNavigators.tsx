/* eslint-disable react/display-name */
import React from "react";

import { IImage } from "@/shared/api/usersApi";
import { Flex } from "@/shared/ui/Flex";

interface Props {
  images: IImage[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const SideNavigators = React.forwardRef(
  ({ currentImageIndex, setCurrentImageIndex, images }: Props, ref) => {
    const slideToNext = () => {
      if (currentImageIndex === images.length - 1) return;
      // @ts-ignore
      ref.current.slickNext();
      setCurrentImageIndex(currentImageIndex + 1);
    };

    const slideToPrev = () => {
      if (currentImageIndex === 0) return;
      // @ts-ignore
      ref.current.slickPrev();
      setCurrentImageIndex(currentImageIndex - 1);
    };

    return (
      <Flex className="absolute w-full h-full justify-between">
        <div
          onTouchStart={slideToPrev}
          className="h-full w-[70px] !pointer-events-auto"
        />
        <div
          onTouchStart={slideToNext}
          className="h-full w-[70px] !pointer-events-auto"
        />
      </Flex>
    );
  },
);
