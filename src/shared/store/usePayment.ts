import { create } from "zustand";

import { IFirePrice } from "../interfaces";

interface State {
  firePriceList: IFirePrice[];
}

interface Action {
  setFirePriceList: (priceList: IFirePrice[]) => void;
}

export const usePayment = create<State & Action>((set) => ({
  firePriceList: [],
  setFirePriceList: (priceList) => set({ firePriceList: priceList }),
}));
