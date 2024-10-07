import { instance } from "./instance";

export const getFireProposalList = async () => {
  const response = await instance.get("/public/fires/prices");
  return response.data;
};
