import React from "react";
import Image from "next/image";
import { dislike } from "../api/dislikeApi";
import { useModal } from "@/shared/store/useModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatedButtonWrapper } from "@/shared/ui/wrappers/AnimatedButtonWrapper";
import { useShowcase } from "@/app/[locale]/(bottomNavbar)/search/ui/store/useShowcase";
import { useToggleReactionsActivated } from "@/app/[locale]/(bottomNavbar)/search/ui/hooks/useToggleReactionsActivated";
import { useIsEnergyLow } from "@/shared/hooks/useIsEnergyLow";

interface Props {
  userId: string | undefined;
  onChange: () => void;
}

export const DislikeButton: React.FC<Props> = ({ userId, onChange }) => {
  const queryClient = useQueryClient();
  const { toggleModal } = useModal();
  const isEnergyLow = useIsEnergyLow();
  const { reactionsActivated } = useShowcase();
  const toggleReactionsActivated = useToggleReactionsActivated();

  const mutation = useMutation({
    mutationFn: (id: string) => dislike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
    },
  });

  const onDislike = () => {
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
