"use client";

import React from "react";
import TinderCard from "react-tinder-card";
import { Container } from "@/shared/ui/Container";
import { TinderCardContent } from "./TinderCardContent";
import { useSliderListener } from "@/shared/hooks/useSliderListener";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { FilterModal } from "@/app/[locale]/(bottomNavbar)/search/ui/modals/filterModal";

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
    await childRefs[currentIndex].current.swipe(dir);
    // use it for animation when swipe
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
      <div className="h-[calc(100vh-250px)] w-full relative bg-primary rounded-xl overflow-hidden">
        {/* {mutation.isPending && !users?.length && (
          <div className="flex items-center justify-center h-full text-white bg-red-300/30 animate-pulse">
            Loading
          </div>
        )} */}
        {users?.map((character, index) => {
          const isOdd = index % 2 === 0;
          return (
            <TinderCard
              // @ts-ignore
              ref={childRefs[index]}
              className="absolute w-full h-full flex !pointer-events-none"
              preventSwipe={["up", "down", "right", "left"]}
              key={character.id}
            >
              <TinderCardContent character={character} isOdd={isOdd} />
            </TinderCard>
          );
        })}
      </div>

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
