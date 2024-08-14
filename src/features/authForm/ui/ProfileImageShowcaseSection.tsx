import Image from "next/image";
import React from "react";

export const ProfileImageShowcaseSection = () => {
  return (
    <div className="mb-4">
      <h3 className="text-secondary font-bold text-[16px]">Photos</h3>
      <div className="mt-4 grid grid-cols-4 gap-y-2 gap-x-3">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index} className="w-full h-[18vw] relative">
              <Image
                src={"/images/girl.png"}
                fill
                alt="profile-img"
                className="w-full object-cover rounded-xl"
              />
              <Image
                src={"/icons/cancel.svg"}
                width={20}
                height={20}
                alt="remove"
                className="absolute top-0 right-0 -translate-y-[30%] translate-x-[30%]"
              />
            </div>
          );
        })}
        <div className="w-full h-[18vw] border border-[#C4C4C4] rounded-xl bg-[#F5F5F5] flex items-center justify-center">
          <div className="bg-white w-8 h-8 rounded-xl flex items-center justify-center">
            <Image src="/icons/greyPlus.svg" width={14} height={14} alt="add" />
          </div>
        </div>
      </div>
    </div>
  );
};
