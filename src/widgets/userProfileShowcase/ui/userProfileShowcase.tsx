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
    removeLastUser,
    currentIndex,
    setCurrentIndex,
    currentUser,
    setCurrentUser,
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
    setCurrentUser(users[val + 1]);
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
      <div className="h-[calc(100vh-250px)] w-full relative bg-primary">
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
              className="absolute w-full h-full"
              key={character.firstName}
              onSwipe={() => swiped(index)}
              onCardLeftScreen={() => outOfFrame(character.firstName, index)}
            >
              <div className="relative bg-[#fff] w-full h-full b">
                <Image
                  key={character.firstName}
                  src={isOdd ? "/images/girl.png" : "/images/boy.png"}
                  fill
                  alt="girl"
                  className={"object-cover rounded-lg"}
                  loading="eager"
                />
                <h2>{character.firstName}</h2>
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
