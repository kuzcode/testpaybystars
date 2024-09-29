"use client";

import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<Props> = ({
  className,
  text,
  disabled = false,
  type = "button",
  loading = false,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "text-white w-full rounded-2xl h-[52px] font-semibold text-[19px]",
        className,
        {
          "!bg-[#D2D2D2]": disabled,
          "bg-secondary": !disabled,
        }
      )}
      {...props}
    >
      {loading ? t("loading") : text}
    </button>
  );
};
