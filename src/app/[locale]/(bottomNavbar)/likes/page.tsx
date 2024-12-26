"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { fetchOutcomeLikes, IMyLikedUser } from "@/shared/api/usersApi";
import { Container } from "@/shared/ui/Container";
import { DismissibleCard } from "@/shared/ui/DismissibleCard";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";

import { Skeleton } from "./ui/Skeleton";
import { ConnectToUserModal } from "../search/ui/modals/connectToUserModal";

const Likes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchOutcomeLikes"],
    queryFn: () => fetchOutcomeLikes(),
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
