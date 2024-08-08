import { instance } from "@/shared/api/instance";

export const dislike = async (userId: string) => {
  const response = await instance.post(`/users/${userId}/dislike`);
  return response.data;
};
