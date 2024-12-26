/* eslint-disable react/display-name */
// "use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

import { IUser } from "@/shared/api/usersApi";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserDescription } from "./UserDescription";

interface Props {
  className?: string;
  character: IUser;
}

export const TinderCardContent = React.forwardRef(
  ({ className, character }: Props, ref) => {
    const { firstName, info, images, usdtBalance } = character;

    const settings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className={clsx("relative w-full h-full", className)}>
        <Slider
          {...settings}
          // @ts-ignore
          ref={ref}
          className="swiperRef h-full w-full touch-pan-y"
        >
          {images.map((item, index) => {
            return (
              <div
                className={
                  "relative h-[calc(100vh-250px)] w-full flex items-center justify-center"
                }
                key={index}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[calc(100vh-250px)]">
                  <Image
                    key={index}
                    src={item.fileUrl}
                    className={"object-cover rounded-lg"}
                    alt="girl"
                    fill
                  />
                </div>
              </div>
            );
          })}
        </Slider>
        <UserDescription
          firstName={firstName}
          usdtBalance={usdtBalance}
          info={info}
        />
      </div>
    );
  },
);
