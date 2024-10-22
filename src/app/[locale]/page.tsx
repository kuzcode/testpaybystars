"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import {
  getAccessTokenClient,
  setAccessTokenClient,
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

    const tokenChecker = (token: string) => {
      if (token) {
        console.log("here");
        setAccessTokenClient(token);
        redirect(`${WebAppLanguage}/search`);
      } else {
        console.log("here 2," + token);
        console.log(WebAppLanguage);
        router.push(`${WebAppLanguage}/createProfile`);
        console.log("123");
      }
    };

    if (isForTesters) {
      console.log("for test");
      window.Telegram.WebApp.CloudStorage.getItem(
        CLOUD_STORAGE.TOKEN,
        (error, result) => {
          if (error) {
            console.log("err, ", error);
            tokenChecker("");
          } else {
            console.log("result, ", result);
            tokenChecker(result || "");
          }
        }
      );
    } else {
      console.log("for prod");
      tokenChecker(accessToken);
    }
  }, []);

  return null;
}
