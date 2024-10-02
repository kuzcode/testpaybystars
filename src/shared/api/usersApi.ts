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
}

interface IFetchFindUsersNearProps {
  gender?: string;
  status?: string;
}

export const fetchFindUsersNear = async () => {
  const searchParams = location.search.split("?")[1];
  const urlParams = new URLSearchParams(searchParams);

  const gender = urlParams.get(SEARCH_PARAMS.GENDER) || "";
  const status = urlParams.get(SEARCH_PARAMS.STATUS) || "";
  const pageNumber = urlParams.get(SEARCH_PARAMS.PAGE_NUMBER) || "0";
  const distance = urlParams.get(SEARCH_PARAMS.DISTANCE) || "10000";
  const size = "3";

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

export interface IMyLikedUser {
  id: string;
  gender: null;
  searchGender: null;
  status: null;
  firstName: string;
  lastName: string;
  info: null;
  photoUrl: null;
  latitude: number;
  longitude: number;
  likesAmount: number;
  dislikesAmount: number;
  fires: null;
}

export const fetchUsersWhoLiked = async () => {
  const response = await instance.get(`/users/likes`);
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
}

export const fetchUsersWhoMatched = async () => {
  const response = await instance.get(`/users/matches`);
  return response.data as IMyMatchedUser[];
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
