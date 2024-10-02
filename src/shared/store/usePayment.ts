import { create } from "zustand";

interface State {
  tonConnectListenerActivated: boolean;
}

interface Action {
  activateTonConnectListener: () => void;
}

export const usePayment = create<State & Action>((set) => ({
  tonConnectListenerActivated: false,
  activateTonConnectListener: () => set({ tonConnectListenerActivated: true }),
}));
