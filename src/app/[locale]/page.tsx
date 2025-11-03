"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { CLOUD_STORAGE } from "@/shared/lib/constants";
import {
  getAccessTokenClient,
  setAccessTokenClient,
  setRefreshTokenClient,
} from "@/shared/lib/cookie";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    const WebApp = window.Telegram.WebApp;
    WebApp.BackButton.hide();

    const userLang = WebApp.initDataUnsafe.user?.language_code;
    const WebAppLanguage =
      userLang === "ru" ? "ru" : userLang === "ua" ? "ru" : "en";

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    // Always start as a test user without registration
    const dummyAccessToken = "test-access-token";
    const dummyRefreshToken = "test-refresh-token";
    setAccessTokenClient(dummyAccessToken);
    setRefreshTokenClient(dummyRefreshToken);
    router.push(`${WebAppLanguage}/search`);
  }, []);

  return null;
}
