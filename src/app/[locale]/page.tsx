"use client";

import React from "react";
import { redirect } from "next/navigation";
import {
  getAccessTokenClient,
  setAccessTokenClient,
} from "@/shared/lib/cookie";

export default function Home() {
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
        setAccessTokenClient(token);
        redirect(`${WebAppLanguage}/search`);
      } else redirect(`${WebAppLanguage}/createProfile`);
    };

    if (isForTesters) {
      console.log("for test");
      window.Telegram.WebApp.CloudStorage.getItem("token", (error, result) => {
        if (error) {
          console.log("err, ", error);
          tokenChecker("");
        } else {
          console.log("result, ", result);
          tokenChecker(result || "");
        }
      });
    } else {
      console.log("for prod");
      tokenChecker(accessToken);
    }
  }, []);

  return null;
}
