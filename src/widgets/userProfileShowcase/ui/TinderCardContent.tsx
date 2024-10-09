/* eslint-disable react/display-name */
// "use client";

import { IUser } from "@/shared/api/usersApi";
import Slider from "react-slick";
import Image from "next/image";
import React from "react";
import clsx from "clsx";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  className?: string;
  character: IUser;
}

export const TinderCardContent = React.forwardRef(
  ({ className, character }: Props, ref) => {
    const { firstName, info, images } = character;

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
        <div className="absolute bottom-0 pb-10 pt-2 left-0 px-4 w-full bg-gradient-to-t from-white/60 via-white/40 to-transparent backdrop-blur-sm">
          {/* <h2 className="text-white font-bold text-[20px] mb-2">{firstName}</h2> */}
          <h2 className="text-white font-bold text-[20px] mb-2">{firstName}</h2>
          <h4 className="text-white">
            {info ||
              "Who I’m looking for: I’m looking for is a man in his early 30s..."}
          </h4>
        </div>
      </div>
    );
  }
);
