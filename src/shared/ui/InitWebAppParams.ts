"use client";

import React from "react";

export const InitWebAppParams = () => {
  React.useEffect(() => {
    const WebApp = window.Telegram.WebApp;

    WebApp.disableVerticalSwipes();

    WebApp.setHeaderColor("#9E4FE9"); // primary

    WebApp.setBackgroundColor("#FFFFFF"); // dark
  }, []);
  return null;
};
