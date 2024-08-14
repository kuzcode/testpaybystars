import { ILatLng, ILoginResponse } from "../interfaces";
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
}

export const fetchFindUsersNear = async () => {
  const resposne = await instance.get(`/users/find?distance=5`);
  return resposne.data as IUser[];
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

export const fetchMyProfile = async () => {
  const response = await instance.get(`/users`);
  return response.data;
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
