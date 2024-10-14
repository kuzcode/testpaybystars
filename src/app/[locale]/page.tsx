"use client";

import React from "react";
import { redirect } from "next/navigation";
import { getAccessTokenClient } from "@/shared/lib/cookie";

export default function Home() {
  React.useEffect(() => {
    const WebApp = window.Telegram.WebApp;

    const userLang = WebApp.initDataUnsafe.user?.language_code;
    const WebAppLanguage =
      userLang === "ru" ? "ru" : userLang === "ua" ? "ru" : "en";

    WebApp.BackButton.hide();

    const token = getAccessTokenClient();

    if (token) redirect(`${WebAppLanguage}/search`);
    else redirect(`${WebAppLanguage}/createProfile`);
  }, []);

  return null;
}
