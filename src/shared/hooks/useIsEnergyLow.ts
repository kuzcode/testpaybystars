"use client";

import { useProfile } from "../store/useProfile";

export const useIsEnergyLow = () => {
  const { profile } = useProfile();

  if (profile.energy <= 0) return true;

  return false;
};
