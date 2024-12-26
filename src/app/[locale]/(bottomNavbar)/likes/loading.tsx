import React from "react";

import { Container } from "@/shared/ui/Container";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";

import { Skeleton } from "./ui/Skeleton";

const Loading = () => {
  return (
    <Page disableHeightLimit className="!to-[#DDD7F7] min-h-screen !pb-[100px]">
      <MainAppBar text={`yourLikes`} extraText="(0)" shadow />
      <Container>
        <Skeleton />
      </Container>
    </Page>
  );
};

export default Loading;
