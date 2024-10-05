"use client";

import { useProfile } from "../store/useProfile";

export const useIsWalletConnected = () => {
  const { profile } = useProfile();

  if (profile?.wallets?.length) return true;

  return false;
};
