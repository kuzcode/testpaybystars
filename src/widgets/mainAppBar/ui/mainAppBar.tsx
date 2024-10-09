import React from "react";
import clsx from "clsx";
import { Flex } from "@/shared/ui/Flex";
import { Container } from "@/shared/ui/Container";
import { FireBalance } from "@/widgets/fireBalance";
import { AppBarTitle } from "./appBarTitle";
import { CustomLink } from "@/shared/ui/CustomLink";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "./backButton";

interface Props {
  text: string;
  extraText?: string;
  children?: React.ReactNode;
  shadow?: boolean;
  className?: string;
  enableScore?: boolean;
  enableBackButton?: boolean;
}

export const MainAppBar: React.FC<Props> = ({
  text,
  extraText,
  children,
  shadow = false,
  className,
  enableScore = false,
  enableBackButton,
}) => {
  return (
    <Flex
      className={clsx(
        " pt-4 pb-3 mb-4",
        {
          "shadow-sm": shadow,
        },
        className
      )}
    >
      <Container className="w-full">
        <Flex className="justify-between">
          <Flex className="gap-x-3">
            {enableBackButton && <BackButton />}
            <AppBarTitle text={text} extraText={extraText} />
          </Flex>
          <Flex className="gap-x-3">
            {children}
            {enableScore && (
              <CustomLink href="/wallet">
                <FireBalance />
              </CustomLink>
            )}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};
