import axios from "axios";
import { BASE_URL } from "../lib/constants";
import {
  getAccessTokenClient,
  getRefreshTokenClient,
  removeAccessTokenClient,
  setAccessTokenClient,
  setRefreshTokenClient,
} from "../lib/cookie";
import { ILoginResponse } from "../interfaces";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenClient();

    if (token) {
      config.headers["x-auth-token"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        error.config.headers[
          "x-auth-token"
        ] = `Bearer ${newToken?.accessToken}`;
        return instance(error.config);
      } catch (error) {
        // window.location.href = "/createProfile";
      }
    }
  }
);

const refreshToken = async () => {
  const body = {
    refreshToken: getRefreshTokenClient(),
  };
  try {
    const response = await instance.post("/auth/refresh", body);
    const data = response.data as ILoginResponse;
    setAccessTokenClient(data.accessToken);
    setRefreshTokenClient(data.refreshToken);
    return data;
  } catch (error) {
    removeAccessTokenClient();
    removeAccessTokenClient();
    window.location.href = "/createProfile";
  }
};
