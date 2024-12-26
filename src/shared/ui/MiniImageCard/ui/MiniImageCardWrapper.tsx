import clsx from "clsx";
import React from "react";

import { MiniImageUploadButton } from "./MiniImageUploadButton";

interface Props {
  className?: string;
  children: React.ReactNode;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const MiniImageCardWrapper: React.FC<Props> = ({
  className,
  children,
  onChangeImage,
  label,
}) => {
  return (
    <div className={clsx("", className)}>
      <h3 className="text-secondary font-bold text-[18px] mb-4">{label}</h3>
      <div className={clsx("grid grid-cols-4 gap-y-2 gap-x-3")}>
        {children}
        <MiniImageUploadButton onChangeImage={onChangeImage} />
      </div>
    </div>
  );
};
