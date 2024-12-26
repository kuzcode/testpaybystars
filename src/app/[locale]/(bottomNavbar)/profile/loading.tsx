import React from "react";

import { Container } from "@/shared/ui/Container";
import { Page } from "@/shared/ui/Page";
import { CardSkeleton } from "@/shared/ui/Skeleton";
import { SkeletonWrapper } from "@/shared/ui/Skeleton/ui/SkeletonWrapper";
import { MainAppBar } from "@/widgets/mainAppBar";

const Loading = () => {
  return (
    <Page disableHeightLimit className="min-h-screen !pb-[100px]">
      <MainAppBar text={"profile"} enableScore />
      <Container>
        <SkeletonWrapper>
          <CardSkeleton height={243} />
          <CardSkeleton height={224} />
          <CardSkeleton height={300} />
        </SkeletonWrapper>
      </Container>
    </Page>
  );
};

export default Loading;
