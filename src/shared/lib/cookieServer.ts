import { cookies } from "next/headers";

export const setAccessTokenServer = (token: string) => {
  cookies().set("accessTokenCookieMatch", token, {
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
};

export const getAccessTokenServer = () => {
  const token = cookies().get("accessTokenCookieMatch")?.value;
  return token ? token : null;
};
