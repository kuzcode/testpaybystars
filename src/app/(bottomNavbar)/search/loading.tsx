import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import React from "react";

const Loading = () => {
  // return <div className="bg-red-300 w-screen h-screen">Loading</div>;
  return (
    <Page disableHeightLimit className="!to-[#DDD7F7] min-h-screen !pb-[100px]">
      <MainAppBar text={`Search`} enableScore />
    </Page>
  );
};

export default Loading;
