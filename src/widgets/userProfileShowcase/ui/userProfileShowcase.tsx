"use client";

import React from "react";
import { Container } from "@/shared/ui/Container";
import { useSliderListener } from "@/shared/hooks/useSliderListener";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { FilterModal } from "@/app/[locale]/(bottomNavbar)/search/ui/modals/filterModal";
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
    [users]
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
      <Showcase childRefs={childRefs} mutation={mutation} />

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
