import React from "react";
import { Page } from "@/shared/ui/Page";
import { Skeleton } from "./ui/Skeleton";
import { MainAppBar } from "@/widgets/mainAppBar";
import { Container } from "@/shared/ui/Container";

const Loading = () => {
  return (
    <Page disableHeightLimit className="!to-[#DDD7F7] min-h-screen !pb-[100px]">
      <MainAppBar text={`Your matches (0)`} shadow />
      <Container>
        <Skeleton />
      </Container>
    </Page>
  );
};

export default Loading;
