import React from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchFindUsersNear } from "../api/usersApi";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";

export const useSliderListener = () => {
  const {
    users,
    setUsers,
    currentUser,
    currentIndex,
    removeLastUser,
    setCurrentUser,
    setCurrentIndex,
  } = useShowcase();

  const mutation = useMutation({
    mutationFn: () => fetchFindUsersNear(),
    onSuccess(data) {
      const profiles = data?.profiles;
      if (!profiles?.length) return;
      setUsers(profiles);
      setCurrentIndex(profiles.length - 1);
      setCurrentUser(profiles[profiles.length - 1]);
    },
  });

  React.useEffect(() => {
    if (users?.length) return;
    mutation.mutate();
  }, []);
};
