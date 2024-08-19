import React from "react";
import { IMyLikedUser, IMyMatchedUser } from "@/shared/api/usersApi";
import { RevokeLikeLayer } from "./RevokeLikeLayer";
import { LikeLayer } from "./LikeLayer";

interface Props {
  className?: string;
  user?: IMyLikedUser | IMyMatchedUser;
}

export const DismissibleCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="relative rounded-[25px]">
      <LikeLayer user={user} />
      <RevokeLikeLayer id={user?.id!} />
    </div>
  );
};
