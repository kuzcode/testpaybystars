"use client";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useSuccessToast = () => {
  const { t } = useTranslation();

  const call = () => {
    toast.success(t("success"), {
      position: "top-right",
      style: {
        fontWeight: 500,
      },
    });
  };

  return call;
};
