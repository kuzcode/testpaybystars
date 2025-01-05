"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { IOption } from "../interfaces";

interface Props {
  label?: string;
  className?: string;
  options: IOption[];
  // eslint-disable-next-line no-unused-vars
  onChangeOption: (option: IOption) => void;
  defultValue?: string;
  required?: boolean;
}

export const Dropdown: React.FC<Props> = ({
  label,
  className,
  onChangeOption,
  options,
  defultValue,
  required,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const divRef = useOutsideClick(() => setIsOpen(false));

  const onChange = (option: IOption) => {
    onChangeOption(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (defultValue) {
      const option = options.find((option) => option.label === defultValue);
      if (option) {
        onChange(option);
      }
    }
  }, [defultValue]);

  return (
    <div className={clsx("", className)}>
      {label && (
        <h3 className="text-[18px] text-secondary font-bold mb-2">{label}</h3>
      )}
      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          "relative flex items-center justify-between border border-black/40 p-3 rounded-xl",
          {
            "pointer-events-none": isOpen,
          },
        )}
      >
        {required && (
          <h3 className="text-red-600 absolute top-[2px] right-[5px] text-base">
            *
          </h3>
        )}
        <h4 className="font-medium">
          {defultValue && selectedOption.value === ""
            ? t(defultValue)
            : t(selectedOption.label)}
        </h4>
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
            const isActive =
              defultValue && selectedOption.value === ""
                ? option.label === defultValue
                : option.value === selectedOption.value;
            return (
              <div
                key={option.value}
                onClick={() => onChange(option)}
                className={clsx(
                  "py-2 px-3 rounded-md hover:bg-[#7341F6] hover:text-white flex items-center justify-between",
                  {
                    "pointer-events-none": isActive,
                    "text-secondary": !isActive,
                  },
                )}
              >
                <h4 className="font-medium">{t(option.label)}</h4>
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
