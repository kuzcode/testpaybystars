"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "../hooks/useOutsideClick";
import clsx from "clsx";

interface Props {
  className?: string;
  button: JSX.Element;
}

export const TooltipButton: React.FC<Props> = ({ button }) => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = React.useState(false);
  const ref = useOutsideClick(() => {
    setShowTooltip(false);
  });

  return (
    <div
      onClick={() => {
        // if (showTooltip) {
        //   setShowTooltip(false);
        //   return;
        // }
        setShowTooltip(true);
      }}
      className={clsx("relative", {
        "pointer-events-none": showTooltip,
      })}
    >
      {button}
      {showTooltip && (
        <div
          ref={ref}
          className="bg-tooltip absolute top-0 left-0 translate-y-[75%] -translate-x-[78%] z-[99] text-white w-[180px] h-[50px] flex items-center text-center px-3 text-[12px] rounded-lg"
        >
          <h3 className="relative z-[10] bg-tooltip">{t("rateTooltip")}</h3>
          <div className="absolute top-0 right-[17px] rounded-[2px] rotate-45 w-5 h-5 bg-tooltip z-[1] -translate-y-[4px]" />
        </div>
      )}
    </div>
  );
};
