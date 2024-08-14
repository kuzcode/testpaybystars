import { useShowcase } from "@/app/(bottomNavbar)/search/ui/store/useShowcase";
import { DislikeButton } from "@/features/dislikeButton";
import { LikeButton } from "@/features/likeButton";
import { useModal } from "@/shared/store/useModal";
import { HotScoreBadge } from "@/shared/ui/HotScoreBadge";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  isLoading?: boolean;
  onChangeLike: () => void;
  onChangeDislike: () => void;
}

export const ReactionButtonsGroup: React.FC<Props> = ({
  className,
  isLoading,
  onChangeLike,
  onChangeDislike,
}) => {
  const { currentUser } = useShowcase();

  const { toggleModal } = useModal();

  const onChangeInLike = () => onChangeLike();

  const onChangeInDislike = () => onChangeDislike();

  const onContact = () => toggleModal("connect-to-user", currentUser);

  return (
    <div
      className={clsx(
        "flex items-center justify-center -mt-[30px] gap-x-3 relative z-[9]",
        {
          "opacity-[75%] pointer-events-none": isLoading,
          className,
        }
      )}
    >
      <DislikeButton userId={currentUser?.id!} onChange={onChangeInDislike} />
      <div
        onClick={onContact}
        className="relative w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center shadow-sm"
      >
        <Image
          priority
          src={"/icons/telegram.svg"}
          width={46}
          height={46}
          alt="telegram"
          className="-translate-x-[3px]"
        />
        <HotScoreBadge
          count={-25}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[12px] w-full scale-[0.75]"
        />
      </div>
      <LikeButton userId={currentUser?.id!} onChange={onChangeInLike} />
    </div>
  );
};
