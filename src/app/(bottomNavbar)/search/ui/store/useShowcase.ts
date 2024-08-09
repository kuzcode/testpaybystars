import { IUser } from "@/shared/api/usersApi";
import { create } from "zustand";

interface State {
  currentUser: IUser | null;
  currentIndex: number;
  users: IUser[];
}

interface Action {
  setCurrentUser: (user: IUser) => void;
  setCurrentIndex: (index: number) => void;
  setUsers: (users: IUser[]) => void;
  removeUserById: (id: string) => void;
  removeLastUser: () => void;
}

export const useShowcase = create<State & Action>((set) => ({
  currentUser: null,
  currentIndex: 0,
  users: [],
  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setUsers: (users: IUser[]) => set({ users: users }),
  removeUserById: (id) =>
    set((state) => {
      return {
        users: state.users.filter((user) => user.id !== id),
      };
    }),
  removeLastUser: () =>
    set((state) => {
      return {
        users: state.users.slice(0, -1),
      };
    }),
}));
