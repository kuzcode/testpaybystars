import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

import { revokeLike } from "@/shared/api/usersApi";

interface Props {
  id: string;
}

export const RevokeLikeLayer: React.FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: () => revokeLike(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["fetchOutcomeLikes"] });
    },
  });

  const handleDislike = async () => mutation.mutate();

  return (
    <div
      onClick={handleDislike}
      className="absolute top-0 left-0 bg-[#EC686D] w-full h-full rounded-[25px] flex justify-end items-center pr-5"
    >
      <div className="flex flex-col items-center space-y-2 translate-y-1">
        <Image
          src={"/icons/whiteClose.svg"}
          width={24}
          height={24}
          alt="close"
          className=""
        />
        <h5 className="text-white font-normal text-[13px]">
          {mutation.isPending || mutation.isSuccess
            ? `${t("removing")}`
            : t("remove")}
        </h5>
      </div>
    </div>
  );
};
