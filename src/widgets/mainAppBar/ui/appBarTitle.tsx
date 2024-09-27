"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  text: string;
  extraText?: string;
}

export const AppBarTitle: React.FC<Props> = ({ text, extraText }) => {
  const { t } = useTranslation();

  console.log(t);

  return (
    <h3 className="font-bold text-[26px]">
      {t(text)} {extraText}
    </h3>
  );
};
