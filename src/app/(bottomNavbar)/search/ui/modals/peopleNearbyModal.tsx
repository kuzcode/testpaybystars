"use client";

import React from "react";
import Image from "next/image";
import { useModal } from "@/shared/store/useModal";
import { Button } from "@/shared/ui/Button";
import { Vaul } from "@/shared/ui/modals/Vaul";

interface IGEO {
  latitude: number;
  longitude: number;
}

export const PeopleNearbyModal = () => {
  const [geo, setGeo] = React.useState<IGEO | null>(null);
  const { isOpen, type, toggleModal } = useModal((state) => state);

  const modal = isOpen && type === "request-geo";

  const onClose = () => {
    // if (!geo) {
    //   requestGEO;
    // }
    // if (geo) {
    toggleModal(type, null, false);
    // }
  };

  // const requestGEO = () => {
  //   if (navigator.geolocation) {
  //     console.log(navigator);
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         console.log(pos.coords.latitude);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // };

  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log(`Position`, position);

  //     const { latitude, longitude } = position.coords;
  //     const geo = { latitude, longitude };
  //     setGeo(geo);
  //     console.log(geo);
  //     toggleModal("request-geo", null);

  //     // setLocation(position.coords);
  //     // setError(null);
  //   },
  //   (err) => {
  //     console.log(err);
  //     console.log("error");

  //     // setError(err.message);
  //     // setLocation(null);
  //   }
  // );

  // React.useEffect(() => {
  //   if (geo) {
  //     onClose;
  //   }
  // }, [geo]);

  return (
    <Vaul isOpen={modal} onClose={onClose}>
      <Image
        src={"/icons/circularPeopleNearby.svg"}
        width={150}
        height={150}
        alt="filter"
        className="mx-auto"
      />

      <div className="text-center space-y-6">
        <h3 className="font-bold text-[27px]">People Nearby</h3>
        <div className="space-y-4">
          <p className="text-[#857889]">
            You can quickly contact those who are near you and have entered this
            section, as well as find local groups.
          </p>
          <p className="text-[#857889]">
            To do this, you need to allow the application to access the
            location.
          </p>
        </div>
      </div>

      <Button onClick={() => {}} text="Allow access" />
    </Vaul>
  );
};
