export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api";

export const TG_INIT_DATA = process.env.NEXT_PUBLIC_TG_INIT_DATA;

export const STATUSES = [
  {
    label: "Не выбрано",
    value: "",
  },
  {
    label: "В поиске",
    value: "insearch",
  },
  {
    label: "Влюблен(а)",
    value: "inlove",
  },
];

export const SEARCH_GENDER = [
  {
    label: "Не выбрано",
    value: "",
  },
  {
    label: "Мужчину",
    value: "male",
  },
  {
    label: "Женщину",
    value: "female",
  },
];

export const GENDER = [
  {
    label: "Не выбрано",
    value: "",
  },
  {
    label: "Мужчина",
    value: "male",
  },
  {
    label: "Женщина",
    value: "female",
  },
];

export const TAGS = ["musician", "marketer", "artist", "tough", "guy"];
