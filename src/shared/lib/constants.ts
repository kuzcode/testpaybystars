const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL = ((PUBLIC_BASE && PUBLIC_BASE !== "undefined") ? PUBLIC_BASE : "") + "/api";

export const TG_INIT_DATA = process.env.NEXT_PUBLIC_TG_INIT_DATA;

export const TON_CONNECT_UI_MANIFEST_URL =
  "https://peoplenearby.ru/manifest/tonconnect-manifest.json";

export const STATUSES = [
  {
    label: "communication",
    value: "anything",
  },
  {
    label: "dating",
    value: "dating",
  },
  {
    label: "love",
    value: "love",
  },
  {
    label: "friendship",
    value: "friendship",
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
  // {
  //   label: "noMatter",
  //   value: "",
  // },
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
  ACCESS_TOKEN: "accessMatchV3",
  REFRESH_TOKEN: "refreshMatchV3",
};

export const CLOUD_STORAGE = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
};

export const COOKIES = {
  ACCESS_TOKEN: "accessMatchV3",
  REFRESH_TOKEN: "refreshMatchV3",
};
