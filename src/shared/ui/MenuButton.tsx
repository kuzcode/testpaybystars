"use client";

import Image from "next/image";
import React from "react";

import { MenuModal } from "./modals/MenuModal";

export const MenuButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);

  return (
    <>
      <button onClick={open}>
        <Image src={"/icons/menu.svg"} width={26} height={24} alt="menu" />
      </button>
      <MenuModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
