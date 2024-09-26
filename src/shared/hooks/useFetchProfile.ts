"use client";

import React from "react";
import { useProfile } from "../store/useProfile";
import { fetchMyProfile } from "../api/usersApi";
import { useQuery } from "@tanstack/react-query";

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
