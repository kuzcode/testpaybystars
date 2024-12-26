"use client";

import React from "react";

import { useProfile } from "@/shared/store/useProfile";
import { HotScoreBadge } from "@/shared/ui/HotScoreBadge";

export const FireBalance = () => {
  const { profile } = useProfile();

  const { fires } = profile;

  return <HotScoreBadge count={fires || 0} />;
};
