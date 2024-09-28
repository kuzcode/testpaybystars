import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "@/shared/ui/Dropdown";
import { IGetCityProps, ILatLng, IOption } from "@/shared/interfaces";
import { SELECT_LOCATION_TYPES } from "@/shared/lib/constants";

interface Props {
  className?: string;
  setCoordinates: React.Dispatch<React.SetStateAction<ILatLng>>;
}

export const LocationSelector: React.FC<Props> = ({ setCoordinates }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  const [city, setCity] = React.useState("");
  const [selectManuallyEnabled, setSelectManuallyEnabled] =
    React.useState(false);

  const getCity = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
      );
      const data = response.data as IGetCityProps;
      if (data && data.address && data.address.city) {
        setCity(`${data.address.city}`);
      } else {
        setCity("City not found");
      }
    } catch (error) {
      console.error("Error fetching city data: ", error);
      setCity("Error fetching city");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);

          setCoordinates({ lat: latitude, lng: longitude });
          getCity(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const onChangeLocationTypeSelector = (option: IOption) => {
    if (option.value === "auto-detect") {
      getLocation();
      setSelectManuallyEnabled(false);
    }
    // if (option.value === "select-manually") {
    //   setSelectManuallyEnabled(true);
    //   getCountries("a");
    // }
  };

  return (
    <>
      <Dropdown
        label={
          loading
            ? `${t("searchingLocation")}..`
            : city
            ? `${t("location")}: ${city}`
            : t("location")
        }
        options={SELECT_LOCATION_TYPES}
        onChangeOption={onChangeLocationTypeSelector}
      />

      {/* {selectManuallyEnabled ? (
        <>
          <Dropdown
            label={`Страна`}
            options={SELECT_LOCATION_TYPES}
            onChangeOption={onChangeLocationTypeSelector}
          />
        </>
      ) : null} */}
    </>
  );
};
