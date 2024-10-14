import { instance } from "./instance";

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const getCountries = async (name: string) => {
  const userLang = window.Telegram.WebApp.initDataUnsafe.user?.language_code;
  const lang = userLang === "ru" ? "ru" : userLang === "ua" ? "ru" : "en";
  const response = await instance.get(`/public/meta/countries?name=${name}`, {
    headers: {
      "Accept-Language": lang,
    },
  });
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const getCities = async (countryCode: string, name: string) => {
  const userLang = window.Telegram.WebApp.initDataUnsafe.user?.language_code;
  const lang = userLang === "ru" ? "ru" : userLang === "ua" ? "ru" : "en";
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
