import { TG_INIT_DATA } from "./constants";

export const getTelegramInitData = (): string => {
  return process.env.NODE_ENV === "development"
    ? TG_INIT_DATA!
    : window.Telegram.WebApp.initData;
};
