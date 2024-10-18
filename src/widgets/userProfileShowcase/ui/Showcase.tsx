"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { BaseTinderCard } from "./BaseTinderCard";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { useIsClient } from "@/shared/hooks/useIsClient";

interface Props {
  childRefs: React.RefObject<unknown>[];
  isPending: boolean;
}

export const Showcase: React.FC<Props> = ({ childRefs, isPending }) => {
  const { t } = useTranslation();
  const { users } = useShowcase();
  const isClient = useIsClient();

  // Memoize the users array to avoid recalculating on every render
  const memoizedUsers = React.useMemo(() => users, [users]);

  // Move the map function outside of the JSX to avoid creating new function instances on every render
  const renderUsers = () => {
    return memoizedUsers?.map((character, index) => (
      <BaseTinderCard
        key={`${character.id}${character.firstName}`}
        // @ts-ignore
        character={character}
        childRefsIndex={childRefs[index]}
      />
    ));
  };

  return (
    <div className="h-[calc(100vh-250px)] w-full relative bg-primary rounded-xl overflow-hidden">
      {isPending && !users?.length && (
        <div className="flex items-center justify-center h-full text-white">
          {t("loading")}
        </div>
      )}
      {!isPending && !users?.length && isClient && (
        <div className="flex items-center justify-center h-full text-white">
          {t("cantFindUserNear")}
        </div>
      )}
      {!!users?.length && renderUsers()}
    </div>
  );
};
