import { instance } from "./instance";

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const getCountries = async (name: string) => {
  const lang =
    window.Telegram.WebApp.initDataUnsafe.user?.language_code === "ru"
      ? "ru"
      : "en";
  const response = await instance.get(`/public/meta/countries?name=${name}`, {
    headers: {
      "Accept-Language": lang,
    },
  });
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const getCities = async (countryCode: string, name: string) => {
  const lang =
    window.Telegram.WebApp.initDataUnsafe.user?.language_code === "ru"
      ? "ru"
      : "en";
  const response = await instance.get(
    `/public/meta/cities?country_code=${countryCode}&name=${name}`,
    {
      headers: {
        "Accept-Language": lang,
      },
    }
  );
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
