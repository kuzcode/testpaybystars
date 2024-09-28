"use client";

import React from "react";
import Image from "next/image";
import TinderCard from "react-tinder-card";
import { useMutation } from "@tanstack/react-query";
import { Container } from "@/shared/ui/Container";
import { fetchFindUsersNear } from "@/shared/api/usersApi";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { FilterModal } from "@/app/[locale]/(bottomNavbar)/search/ui/modals/filterModal";

export const UserProfileShowcase = () => {
  const mutation = useMutation({
    mutationFn: () => fetchFindUsersNear(),
    onSuccess(data) {
      if (!data?.length) return;
      setUsers(data);
      setCurrentIndex(data.length - 1);
      setCurrentUser(data[data.length - 1]);
    },
  });

  const {
    users,
    setUsers,
    currentUser,
    currentIndex,
    removeLastUser,
    setCurrentUser,
    setCurrentIndex,
  } = useShowcase();

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --     SWIPING LOGICS     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const childRefs = React.useMemo(
    () =>
      Array(users?.length)
        .fill(0)
        .map(() => React.createRef()),
    [users]
  );

  const canSwipe = currentIndex >= 0;

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    setCurrentUser(users[val]);
  };

  const swiped = (index: number) => updateCurrentIndex(index - 1);

  const swipe = async (dir: string) => {
    if (!users?.length) return;
    const removeTimer = setTimeout(() => {
      removeLastUser();
      clearTimeout(removeTimer);
    }, 1000);
    if (canSwipe && currentIndex < users?.length) {
      // @ts-ignore
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --     SWIPING LOGICS     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const onChangeLike = () => swipe("right");

  const onChangeDislike = () => swipe("left");

  const refetchMutation = () => {
    mutation.mutate();
  };

  React.useEffect(() => {
    if (users?.length) return;

    mutation.mutate();
  }, []);

  return (
    <Container className="h-full">
      <div className="h-[calc(100vh-250px)] w-full relative bg-primary rounded-xl overflow-hidden">
        {/* {isLoading && (
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
              onSwipe={() => {
                swiped(index);
                console.log(index);
              }}
              preventSwipe={["up", "down", "right", "left"]}
            >
              <div
                onClick={() => console.log("hi")}
                className="relative bg-[#fff] w-full h-full"
              >
                <Image
                  key={character.firstName}
                  src={isOdd ? "/images/girl.png" : "/images/boy.png"}
                  fill
                  alt="girl"
                  className={"object-cover rounded-lg"}
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
      <FilterModal handleSubmit={refetchMutation} />
    </Container>
  );
};
