"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

export const useNavigationListener = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pages = ["wallet"];

  React.useEffect(() => {
    const BackButton = window.Telegram.WebApp.BackButton;
    if (pages.includes(pathname)) {
      BackButton.show();
      BackButton.onClick(() => router.back());
      return;
    }
    BackButton.hide();
  }, [pathname]);
};
