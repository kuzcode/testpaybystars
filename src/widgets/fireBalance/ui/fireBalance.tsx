"use client";

import { useProfile } from "@/shared/store/useProfile";
import { HotScoreBadge } from "@/shared/ui/HotScoreBadge";
import React from "react";

export const FireBalance = () => {
  const { profile } = useProfile();

  const { fires } = profile;

  return <HotScoreBadge count={fires || 0} />;
};
