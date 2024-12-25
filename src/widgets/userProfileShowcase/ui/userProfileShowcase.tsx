"use client";

import React from "react";

import { FilterModal } from "@/app/[locale]/(bottomNavbar)/search/ui/modals/filterModal";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { useSliderListener } from "@/shared/hooks/useSliderListener";
import { Container } from "@/shared/ui/Container";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";

import { Showcase } from "./Showcase";

export const UserProfileShowcase = () => {
  const { users, currentIndex, removeLastUser, reset } = useShowcase();

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --     SWIPING LOGICS     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  // needed for animation when swipe
  const childRefs = React.useMemo(
    () =>
      Array(users?.length)
        .fill(0)
        .map(() => React.createRef()),
    [users],
  );

  const swipe = async (dir: string) => {
    // remove unused users, renew currentIndex and currentUser, it's good for optimization when fetched new users
    removeLastUser();

    // @ts-ignore
    // use it for animation when swipe
    await childRefs[currentIndex].current.swipe(dir);
  };

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --     SWIPING LOGICS     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  // reactions not works if currentIndex === undefined (it means no user in interface to swipe)
  const onChangeLike = () => swipe("right");
  const onChangeDislike = () => swipe("left");

  const mutation = useSliderListener();

  const refetch = () => {
    reset();
    mutation.mutate("0");
  };

  return (
    <Container className="h-full">
      <Showcase childRefs={childRefs} isPending={mutation.isPending} />

      <ReactionButtonsGroup
        isLoading={false}
        onChangeLike={onChangeLike}
        onChangeDislike={onChangeDislike}
      />
      {/* MODALS */}
      <FilterModal handleSubmit={refetch} />
    </Container>
  );
};
