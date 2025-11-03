import React from "react";

import { Container } from "@/shared/ui/Container";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";


const Wallet = () => {
  return (
    <Page>
      <MainAppBar
        text="wallet"
        shadow
        enableScore
        className="relative"
        enableBackButton
      />
    </Page>
  );
};

export default Wallet;
