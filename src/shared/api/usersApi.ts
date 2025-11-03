import { ILatLng } from "../interfaces";
import { instance } from "./instance";
import { SEARCH_PARAMS } from "../lib/searchParams";

export interface IUser {
  usdtBalance: null | number;
  dislikesAmount: number;
  distance: number;
  firstName: string;
  gender: null;
  id: string;
  lastName: string;
  latitude: number;
  likesAmount: number;
  longitude: number;
  metric: string;
  status: null;
  contactPrice: number;
  info: string | null;
  likeReceived: boolean;
  images: IImage[];
}

interface IFetchFindUsersNearProps {
  gender?: string;
  status?: string;
}

export const fetchFindUsersNear = async (pageNumberManual: string | null) => {
  const searchParams = location.search.split("?")[1];
  const urlParams = new URLSearchParams(searchParams);

  const gender = urlParams.get(SEARCH_PARAMS.GENDER) || "";
  const status = urlParams.get(SEARCH_PARAMS.STATUS) || "";

  const pageNumber = pageNumberManual
    ? pageNumberManual
    : urlParams.get(SEARCH_PARAMS.PAGE_NUMBER) || "0";

  const distance = urlParams.get(SEARCH_PARAMS.DISTANCE) || "100000";
  const size = "10";

  const data: IFetchFindUsersNearProps = {
    ...(gender && { gender }),
    ...(status && { status }),
  };

  try {
    const resposne = await instance.post(
      `/users/find?distance=${distance}&size=${size}&page_number=${pageNumber}`,
      data,
    );
    return resposne.data as { profiles: IUser[]; total: number };
  } catch (e) {
    return { profiles: [], total: 0 };
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export interface IImage {
  fileName: string;
  fileUrl: string;
  id: string;
  main: null;
}

export interface IMyLikedUser {
  id: string;
  match: false;
  info: string;
  gender: string;
  status: string;
  lastName: string;
  firstName: string;
  spendEnergy: number;
  contactPrice: number;
  images: IImage[];
}

export const fetchOutcomeLikes = async () => {
  const pageNumber = 0;
  const size = 100;
  try {
    const response = await instance.get(
      `/users/out/likes?page_number=${pageNumber}&size=${size}`,
    );
    return response.data as IMyLikedUser[];
  } catch (e) {
    return [];
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export interface IMyMatchedUser {
  dislikesAmount: number;
  fires: number;
  firstName: string;
  gender: string;
  id: string;
  info: string;
  lastName: string;
  latitude: number;
  likesAmount: number;
  longitude: number;
  searchGender: string;
  status: string;
  images: IImage[];
  contactPrice: number;
}

export const fetchUsersWhoMatched = async () => {
  try {
    const response = await instance.get(`/users/matches`);
    return response.data as IMyMatchedUser[];
  } catch (e) {
    return [];
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const buyEnergy = async () => {
  try {
    const response = await instance.post(`/users/energy/buy`);
    return response.data;
  } catch (e) {
    return { ok: true } as any;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export interface IUpdateUserProfileProps {
  searchGender?: string | null;
  gender?: string | null;
  status?: string | null;
  info?: string;
}

export const updateUserProfile = async (data: IUpdateUserProfileProps) => {
  try {
    const response = await instance.post("/users", data);
    return response.data;
  } catch (e) {
    return { ok: true } as any;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const getUserInLikes = async () => {
  try {
    const response = await instance.get("/users/in/likes");
    return response.data;
  } catch (e) {
    return [] as any;
  }
};

export const getUserOutLikes = async () => {
  try {
    const response = await instance.get("/users/out/likes");
    return response.data;
  } catch (e) {
    return [] as any;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export interface IProfileImage {
  fileName: string;
  fileUrl: string | File;
  id: string;
}

export interface IProfile {
  dislikesAmount: number;
  energy: number;
  fires: number;
  firstName: string;
  gender: null;
  id: string;
  images: IProfileImage[];
  info: null;
  lastName: string;
  latitude: number;
  likesAmount: number;
  longitude: number;
  rating: number;
  searchGender: null;
  status: null;
  wallets: string[];
  usdtBalance: number;
}

export const fetchMyProfile = async () => {
  try {
    const response = await instance.get(`/users`);
    return response.data as IProfile;
  } catch (e) {
    const mock: IProfile = {
      id: "test-user-id",
      firstName: "Test",
      lastName: "User",
      gender: null,
      status: null,
      info: null,
      latitude: 0,
      longitude: 0,
      images: [],
      dislikesAmount: 0,
      likesAmount: 0,
      energy: 100,
      fires: 0,
      rating: 0,
      searchGender: null,
      wallets: [],
      usdtBalance: 0,
    };
    return mock;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const buyContact = async (userId: string) => {
  try {
    const response = await instance.post(`/users/${userId}/contact`);
    return response.data;
  } catch (e) {
    return { ok: true } as any;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const updateUserLocation = async ({
  lat,
  lng,
  accessToken,
}: ILatLng & { accessToken?: string }) => {
  const data = {
    x: lat,
    y: lng,
  };

  const headersConfig = {
    ...(accessToken && { "x-auth-token": `Bearer ${accessToken}` }),
  };

  try {
    const response = await instance.post(`/users/location`, data, {
      headers: headersConfig,
    });
    return response.data;
  } catch (e) {
    return { ok: true } as any;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const revokeLike = async (id: string) => {
  try {
    const response = await instance.delete(`/users/${id}/like`);
    return response.data;
  } catch (e) {
    return { ok: true } as any;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const uploadProfileImage = async (data: FormData) => {
  try {
    const response = await instance.post(`/users/images`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 600000,
    });
    return response.data;
  } catch (e) {
    return { ok: true } as any;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const deleteUserImage = async (id: string) => {
  try {
    const response = await instance.delete(`/users/images/${id}`);
    return response.status;
  } catch (e) {
    return 200;
  }
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

// const getCountries = async (countryName: string) => {
//   const response = await instance.get(
//     `/public/meta/countries?name=${countryName}`,
//     {
//       headers: {
//         "Accept-Language": "en",
//       },
//     }
//   );
//   return response.data;
// };
