import React from "react";

import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";

const Loading = () => {
  return (
    <Page disableHeightLimit className="!to-[#DDD7F7] min-h-screen !pb-[100px]">
      <MainAppBar text={`search`} enableScore />
    </Page>
  );
};

export default Loading;
