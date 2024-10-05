export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api";

export const TG_INIT_DATA = process.env.NEXT_PUBLIC_TG_INIT_DATA;

export const TON_CONNECT_UI_MANIFEST_URL =
  "https://peoplenearby.ru/manifest/tonconnect-manifest.json";

export const STATUSES = [
  {
    label: "noMatter",
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
    label: "noMatter",
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
    label: "noMatter",
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
    label: "selectManual",
    value: "select-manually",
  },
  {
    label: "detectAuto",
    value: "auto-detect",
  },
];

export const LOCAL_STORAGE = {
  AUTH_IMAGE_COUNT: "auth-image-count",
};
