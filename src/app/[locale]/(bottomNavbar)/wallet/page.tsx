import React from "react";
import { Page } from "@/shared/ui/Page";
import { MainAppBar } from "@/widgets/mainAppBar";
import { Container } from "@/shared/ui/Container";
import { WalletCardList } from "./ui/walletCardList";

const Wallet = () => {
  return (
    <Page>
      <MainAppBar text="wallet" shadow enableScore className="relative" />
      {/* <TimerBadge className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%]" /> */}
      <Container className="!mt-8">
        <WalletCardList />
      </Container>
    </Page>
  );
};

export default Wallet;
