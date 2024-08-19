import { instance } from "@/shared/api/instance";
import { ILatLng, IOption } from "@/shared/interfaces";
import { SEARCH_GENDER } from "@/shared/lib/constants";
import { Dropdown } from "@/shared/ui/Dropdown";
import axios from "axios";
import React from "react";

const getCountries = async (countryName: string) => {
  const response = await instance.get(
    `/public/meta/countries?name=${countryName}`,
    {
      headers: {
        "Accept-Language": "en",
      },
    }
  );
  return response.data;
};

const SELECT_LOCATION_TYPES = [
  {
    label: "Выберите локацию",
    value: "select-geo",
  },
  {
    label: "Определить автоматически",
    value: "auto-detect",
  },
  // {
  //   label: "Выбрать вручную",
  //   value: "select-manually",
  // },
];

interface IGetCityProps {
  address: {
    city: string;
    country: string;
    country_code: string;
  };
}

interface Props {
  className?: string;
  setCoordinates: React.Dispatch<React.SetStateAction<ILatLng>>;
}

export const LocationSelector: React.FC<Props> = ({ setCoordinates }) => {
  const [loading, setLoading] = React.useState(false);

  const [city, setCity] = React.useState("");
  const [selectManuallyEnabled, setSelectManuallyEnabled] =
    React.useState(false);

  const [countryCode, setCountryCode] = React.useState("");

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
    if (option.value === "select-manually") {
      setSelectManuallyEnabled(true);
      getCountries("a");
    }
  };

  return (
    <>
      <Dropdown
        label={
          loading ? `Локация: ищем` : city ? `Локация: ${city}` : `Локация`
        }
        options={SELECT_LOCATION_TYPES}
        onChangeOption={onChangeLocationTypeSelector}
      />

      {selectManuallyEnabled ? (
        <>
          <Dropdown
            label={`Страна`}
            options={SELECT_LOCATION_TYPES}
            onChangeOption={onChangeLocationTypeSelector}
          />
        </>
      ) : null}
    </>
  );
};
