import React from "react";

import { IMyLikedUser, IMyMatchedUser } from "@/shared/api/usersApi";

import { LikeLayer } from "./LikeLayer";
import { RevokeLikeLayer } from "./RevokeLikeLayer";

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
