"use client";

import { fetchFindUsersNear } from "@/shared/api/usersApi";
import { Container } from "@/shared/ui/Container";
import { ReactionButtonsGroup } from "@/widgets/reactionButtonsGroup";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

export const UserProfileShowcase = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchFindUsersNear"],
    queryFn: fetchFindUsersNear,
  });

  const [sliceFrom, setSLiceFrom] = React.useState(0);

  const onChangeLike = () => {
    setSLiceFrom((prev) => prev + 1);
  };

  console.log(data?.slice(sliceFrom, data.length + 1));

  return (
    <Container className="h-full">
      <div className="h-[calc(100vh-250px)] w-full relative bg-primary">
        {isLoading && (
          <div className="flex items-center justify-center h-full text-white">
            Loading
          </div>
        )}
        {!isLoading &&
          data?.slice(sliceFrom, data.length + 1).map((user, index) => {
            const isOdd = index % 2 === 0;

            return (
              <Image
                key={user.id}
                src={isOdd ? "/images/girl.png" : "/images/boy.png"}
                fill
                alt="girl"
                className={clsx(
                  "object-cover rounded-lg transition-all duration-1000",
                  {
                    "scale-[1]": index === 1,
                    "scale-[0.9]": index > 1,
                  }
                )}
                loading="eager"
              />
            );
          })}
      </div>
      <ReactionButtonsGroup
        isLoading={isLoading}
        users={data ? data : []}
        onChangeLike={onChangeLike}
      />
    </Container>
  );
};
