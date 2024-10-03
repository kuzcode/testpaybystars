import React from "react";
import { Page } from "@/shared/ui/Page";
import { WalletCard } from "./ui/walletCard";
import { MainAppBar } from "@/widgets/mainAppBar";
import { Container } from "@/shared/ui/Container";

const Wallet = () => {
  return (
    <Page>
      <MainAppBar text="wallet" shadow enableScore className="relative" />
      {/* <TimerBadge className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%]" /> */}
      <Container className="!mt-8">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => {
            return <WalletCard key={index} />;
          })}
        </div>
      </Container>
    </Page>
  );
};

export default Wallet;
