"use client";

import React from "react";
import Image from "next/image";
import TinderCard from "react-tinder-card";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/shared/ui/Container";
import { fetchFindUsersNear } from "@/shared/api/usersApi";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";
import { useShowcase } from "@/app/(bottomNavbar)/search/ui/store/useShowcase";

export const UserProfileShowcase = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchFindUsersNear"],
    queryFn: fetchFindUsersNear,
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

  const currentIndexRef = React.useRef(currentIndex);

  const childRefs = React.useMemo(
    () =>
      Array(data?.length)
        .fill(0)
        .map(() => React.createRef()),
    [data]
  );

  const canSwipe = currentIndex >= 0;

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);

    setCurrentUser(users[val]);

    currentIndexRef.current = val;
  };

  const swiped = (index: number) => updateCurrentIndex(index - 1);

  const swipe = async (dir: string) => {
    if (!data?.length) return;
    const removeTimer = setTimeout(() => {
      removeLastUser();
      clearTimeout(removeTimer);
    }, 1000);
    if (canSwipe && currentIndex < data?.length) {
      // @ts-ignore
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // @ts-ignore
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --     SWIPING LOGICS     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const onChangeLike = () => swipe("right");

  const onChangeDislike = () => swipe("left");

  React.useEffect(() => {
    if (!data?.length) return;
    if (!users?.length) {
      setUsers(data);
      setCurrentIndex(data.length - 1);
    }
  }, [data]);

  React.useEffect(() => {
    if (!currentUser) {
      setCurrentUser(users[currentIndex]);
    }
  }, [users]);

  return (
    <Container className="h-full">
      <div className="h-[calc(100vh-250px)] w-full relative bg-primary rounded-xl overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center h-full text-white">
            Loading
          </div>
        )}
        {users?.map((character, index) => {
          const isOdd = index % 2 === 0;
          return (
            <TinderCard
              // @ts-ignore
              ref={childRefs[index]}
              className="absolute w-full h-full flex !pointer-events-none"
              key={character.firstName}
              onSwipe={() => swiped(index)}
              preventSwipe={["up", "down", "right", "left"]}
              // onCardLeftScreen={() => outOfFrame(character.firstName, index)}
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
        isLoading={isLoading}
        onChangeLike={onChangeLike}
        onChangeDislike={onChangeDislike}
      />
    </Container>
  );
};
