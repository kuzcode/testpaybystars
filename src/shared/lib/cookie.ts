import Cookies from "js-cookie";
import { COOKIES, LOCAL_STORAGE } from "./constants";

export const getAccessTokenClient = () => {
  const tokenLS = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  const token = Cookies.get(COOKIES.ACCESS_TOKEN) || tokenLS;
  return token ? token : null;
};

export const setAccessTokenClient = (token: string) => {
  Cookies.set(COOKIES.ACCESS_TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
};

export const removeAccessTokenClient = () => {
  Cookies.remove(COOKIES.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
};

export const getRefreshTokenClient = () => {
  const token = Cookies.get("refreshTokenCookieMatchClient");
  return token ? token : null;
};

export const setRefreshTokenClient = (token: string) =>
  Cookies.set("refreshTokenCookieMatchClient", token);

export const removeRefreshTokenClient = () =>
  Cookies.remove("refreshTokenCookieMatchClient");
