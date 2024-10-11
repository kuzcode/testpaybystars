import { ILatLng } from "../interfaces";
import { SEARCH_PARAMS } from "../lib/searchParams";
import { instance } from "./instance";

export interface IUser {
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

  const resposne = await instance.post(
    `/users/find?distance=${distance}&size=${size}&page_number=${pageNumber}`,
    data
  );

  return resposne.data as { profiles: IUser[]; total: number };
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
  const response = await instance.get(
    `/users/out/likes?page_number=${pageNumber}&size=${size}`
  );
  return response.data as IMyLikedUser[];
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
  const response = await instance.get(`/users/matches`);
  return response.data as IMyMatchedUser[];
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const buyEnergy = async () => {
  const response = await instance.post(`/users/energy/buy`);
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export interface IUpdateUserProfileProps {
  searchGender?: string;
  gender?: string;
  status?: string;
  info?: string;
}

export const updateUserProfile = async (data: IUpdateUserProfileProps) => {
  const response = await instance.post("/users", data);
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const getUserInLikes = async () => {
  const response = await instance.get("/users/in/likes");
  return response.data;
};

export const getUserOutLikes = async () => {
  const response = await instance.get("/users/out/likes");
  return response.data;
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
  const response = await instance.get(`/users`);
  return response.data as IProfile;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const buyContact = async (userId: string) => {
  const response = await instance.post(`/users/${userId}/contact`);
  return response.data;
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

  const response = await instance.post(`/users/location`, data, {
    headers: headersConfig,
  });
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const revokeLike = async (id: string) => {
  const response = await instance.delete(`/users/${id}/like`);
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const uploadProfileImage = async (data: FormData) => {
  const response = await instance.post(`/users/images`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 600000,
  });
  return response.data;
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export const deleteUserImage = async (id: string) => {
  const response = await instance.delete(`/users/images/${id}`);
  return response.status;
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
