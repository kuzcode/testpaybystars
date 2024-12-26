import clsx from "clsx";
import React from "react";
import { ReactSVG } from "react-svg";

import { getLetterName } from "../lib/getLetterName";

interface Props {
  className?: string;
  deposit: number | null;
  hideText?: boolean;
}

export const LetterIcon: React.FC<Props> = ({
  className,
  deposit,
  hideText,
}) => {
  const letter = getLetterName(deposit);

  return (
    <div
      className={clsx(
        "w-[24px] h-[24px] rounded-full border bg-[#D1B884] border-white flex items-center justify-center relative",
        className,
      )}
    >
      <ReactSVG
        className={clsx(
          "w-[30px] h-[30px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] scale-[1]",
          {
            "!translate-y-[-48%] !scale-[1.1]": letter === "Sigma",
          },
        )}
        src={`/alphabet/${letter}.svg`}
        width={30}
        height={30}
      />
      {!hideText && (
        <h3 className="absolute top-full translate-y-[10px] font-semibold text-[#857889] text-[13px]">
          {letter}
        </h3>
      )}
    </div>
  );

  //   <ReactSVG src={`/alphabet/${letter}`} />;
};
