"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { fetchMyProfile } from "../api/usersApi";
import { useProfile } from "../store/useProfile";

export const useFetchProfile = () => {
  const { setProfile } = useProfile();

  const { data, isSuccess, isRefetching } = useQuery({
    queryKey: ["fetchMyProfile"],
    queryFn: fetchMyProfile,
    retry: true,
  });

  React.useEffect(() => {
    if (isSuccess && !isRefetching) {
      setProfile(data);
    }
  }, [isRefetching, isSuccess]);
};
