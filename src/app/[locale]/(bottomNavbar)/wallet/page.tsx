import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { Flex } from "@/shared/ui/Flex";
import { Page } from "@/shared/ui/Page";
import { TimerBadge } from "@/shared/ui/TimerBadge";
import { MainAppBar } from "@/widgets/mainAppBar";
import Image from "next/image";
import React from "react";

const Wallet = () => {
  return (
    <Page>
      <MainAppBar text="Wallet" shadow enableScore className="relative">
        <TimerBadge className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%]" />
      </MainAppBar>
      <Container className="!mt-8">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <Card
                key={index}
                className="flex items-center justify-between border border-black/[18%] !bg-white !py-3 rounded-[25px]"
              >
                <Flex className="gap-x-4">
                  <Image
                    src={"/icons/hotPlus.svg"}
                    width={48}
                    height={48}
                    alt="hot-plus"
                    className="translate-y-0.5"
                  />
                  <div>
                    <h3 className="font-bold text-black text-[27px]">12,000</h3>
                    <h5 className="text-[#CCCCCC] font-semibold text-[13px] -translate-y-1.5">
                      $ 0.05 PER ITEM
                    </h5>
                  </div>
                </Flex>
                <div className="bg-gradient-to-b from-gradientPrimary to-gradientSecondary text-white h-[48px] rounded-[14px] w-[100px] flex items-center justify-center font-semibold text-[18px]">
                  $ 5,000
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Page>
  );
};

export default Wallet;
