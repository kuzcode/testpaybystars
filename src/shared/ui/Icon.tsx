import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  type: "verified";
}

export const Icon: React.FC<Props> = ({ className, type }) => {
  return (
    <>
      {type === "verified" && (
        <Image
          src={"/icons/verified.svg"}
          width={24}
          height={24}
          alt="verified"
        />
      )}
    </>
  );
};
