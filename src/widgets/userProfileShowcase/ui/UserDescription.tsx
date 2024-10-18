import React from "react";
import { Flex } from "@/shared/ui/Flex";
import { LetterIcon } from "@/shared/ui/LetterIcon";

interface Props {
  firstName: string;
  usdtBalance: number | null;
  info: string | null;
}

export const UserDescription: React.FC<Props> = ({
  firstName,
  usdtBalance,
  info,
}) => {
  return (
    <div className="absolute bottom-0 pb-10 pt-2 left-0 px-4 w-full bg-gradient-to-t from-white/60 via-white/40 to-transparent backdrop-blur-sm">
      <Flex className="gap-x-2">
        <h2 className="text-white font-bold text-[20px] mb-2">{firstName}</h2>
        <LetterIcon deposit={usdtBalance} hideText className="-translate-y-1" />
      </Flex>
      <h4 className="text-white">
        {info ||
          "Who I’m looking for: I’m looking for is a man in his early 30s..."}
      </h4>
    </div>
  );
};
