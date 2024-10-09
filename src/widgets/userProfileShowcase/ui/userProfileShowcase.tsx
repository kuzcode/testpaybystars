"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/ui/Container";
import { useSliderListener } from "@/shared/hooks/useSliderListener";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { FilterModal } from "@/app/[locale]/(bottomNavbar)/search/ui/modals/filterModal";
import { useIsClient } from "@/shared/hooks/useIsClient";
import { BaseTinderCard } from "./BaseTinderCard";

export const UserProfileShowcase = () => {
  const { t } = useTranslation();
  const { users, currentIndex, removeLastUser, reset } = useShowcase();

  const isClient = useIsClient();

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

  const formattedUsers = () => {
    const formatted = users?.map((item) => {
      return {
        ...item,
        images: [
          { fileUrl: "/images/boy.png" },
          { fileUrl: "/images/girl.png" },
          { fileUrl: "/images/boy.png" },
          { fileUrl: "/images/girl.png" },
          { fileUrl: "/images/boy.png" },
          { fileUrl: "/images/girl.png" },
        ],
      };
    });
    return formatted;
  };

  return (
    <Container className="h-full">
      <div className="h-[calc(100vh-250px)] w-full relative bg-primary rounded-xl overflow-hidden">
        {mutation.isPending && !users?.length && (
          <div className="flex items-center justify-center h-full text-white">
            {t("loading")}
          </div>
        )}
        {!mutation.isPending && !users?.length && isClient && (
          <div className="flex items-center justify-center h-full text-white">
            {t("cantFindUserNear")}
          </div>
        )}
        {formattedUsers()?.map((character, index) => {
          return (
            <>
              <BaseTinderCard
                key={character.id}
                // @ts-ignore
                character={character}
                childRefsIndex={childRefs[index]}
              />
            </>
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
