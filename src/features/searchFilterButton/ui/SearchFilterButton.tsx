import React from "react";
import Image from "next/image";
import { useModal } from "@/shared/store/useModal";

export const SearchFilterButton = () => {
  const { toggleModal } = useModal();

  const handleClick = () => toggleModal("search-filter", null, true);

  return (
    <button onClick={handleClick}>
      <Image src={"/icons/filter.svg"} width={28} height={26} alt="filter" />
    </button>
  );
};
