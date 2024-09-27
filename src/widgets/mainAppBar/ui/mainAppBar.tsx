import { Flex } from "@/shared/ui/Flex";
import { Container } from "@/shared/ui/Container";
import { FireBalance } from "@/widgets/fireBalance";
import clsx from "clsx";
import React from "react";
import Link from "next/link";

interface Props {
  text: string;
  children?: React.ReactNode;
  shadow?: boolean;
  className?: string;
  enableScore?: boolean;
}

export const MainAppBar: React.FC<Props> = ({
  text,
  children,
  shadow = false,
  className,
  enableScore = false,
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
          <Flex className="gap-x-4">
            <h3 className="font-bold text-[26px]">{text}</h3>
          </Flex>
          <Flex className="gap-x-3">
            {children}
            {enableScore && (
              <Link href={"/wallet"}>
                <FireBalance />
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};
