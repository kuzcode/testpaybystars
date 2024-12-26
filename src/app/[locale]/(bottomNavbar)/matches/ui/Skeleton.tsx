import React from "react";

import { CardSkeleton } from "@/shared/ui/Skeleton";
import { SkeletonWrapper } from "@/shared/ui/Skeleton/ui/SkeletonWrapper";

export const Skeleton = () => {
  return (
    <SkeletonWrapper>
      <CardSkeleton height={100} type="dismissible" />
      <CardSkeleton height={100} type="dismissible" />
      <CardSkeleton height={100} type="dismissible" />
      <CardSkeleton height={100} type="dismissible" />
    </SkeletonWrapper>
  );
};
