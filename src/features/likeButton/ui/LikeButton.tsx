import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { like } from "../api/likeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatedButtonWrapper } from "@/shared/ui/wrappers/AnimatedButtonWrapper";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { useToggleReactionsActivated } from "@/app/[locale]/(bottomNavbar)/search/ui/hooks/useToggleReactionsActivated";
import { useModal } from "@/shared/store/useModal";
import { useIsEnergyLow } from "@/shared/hooks/useIsEnergyLow";

interface Props {
  userId: string | undefined;
  onChange: () => void;
}

export const LikeButton: React.FC<Props> = ({ userId, onChange }) => {
  const queryClient = useQueryClient();
  const { toggleModal } = useModal();
  const isEnergyLow = useIsEnergyLow();
  const { reactionsActivated } = useShowcase();
  const toggleReactionsActivated = useToggleReactionsActivated();

  const mutation = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
    },
  });

  const onLike = () => {
    if (!reactionsActivated) return;
    if (!userId) return;
    if (isEnergyLow) {
      toggleModal("not-enough-energy", null, true);
      return;
    }
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
