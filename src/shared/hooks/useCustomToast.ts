"use client";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface Props {
  type: "success" | "error";
  message: string;
}

export const useCustomToast = () => {
  const { t } = useTranslation();

  const call = ({ type, message }: Props) => {
    toast[type](t(message), {
      position: "top-right",
      style: {
        fontWeight: 500,
      },
    });
  };

  return call;
};
