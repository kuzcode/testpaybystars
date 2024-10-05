import Cookies from "js-cookie";

export const getAccessTokenClient = () => {
  const token = Cookies.get("accessTokenCookieMatchClient_v4");
  return token ? token : null;
};

export const setAccessTokenClient = (token: string) =>
  Cookies.set("accessTokenCookieMatchClient_v4", token);

export const removeAccessTokenClient = () =>
  Cookies.remove("accessTokenCookieMatchClient_v4");

export const getRefreshTokenClient = () => {
  const token = Cookies.get("refreshTokenCookieMatchClient");
  return token ? token : null;
};

export const setRefreshTokenClient = (token: string) =>
  Cookies.set("refreshTokenCookieMatchClient", token);

export const removeRefreshTokenClient = () =>
  Cookies.remove("refreshTokenCookieMatchClient");
