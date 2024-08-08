import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { getAccessTokenClient } from "../lib/cookie";
import { getAccessTokenServer } from "../lib/cookieServer";

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
