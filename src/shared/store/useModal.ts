import { create } from "zustand";

type TModal = "request-geo" | "connect-to-user";

interface State {
  type: TModal;
  isOpen: boolean;
  data: any;
}

interface Action {
  toggleModal: (type: TModal, data: any) => void;
}

export const useModal = create<State & Action>((set) => ({
  type: "request-geo",
  isOpen: false,
  data: null,
  toggleModal: (type, data) =>
    set((state) => {
      return { type, isOpen: !state.isOpen, data };
    }),
}));
