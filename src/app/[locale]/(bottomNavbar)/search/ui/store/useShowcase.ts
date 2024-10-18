import { IUser } from "@/shared/api/usersApi";
import { create } from "zustand";

interface State {
  currentUser: IUser | null;
  currentIndex: number;
  users: IUser[];
  reactionsActivated: boolean;
  isReceivedDataEmpty: boolean;
}

interface Action {
  setCurrentUser: (user: IUser) => void;
  setCurrentIndex: (index: number) => void;
  setUsers: (users: IUser[]) => void;
  removeUserById: (id: string) => void;
  removeLastUser: () => void;
  reset: () => void;
  toggleReactionsActivated: () => void;
  setIsReceivedDataEmpty: (value: boolean) => void;
}

export const useShowcase = create<State & Action>((set) => ({
  currentUser: null,
  currentIndex: 0,
  users: [],
  reactionsActivated: true,
  isReceivedDataEmpty: false,

  setIsReceivedDataEmpty: (value) => set({ isReceivedDataEmpty: value }),

  setCurrentUser: (user) => set({ currentUser: user }),

  setCurrentIndex: (index) =>
    set((state) => ({ currentIndex: state.currentIndex + index })),

  setUsers: (users: IUser[]) => {
    const formattedUsers = users?.map((item) => ({
      ...item,
      images: [
        { fileUrl: "/images/boy.png" },
        { fileUrl: "/images/girl.png" },
        { fileUrl: "/images/boy.png" },
        { fileUrl: "/images/girl.png" },
        { fileUrl: "/images/boy.png" },
        { fileUrl: "/images/girl.png" },
      ],
    }));
    // @ts-ignore
    set((state) => ({ users: [...formattedUsers, ...state.users] }));
  },

  reset: () => set({ currentUser: null, currentIndex: 0, users: [] }),

  removeUserById: (id) =>
    set((state) => {
      return {
        users: state.users.filter((user) => user.id !== id),
      };
    }),

  removeLastUser: () => {
    set((state) => {
      return {
        currentUser: state.users[state.currentIndex - 1],
        currentIndex: state.currentIndex - 1,
      };
    });
    const timer = setTimeout(() => {
      set((state) => ({ users: state.users.slice(0, -1) }));
      clearTimeout(timer);
    }, 1000);
  },

  toggleReactionsActivated: () =>
    set((state) => ({ reactionsActivated: !state.reactionsActivated })),
}));
