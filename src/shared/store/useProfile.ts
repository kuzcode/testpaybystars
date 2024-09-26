import { create } from "zustand";
import { IProfile } from "../api/usersApi";

interface State {
  profile: IProfile;
}

interface Action {
  setProfile: (profile: IProfile) => void;
}

export const useProfile = create<State & Action>((set) => ({
  profile: {} as IProfile,
  setProfile: (profile) => set({ profile }),
}));
