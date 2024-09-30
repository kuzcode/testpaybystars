import { instance } from "@/shared/api/instance";
import { ILoginResponse } from "@/shared/interfaces";

export interface ILoginProps {
  info: string;
  reference: string;
  tg: string;
  gender?: string;
  searchGender?: string;
  status?: string;
  cityId?: string;
  countryCode?: string;
}

export const login = async (data: ILoginProps) => {
  const response = await instance.post(`/auth/login`, data);
  const result = response.data as ILoginResponse;
  return result;
};
