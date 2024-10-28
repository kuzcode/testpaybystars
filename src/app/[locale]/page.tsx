"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  getAccessTokenClient,
  setAccessTokenClient,
  setRefreshTokenClient,
} from "@/shared/lib/cookie";
import { CLOUD_STORAGE } from "@/shared/lib/constants";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    const WebApp = window.Telegram.WebApp;
    WebApp.BackButton.hide();
    const userLang = WebApp.initDataUnsafe.user?.language_code;
    const WebAppLanguage =
      userLang === "ru" ? "ru" : userLang === "ua" ? "ru" : "en";

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    const isForTesters = WebApp.initDataUnsafe?.start_param?.includes("env");
    const accessToken = getAccessTokenClient() || "";

    const accessTokenChecker = (token: string) => {
      if (token) {
        setAccessTokenClient(token);
        router.push(`${WebAppLanguage}/search`);
      } else {
        router.push(`${WebAppLanguage}/createProfile`);
      }
    };

    if (isForTesters) {
      window.Telegram.WebApp.CloudStorage.getItem(
        CLOUD_STORAGE.TOKEN,
        (error, result) => {
          if (error) {
            router.push(`${WebAppLanguage}/createProfile`);
          } else {
            accessTokenChecker(result || "");
          }
        }
      );
      window.Telegram.WebApp.CloudStorage.getItem(
        CLOUD_STORAGE.REFRESH_TOKEN,
        (error, result) => {
          if (error) {
            // router.push(`${WebAppLanguage}/createProfile`);
          } else {
            setRefreshTokenClient(result || "");
          }
        }
      );
    } else {
      accessTokenChecker(accessToken);
    }
  }, []);

  return null;
}
