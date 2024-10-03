"use client";

import React from "react";
import { Page } from "@/shared/ui/Page";
import { Skeleton } from "./ui/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { MainAppBar } from "@/widgets/mainAppBar";
import { Container } from "@/shared/ui/Container";
import { DismissibleCard } from "@/shared/ui/DismissibleCard";
import { fetchUsersWhoLiked, IMyLikedUser } from "@/shared/api/usersApi";
import { ConnectToUserModal } from "../search/ui/modals/connectToUserModal";

const Likes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchUsersWhoLiked"],
    queryFn: () => fetchUsersWhoLiked(),
  });

  return (
    <>
      <Page
        disableHeightLimit
        className="!to-[#DDD7F7] min-h-screen !pb-[100px]"
      >
        <MainAppBar
          text="yourLikes"
          extraText={`(${data?.length || 0})`}
          shadow
        />
        <Container className="!mt-4">
          {/* LOADING STATE */}
          {isLoading && <Skeleton />}
          {/* DATA STATE */}
          {!isLoading && (
            <div className="space-y-2">
              {data?.map((user: IMyLikedUser) => {
                return <DismissibleCard key={user.id} user={user} />;
              })}
            </div>
          )}
        </Container>
      </Page>
      {/* MODALS */}
      <ConnectToUserModal />
    </>
  );
};

export default Likes;
