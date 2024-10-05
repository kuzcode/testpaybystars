import { instance } from "./instance";

export const fetchEnergyPrices = async () => {
  const response = await instance.get("/public/energy/prices/energy/prices");
  return response.data;
};
