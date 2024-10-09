"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <button onClick={goBack}>
      <Image src={"/icons/arrowLeft.svg"} width={20} height={20} alt="back" />
    </button>
  );
};
