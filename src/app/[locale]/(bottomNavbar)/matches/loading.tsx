import React from "react";
import { Page } from "@/shared/ui/Page";
import { Skeleton } from "./ui/Skeleton";
import { MainAppBar } from "@/widgets/mainAppBar";
import { Container } from "@/shared/ui/Container";
import { useTranslation } from "react-i18next";

const Loading = () => {
  return (
    <Page disableHeightLimit className="!to-[#DDD7F7] min-h-screen !pb-[100px]">
      <MainAppBar text={"yourMatches"} extraText="(0)" shadow />
      <Container>
        <Skeleton />
      </Container>
    </Page>
  );
};

export default Loading;
