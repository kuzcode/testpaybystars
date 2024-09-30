"use client";

import React from "react";
import { redirect } from "next/navigation";
import { getAccessTokenClient } from "@/shared/lib/cookie";

export default function Home() {
  React.useEffect(() => {
    const WebApp = window.Telegram.WebApp;

    const WebAppLanguage =
      WebApp.initDataUnsafe.user?.language_code === "ru" ? "ru" : "en";

    WebApp.disableVerticalSwipes();

    WebApp.setHeaderColor("#9E4FE9"); // primary

    WebApp.setBackgroundColor("#FFFFFF"); // dark

    WebApp.BackButton.hide();

    const token = getAccessTokenClient();

    if (token) redirect(`${WebAppLanguage}/search`);
    else redirect(`${WebAppLanguage}/createProfile`);
  }, []);

  return null;
}
