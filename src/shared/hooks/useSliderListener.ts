import React from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchFindUsersNear } from "../api/usersApi";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { useSetSearchParams } from "./useSetSearchParams";
import { useSearchParams } from "next/navigation";
import { SEARCH_PARAMS } from "../lib/searchParams";

export const useSliderListener = () => {
  const searchParams = useSearchParams();
  const setSearchParams = useSetSearchParams();

  const {
    users,
    setUsers,
    currentIndex,
    setCurrentUser,
    setCurrentIndex,
    // isReceivedDataEmpty,
    // setIsReceivedDataEmpty,
  } = useShowcase();

  const mutation = useMutation({
    mutationFn: (pageNumber: string | null) => fetchFindUsersNear(pageNumber),
    onSuccess(data) {
      const profiles = data?.profiles;
      if (!profiles?.length) {
        // setIsReceivedDataEmpty(true);
        return;
      }
      const length = data.total - 1;
      setUsers(profiles); // done
      const combined = [...profiles, ...users];

      if (currentIndex === 0) {
        setCurrentIndex(length); // done
        setCurrentUser(combined[currentIndex + length]); // done
      } else {
        setCurrentIndex(length + 1); // + 1 used for correct work of animation
        setCurrentUser(combined[currentIndex + length + 1]); // + 1 used for correct combine new users in swiper
      }
    },
  });

  React.useEffect(() => {
    if (users?.length) return;
    mutation.mutate(null);
  }, []);

  React.useEffect(() => {
    const currentPage = searchParams.get(SEARCH_PARAMS.PAGE_NUMBER) || "0";
    // const currentDistance = searchParams.get(SEARCH_PARAMS.DISTANCE);
    const currentPageNumber = Number(currentPage) + 1;

    if (currentIndex === 4) {
      setSearchParams(SEARCH_PARAMS.PAGE_NUMBER, currentPageNumber.toString());

      // const timer = setTimeout(() => {
      mutation.mutate(currentPageNumber.toString());
      //   clearTimeout(timer);
      // }, 1000);
    }
  }, [currentIndex]);

  return mutation;
};
