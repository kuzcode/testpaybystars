import { create } from "zustand";

type TModal =
  | "request-geo"
  | "connect-to-user"
  | "profile-image-remove-confirmation";

interface State {
  type: TModal;
  isOpen: boolean;
  data: any;
}

interface Action {
  toggleModal: (type: TModal, data: any, bool: boolean) => void;
}

export const useModal = create<State & Action>((set) => ({
  type: "request-geo",
  isOpen: false,
  data: null,
  toggleModal: (type, data, bool) =>
    set((state) => {
      console.log("state", state.isOpen);

      return { type, isOpen: bool, data };
    }),
}));
