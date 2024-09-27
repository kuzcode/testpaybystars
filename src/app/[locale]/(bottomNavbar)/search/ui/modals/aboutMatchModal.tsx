import { Button } from "@/shared/ui/Button";
import Image from "next/image";
import React from "react";

export const AboutMatchModal = () => {
  return (
    <div className="w-screen h-screen bg-black/20 backdrop-blur-sm fixed z-[999] flex flex-col justify-end">
      <div className="h-[550px] bg-white rounded-t-[30px] px-6 pt-12 pb-8 relative flex flex-col justify-between">
        <div className="bg-[#D9D9D9] h-[5px] w-[130px] rounded-full absolute top-4 left-1/2 -translate-x-1/2" />

        <Image
          src={"/icons/circularGradientHot.svg"}
          width={150}
          height={150}
          alt="filter"
          className="mx-auto"
        />

        <div className="text-center space-y-6">
          <h3 className="font-bold text-[27px]">About Match</h3>
          <div className="space-y-4">
            <p className="text-[#857889]">
              You can quickly contact those who are near you and have entered
              this section, as well as find local groups.
            </p>
            <p className="text-[#857889]">
              To do this, you need to allow the application to access the
              location.
            </p>
          </div>
        </div>

        <Button text="Ok" />
      </div>
    </div>
  );
};
