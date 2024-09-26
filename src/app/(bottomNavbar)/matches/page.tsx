"use client";

import { fetchUsersWhoMatched, IMyMatchedUser } from "@/shared/api/usersApi";
import { Container } from "@/shared/ui/Container";
import { DismissibleCard } from "@/shared/ui/DismissibleCard";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "./ui/Skeleton";

const MatchesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchUsersWhoMatched"],
    queryFn: () => fetchUsersWhoMatched(),
  });

  return (
    <Page disableHeightLimit className="!to-[#DDD7F7] !pb-[100px] min-h-screen">
      <MainAppBar text={`Your matches (${data?.length || 0})`} shadow />
      <Container className="!mt-4">
        {/* LOADING STATE */}
        {isLoading && <Skeleton />}
        {/* DATA STATE */}
        {!isLoading && (
          <div className="space-y-2">
            {data?.map((user: IMyMatchedUser) => {
              return <DismissibleCard key={user.id} user={user} />;
            })}
          </div>
        )}
      </Container>
    </Page>
  );
};

export default MatchesPage;
