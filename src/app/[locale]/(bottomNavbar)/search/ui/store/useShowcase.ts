import { IUser } from "@/shared/api/usersApi";
import { create } from "zustand";

interface State {
  currentUser: IUser | null;
  currentIndex: number;
  users: IUser[];
  reactionsActivated: boolean;
}

interface Action {
  setCurrentUser: (user: IUser) => void;
  setCurrentIndex: (index: number) => void;
  setUsers: (users: IUser[]) => void;
  removeUserById: (id: string) => void;
  removeLastUser: () => void;
  reset: () => void;
  toggleReactionsActivated: () => void;
}

export const useShowcase = create<State & Action>((set) => ({
  currentUser: null,
  currentIndex: 0,
  users: [],
  reactionsActivated: true,
  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setUsers: (users: IUser[]) => set({ users: users }),
  reset: () => set({ currentUser: null, currentIndex: 0, users: [] }),
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
        currentUser: state.users[state.currentIndex - 1],
        currentIndex: state.currentIndex - 1,
      };
    }),
  toggleReactionsActivated: () =>
    set((state) => ({ reactionsActivated: !state.reactionsActivated })),
}));
