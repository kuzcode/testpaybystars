"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const pages = ["profile", "settings", "search", "favorites", "wallet"];
  const pathname = usePathname();

  const close = () => setIsOpen(false);

  const isActive = (page: string) => pathname.includes(page);

  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-[999] bg-white">
      <button onClick={close}>
        <Image
          src={"/icons/blackClose.svg"}
          width={60}
          height={60}
          alt="close"
          className="absolute top-[40px] left-1/2 -translate-x-1/2"
        />
      </button>
      <div className="flex flex-col space-y-10 text-center w-full">
        {pages.map((page) => {
          return (
            <div key={page} className="relative">
              <Link
                href={`/${page}`}
                className="!w-[200px] text-[#202020] font-bold capitalize text-[28px] bg-white px-12 relative z-[99]"
              >
                {page}
              </Link>
              {isActive(page) && (
                <div className="bg-primary h-[4px] w-full absolute top-1/2 -translate-y-1/2 z-[10]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
