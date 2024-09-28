export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api";

export const TG_INIT_DATA = process.env.NEXT_PUBLIC_TG_INIT_DATA;

export const TON_CONNECT_UI_MANIFEST_URL =
  "https://tg.greensfi.com/tonconnect-manifest.json";

export const STATUSES = [
  {
    label: "notSelected",
    value: "",
  },
  {
    label: "insearch",
    value: "insearch",
  },
  {
    label: "inlove",
    value: "inlove",
  },
];

export const SEARCH_GENDER = [
  {
    label: "notSelected",
    value: "",
  },
  {
    label: "forMale",
    value: "male",
  },
  {
    label: "forFemale",
    value: "female",
  },
];

export const GENDER = [
  {
    label: "notSelected",
    value: "",
  },
  {
    label: "male",
    value: "male",
  },
  {
    label: "female",
    value: "female",
  },
];

export const TAGS = ["musician", "marketer", "artist", "tough", "guy"];

export const SELECT_LOCATION_TYPES = [
  {
    label: "selectLocation",
    value: "select-geo",
  },
  {
    label: "detectAuto",
    value: "auto-detect",
  },
  // {
  //   label: "Выбрать вручную",
  //   value: "select-manually",
  // },
];
