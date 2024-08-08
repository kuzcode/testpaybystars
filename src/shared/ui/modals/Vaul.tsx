import clsx from "clsx";
import React from "react";
import { Drawer } from "vaul";

interface Props {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Vaul: React.FC<Props> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Drawer.Root open={isOpen} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed z-[99] inset-0 bg-black/20 backdrop-blur-sm"
        />
        <Drawer.Content
          className={clsx(
            "outline-none h-[550px] bg-white z-[999] flex flex-col rounded-t-[30px] fixed bottom-0 left-0 right-0  px-6 pt-12 pb-8 justify-between",
            className
          )}
        >
          <div className="bg-[#D9D9D9] h-[5px] w-[130px] rounded-full absolute top-4 left-1/2 -translate-x-1/2" />
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
