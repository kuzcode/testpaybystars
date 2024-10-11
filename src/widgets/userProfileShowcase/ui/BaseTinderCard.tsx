import React from "react";
import TinderCard from "react-tinder-card";
import { IUser } from "@/shared/api/usersApi";
import { TinderCardContent } from "./TinderCardContent";
import { TopImageNavigator } from "./TopImageNavigator";
import { SideNavigators } from "./SideNavigators";

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
        // @ts-ignore
        ref={childRefsIndex}
        className="absolute w-full h-full flex !pointer-events-none"
        preventSwipe={["up", "down", "right", "left"]}
        key={character.id}
      >
        {/* @ts-ignore */}
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
