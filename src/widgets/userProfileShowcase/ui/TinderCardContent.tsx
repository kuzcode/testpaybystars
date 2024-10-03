import { IUser } from "@/shared/api/usersApi";
import Image from "next/image";
import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  character: IUser;
  isOdd: boolean;
}

export const TinderCardContent: React.FC<Props> = ({
  className,
  character,
  isOdd,
}) => {
  const { firstName, info } = character;

  return (
    <div className={clsx("relative bg-[#fff] w-full h-full", className)}>
      <Image
        src={isOdd ? "/images/girl.png" : "/images/boy.png"}
        className={"object-cover rounded-lg"}
        alt="girl"
        fill
      />
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
};
