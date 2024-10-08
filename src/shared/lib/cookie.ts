import Cookies from "js-cookie";

export const getAccessTokenClient = () => {
  const token = Cookies.get("accessTokenCookieMatchClient_v6");
  return token ? token : null;
};

export const setAccessTokenClient = (token: string) =>
  Cookies.set("accessTokenCookieMatchClient_v6", token);

export const removeAccessTokenClient = () =>
  Cookies.remove("accessTokenCookieMatchClient_v6");

export const getRefreshTokenClient = () => {
  const token = Cookies.get("refreshTokenCookieMatchClient");
  return token ? token : null;
};

export const setRefreshTokenClient = (token: string) =>
  Cookies.set("refreshTokenCookieMatchClient", token);

export const removeRefreshTokenClient = () =>
  Cookies.remove("refreshTokenCookieMatchClient");
