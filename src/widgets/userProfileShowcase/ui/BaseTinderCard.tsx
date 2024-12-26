import React from "react";
import TinderCard from "react-tinder-card";

import { IUser } from "@/shared/api/usersApi";

import { SideNavigators } from "./SideNavigators";
import { TinderCardContent } from "./TinderCardContent";
import { TopImageNavigator } from "./TopImageNavigator";

interface Props {
  character: IUser;
  childRefsIndex: any;
}

export const BaseTinderCard: React.FC<Props> = ({
  character,
  childRefsIndex,
}) => {
  const swiperRef = React.useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <>
      <TinderCard
        ref={childRefsIndex}
        className="absolute w-full h-full flex !pointer-events-none"
        preventSwipe={["up", "down", "right", "left"]}
        key={character.id}
      >
        <TinderCardContent character={character} ref={swiperRef} />
        <TopImageNavigator
          images={character.images}
          ref={swiperRef}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          disableTouch
        />
      </TinderCard>
      <TopImageNavigator
        images={character.images}
        ref={swiperRef}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        hide
      />
      <SideNavigators
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        images={character.images}
        ref={swiperRef}
      />
    </>
  );
};
