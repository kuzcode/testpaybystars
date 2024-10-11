"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { BaseTinderCard } from "./BaseTinderCard";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { useIsClient } from "@/shared/hooks/useIsClient";

interface Props {
  childRefs: React.RefObject<unknown>[];
  mutation: any;
}

export const Showcase: React.FC<Props> = ({ childRefs, mutation }) => {
  const { t } = useTranslation();
  const { users } = useShowcase();

  const isClient = useIsClient();

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
  );
};
