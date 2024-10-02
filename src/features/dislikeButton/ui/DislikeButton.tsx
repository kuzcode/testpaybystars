import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { dislike } from "../api/dislikeApi";
import { AnimatedButtonWrapper } from "@/shared/ui/wrappers/AnimatedButtonWrapper";

interface Props {
  userId: string | undefined;
  onChange: () => void;
}

export const DislikeButton: React.FC<Props> = ({ userId, onChange }) => {
  const mutation = useMutation({
    mutationFn: (id: string) => dislike(id),
  });

  const onDislike = () => {
    if (!userId) return;
    mutation.mutate(userId);
    onChange();
  };

  return (
    <AnimatedButtonWrapper>
      <button
        onClick={onDislike}
        className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-sm"
      >
        <Image
          priority
          src={"/icons/close.svg"}
          width={30}
          height={30}
          alt="telegram"
        />
      </button>
    </AnimatedButtonWrapper>
  );
};
