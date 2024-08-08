import { instance } from "@/shared/api/instance";

export const like = async (userId: string) => {
  const response = await instance.post(`/users/${userId}/like`);
  return response.data;
};
