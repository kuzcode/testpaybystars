import { create } from "zustand";
import { IFirePrice } from "../interfaces";

interface State {
  tonConnectListenerActivated: boolean;
  authorWalletAddress: string;
  firePriceList: IFirePrice[];
}

interface Action {
  activateTonConnectListener: () => void;
  setAuthorWalletAddress: (address: string) => void;
  setFirePriceList: (priceList: IFirePrice[]) => void;
}

export const usePayment = create<State & Action>((set) => ({
  tonConnectListenerActivated: false,
  authorWalletAddress: "",
  firePriceList: [],
  activateTonConnectListener: () => set({ tonConnectListenerActivated: true }),
  setAuthorWalletAddress: (address) => set({ authorWalletAddress: address }),
  setFirePriceList: (priceList) => set({ firePriceList: priceList }),
}));
