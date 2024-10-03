import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { like } from "../api/likeApi";
import { useMutation } from "@tanstack/react-query";
import { AnimatedButtonWrapper } from "@/shared/ui/wrappers/AnimatedButtonWrapper";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { useToggleReactionsActivated } from "@/app/[locale]/(bottomNavbar)/search/ui/hooks/useToggleReactionsActivated";

interface Props {
  userId: string | undefined;
  onChange: () => void;
}

export const LikeButton: React.FC<Props> = ({ userId, onChange }) => {
  const { reactionsActivated } = useShowcase();
  const toggleReactionsActivated = useToggleReactionsActivated();

  const mutation = useMutation({
    mutationFn: (id: string) => like(id),
  });

  const onLike = () => {
    if (!reactionsActivated) return;
    if (!userId) return;
    console.log(userId);
    mutation.mutate(userId);
    onChange();

    toggleReactionsActivated();
  };

  return (
    <AnimatedButtonWrapper>
      <button
        onClick={onLike}
        className={clsx(
          "w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-sm"
        )}
      >
        <Image
          priority
          src={"/icons/greenHeart.svg"}
          width={34}
          height={34}
          alt="telegram"
        />
      </button>
    </AnimatedButtonWrapper>
  );
};
