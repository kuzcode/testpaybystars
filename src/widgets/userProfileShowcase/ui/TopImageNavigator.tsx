/* eslint-disable react/display-name */
import React from "react";
import clsx from "clsx";
import { IImage } from "@/shared/api/usersApi";

interface Props {
  images: IImage[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  hide?: boolean;
  disableTouch?: boolean;
}

export const TopImageNavigator = React.forwardRef(
  (
    {
      images,
      currentImageIndex,
      setCurrentImageIndex,
      hide,
      disableTouch,
    }: Props,
    ref
  ) => {
    const onChangeImage = (index: number) => {
      setCurrentImageIndex(index);
      // @ts-ignore
      ref.current.slickGoTo(index);
    };

    return (
      <div
        className={clsx(
          "absolute z-[999] left-0 top-0 h-[20px] w-full flex gap-x-2 p-2",
          {
            "!pointer-events-none": disableTouch,
            "opacity-0": hide,
          }
        )}
      >
        {images.map((_, index) => {
          return (
            <div
              onTouchStart={() => onChangeImage(index)}
              className={clsx(
                "h-[6px] rounded-full w-[16%] bg-white !pointer-events-auto",
                {
                  "opacity-50": currentImageIndex !== index,
                }
              )}
              key={index}
            />
          );
        })}
      </div>
    );
  }
);
