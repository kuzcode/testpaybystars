"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { fetchMyProfile, IProfile } from "../api/usersApi";
import { useProfile } from "../store/useProfile";

export const useFetchProfile = () => {
  const { setProfile } = useProfile();

  const { data, isSuccess, isRefetching } = useQuery({
    queryKey: ["fetchMyProfile"],
    queryFn: fetchMyProfile,
    retry: false,
    onSuccess: (profile) => {
      setProfile(profile);
    },
    onError: () => {
      const testProfile: IProfile = {
        id: "test-user-id",
        firstName: "Test",
        lastName: "User",
        gender: null,
        status: null,
        info: null,
        latitude: 0,
        longitude: 0,
        images: [],
        dislikesAmount: 0,
        likesAmount: 0,
        energy: 100,
        fires: 0,
        rating: 0,
        searchGender: null,
        wallets: [],
        usdtBalance: 0,
      };
      setProfile(testProfile);
    },
  });

  React.useEffect(() => {
    if (isSuccess && !isRefetching && data) {
      setProfile(data);
    }
  }, [isRefetching, isSuccess, data, setProfile]);
};
