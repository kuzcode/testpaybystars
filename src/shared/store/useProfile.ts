import { create } from "zustand";

import { IProfile } from "../api/usersApi";

interface State {
  profile: IProfile;
  pendingProfileImages: number;
}

interface Action {
  setProfile: (profile: IProfile) => void;
  setPendingProfileImages: (length: number) => void;
}

export const useProfile = create<State & Action>((set) => ({
  profile: {} as IProfile,
  pendingProfileImages: 0,
  setProfile: (profile) => set({ profile }),
  setPendingProfileImages: (length) => set({ pendingProfileImages: length }),
}));
