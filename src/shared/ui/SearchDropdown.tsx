"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";

import { useDebounce } from "../hooks/useDebounce";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { IOption } from "../interfaces";

interface Props {
  label?: string;
  className?: string;
  options: IOption[];
  onChangeOption: (option: IOption) => void;
  onChangeInput: (value: string) => void;
  defultValue?: string;
  loading?: boolean;
}

export const SearchDropdown: React.FC<Props> = ({
  label,
  className,
  onChangeOption,
  options,
  defultValue,
  onChangeInput,
  loading,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value);

  const divRef = useOutsideClick(() => setIsOpen(false));

  const onChange = (option: IOption) => {
    onChangeOption(option);
    setSelectedOption(option);
    setIsOpen(false);
    setValue(option.label);
  };

  React.useEffect(() => {
    if (debouncedValue !== "") {
      const item = options.find((option) => option.label === value);
      if (item) return;
      onChangeInput(debouncedValue);
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [debouncedValue]);

  return (
    <div className={clsx("", className)}>
      {label && (
        <h3 className="text-[18px] text-secondary font-bold mb-2">{label}</h3>
      )}
      <div
        className={clsx(
          "relative flex items-center justify-between border border-black/40 p-3 rounded-xl h-[50px]",
          {
            "pointer-events-none": isOpen,
          },
        )}
      >
        <input
          type="text"
          className="font-medium text-[16px] outline-none w-full"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={t("search")}
        />
        {loading && (
          <ReactSVG
            src="/icons/loading.svg"
            className="absolute top-[25%] -translate-y-1/2 right-3 loading-spinner"
          />
        )}
      </div>

      {isOpen && !loading && (
        <div
          ref={divRef}
          className="border border-black/40 shadow-md p-3 rounded-xl mt-4"
        >
          {options.map((option) => {
            const isActive =
              defultValue && selectedOption?.value === ""
                ? option?.label === defultValue
                : option?.value === selectedOption?.value;
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
