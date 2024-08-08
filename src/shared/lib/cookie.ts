import Cookies from "js-cookie";

export const getAccessTokenClient = () => {
  const token = Cookies.get("accessTokenCookieMatchClient");
  return token ? token : null;
};

export const setAccessTokenClient = (token: string) =>
  Cookies.set("accessTokenCookieMatchClient", token);
