import React from "react";

import { TAGS } from "@/shared/lib/constants";
import { Flex } from "@/shared/ui/Flex";

export const AuthTags = () => {
  return (
    <Flex className="flex-wrap gap-2 mt-4 mb-4">
      {TAGS.map((tag, index) => {
        return (
          <span key={index} className="text-primary text-[17px]">
            {tag}
          </span>
        );
      })}
    </Flex>
  );
};
