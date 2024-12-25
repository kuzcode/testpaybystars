import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";

import { IGetCityProps, ILatLng } from "@/shared/interfaces";

interface Props {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCoordinates: React.Dispatch<React.SetStateAction<ILatLng>>;
}

export const useAutoDetectLocation = () => {
  const { t } = useTranslation();

  const getCity = async ({
    latitude,
    longitude,
    setCity,
    setLoading,
  }: {
    latitude: number;
    longitude: number;
  } & Omit<Props, "setCoordinates">) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
      );
      const data = response.data as IGetCityProps;
      const city = data?.address?.city;
      const name = data?.name;

      if (city || name) {
        if (city) {
          setCity(city);
        } else {
          setCity(name);
        }
      } else {
        setCity(t("cityNotFound"));
      }
    } catch (error) {
      console.error("Error fetching city data: ", error);
      setCity(t("cityNotFound"));
    } finally {
      setLoading(false);
    }
  };

  const getLocation = ({ setCity, setCoordinates, setLoading }: Props) => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          getCity({ latitude, longitude, setCity, setLoading });
        },
        (error) => {
          console.error("Error getting location: ", error);
          setLoading(false);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  return getLocation;
};
