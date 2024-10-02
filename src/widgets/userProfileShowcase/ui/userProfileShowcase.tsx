"use client";

import React from "react";
import Image from "next/image";
import TinderCard from "react-tinder-card";
import { Container } from "@/shared/ui/Container";
import { useSliderListener } from "@/shared/hooks/useSliderListener";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";

export const UserProfileShowcase = () => {
  const { users, currentIndex, removeLastUser } = useShowcase();

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
    const timer = setTimeout(() => {
      removeLastUser();
      clearTimeout(timer);
    }, 1000);
    // remove unused users, it's good for optimization when fetched new users

    // use it for animation when swipe
    // @ts-ignore
    await childRefs[currentIndex].current.swipe(dir);
    // use it for animation when swipe
  };

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --     SWIPING LOGICS     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  // reactions not works if currentIndex === undefined (it means no user in interface to swipe)
  const onChangeLike = () => swipe("right");
  const onChangeDislike = () => swipe("left");

  useSliderListener();

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
              key={character.firstName}
              // onSwipe={}
              preventSwipe={["up", "down", "right", "left"]}
            >
              <div className="relative bg-[#fff] w-full h-full">
                <Image
                  src={isOdd ? "/images/girl.png" : "/images/boy.png"}
                  className={"object-cover rounded-lg"}
                  key={character.firstName}
                  alt="girl"
                  fill
                />
                <div className="absolute bottom-0 pb-10 pt-2 left-0 px-4 w-full bg-gradient-to-t from-white/60 via-white/40 to-transparent backdrop-blur-sm">
                  <h2 className="text-white font-bold text-[20px] mb-2">
                    {character.firstName}
                  </h2>
                  <h4 className="text-white">
                    {character.info ||
                      "Who I’m looking for: I’m looking for is a man in his early 30s..."}
                  </h4>
                </div>
              </div>
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
      {/* <FilterModal handleSubmit={refetchMutation} /> */}
    </Container>
  );
};
