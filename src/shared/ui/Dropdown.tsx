"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { IOption } from "../interfaces";

interface Props {
  label?: string;
  className?: string;
  options: IOption[];
  onChangeOption: (option: IOption) => void;
}

export const Dropdown: React.FC<Props> = ({
  label,
  className,
  onChangeOption,
  options,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const divRef = useOutsideClick(() => setIsOpen(false));

  const onChange = (option: IOption) => {
    onChangeOption(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={clsx("", className)}>
      {label && (
        <h3 className="text-[18px] text-secondary font-bold mb-2">{label}</h3>
      )}
      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex items-center justify-between border border-black/40 p-3 rounded-xl",
          {
            "pointer-events-none": isOpen,
          }
        )}
      >
        <h4>{selectedOption.label}</h4>
        <Image
          src={"/icons/arrowDown.svg"}
          width={15}
          height={15}
          alt="arrow-down"
        />
      </div>

      {isOpen && (
        <div
          ref={divRef}
          className="border border-black/40 shadow-md p-3 rounded-xl mt-4"
        >
          {options.map((option) => {
            const isActive = option.value === selectedOption.value;
            return (
              <div
                key={option.value}
                onClick={() => onChange(option)}
                className={clsx(
                  "py-2 px-3 rounded-md hover:bg-[#7341F6] hover:text-white flex items-center justify-between",
                  {
                    "pointer-events-none": isActive,
                    "text-secondary": !isActive,
                  }
                )}
              >
                <h4>{option.label}</h4>
                {isActive && (
                  <Image
                    src={"/icons/tickGray.svg"}
                    width={16}
                    height={16}
                    alt="Tick"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
