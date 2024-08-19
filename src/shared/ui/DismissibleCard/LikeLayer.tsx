import React from "react";
import { Flex } from "../Flex";
import { Card } from "../Card";
import Image from "next/image";
import { HotScoreBadge } from "../HotScoreBadge";
import { useModal } from "@/shared/store/useModal";
import { IMyLikedUser, IMyMatchedUser } from "@/shared/api/usersApi";

interface Props {
  user?: IMyLikedUser | IMyMatchedUser;
}

export const LikeLayer: React.FC<Props> = ({ user }) => {
  const [swipedSize, setSwipedSize] = React.useState(0);
  const { toggleModal } = useModal((state) => state);
  const onClickSendMessage = () => toggleModal("connect-to-user", user);

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    const touchEndY = e.targetTouches[0].clientY;
    const diffX = touchStartX.current! - touchEndX.current;
    const diffY = touchStartY.current! - touchEndY;

    // Ignore vertical scrolls
    if (Math.abs(diffY) > Math.abs(diffX)) {
      return;
    }

    if (diffX > 0) {
      setSwipedSize(-80);
    } else {
      setSwipedSize(0);
    }

    if (diffX < 80) {
      setSwipedSize(-diffX);
    } else {
      setSwipedSize(-80);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diffX = touchStartX.current - touchEndX.current;
      if (diffX > 40) {
        setSwipedSize(-80);
        // Handle swipe left action
      } else if (diffX < -40) {
        setSwipedSize(0);
        // Handle swipe right action
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <Card
      className={
        "relative flex items-center justify-between border border-black/[18%] !bg-white !py-4 rounded-[25px] !pl-2.5 !pr-6 z-10 transition-all duration-500"
      }
      style={{ transform: `translateX(${swipedSize}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
  );
};
