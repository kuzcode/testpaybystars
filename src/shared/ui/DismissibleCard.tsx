import clsx from "clsx";
import React from "react";
import { Card } from "./Card";
import { Flex } from "./Flex";
import Image from "next/image";
import { HotScoreBadge } from "./HotScoreBadge";
import { IMyLikedUser, IMyMatchedUser } from "../api/usersApi";
import { useModal } from "../store/useModal";

interface Props {
  className?: string;
  user?: IMyLikedUser | IMyMatchedUser;
}

export const DismissibleCard: React.FC<Props> = ({ user }) => {
  const { toggleModal } = useModal((state) => state);

  const onClickSendMessage = () => toggleModal("connect-to-user", user);

  return (
    <div className="relative rounded-[25px]">
      <Card
        className={clsx(
          "relative flex items-center justify-between border border-black/[18%] !bg-white !py-4 rounded-[25px] !pl-2.5 !pr-6 z-10",
          {
            // '-translate-x-24': 2 === index
          }
        )}
      >
        <Flex className="gap-x-4">
          <div className="w-[64px] h-[64px] rounded-full bg-primary relative overflow-hidden">
            <Image
              src={"/images/girl.png"}
              fill
              alt="girl"
              className="translate-y-0.5 object-cover object-top"
            />
          </div>
          {/* <Image src={'/icons/hotPlus.svg'} width={48} height={48} alt='hot-plus' className='translate-y-0.5' /> */}
          <div className="space-y-2">
            <Flex className="gap-x-2">
              <h3 className="font-bold text-black text-[20px]">
                {user?.firstName} {user?.lastName}
              </h3>
              {/* <Flex className="gap-x-1">
                <Image
                  src={"/icons/verified.svg"}
                  width={24}
                  height={24}
                  alt="verified"
                />
                <Image
                  src={"/icons/brave.svg"}
                  width={24}
                  height={24}
                  alt="brave"
                />
              </Flex> */}
            </Flex>
            <h5 className="text-[#857889] font-normal text-[12px] leading-[14px] max-w-[150px]">
              I’m looking for a man in hist early 30s...
            </h5>
          </div>
        </Flex>
        <div
          onClick={onClickSendMessage}
          className="cursor-pointer relative -translate-y-1"
        >
          <Image
            src={"/icons/telegram.svg"}
            width={44}
            height={44}
            alt="telegram"
          />
          <HotScoreBadge
            count={-12}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%] scale-[0.6] !px-1.5"
          />
        </div>
      </Card>

      <div className="absolute top-0 left-0 bg-[#EC686D] w-full h-full rounded-[25px] flex justify-end items-center pr-5">
        <div className="flex flex-col items-center space-y-2 translate-y-1">
          <Image
            src={"/icons/whiteClose.svg"}
            width={24}
            height={24}
            alt="close"
            className=""
          />
          <h5 className="text-white font-normal text-[13px]">Remove</h5>
        </div>
      </div>
    </div>
  );
};
