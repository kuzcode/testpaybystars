import { create } from "zustand";

interface State {
  tonConnectListenerActivated: boolean;
  authorWalletAddress: string;
}

interface Action {
  activateTonConnectListener: () => void;
  setAuthorWalletAddress: (address: string) => void;
}

export const usePayment = create<State & Action>((set) => ({
  tonConnectListenerActivated: false,
  authorWalletAddress: "",
  activateTonConnectListener: () => set({ tonConnectListenerActivated: true }),
  setAuthorWalletAddress: (address) => set({ authorWalletAddress: address }),
}));
