import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { like } from "../api/likeApi";
import { useMutation } from "@tanstack/react-query";
import { AnimatedButtonWrapper } from "@/shared/ui/wrappers/AnimatedButtonWrapper";

interface Props {
  userId: string;
  onChange: () => void;
}

export const LikeButton: React.FC<Props> = ({ userId, onChange }) => {
  const mutation = useMutation({
    mutationFn: (id: string) => like(id),
  });

  const onLike = () => {
    mutation.mutate(userId);
    onChange();
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
