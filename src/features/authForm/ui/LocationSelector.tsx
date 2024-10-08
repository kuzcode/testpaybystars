import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "@/shared/ui/Dropdown";
import {
  IGetCityProps,
  ILatLng,
  IOption,
  IWorldCity,
  IWorldCountry,
} from "@/shared/interfaces";
import { SELECT_LOCATION_TYPES } from "@/shared/lib/constants";
import { SearchDropdown } from "@/shared/ui/SearchDropdown";
import { useMutation } from "@tanstack/react-query";
import { getCities, getCountries } from "@/shared/api/worldApi";
import { isIOS } from "@/shared/lib/isIOS";

interface Props {
  className?: string;
  setCoordinates: React.Dispatch<React.SetStateAction<ILatLng>>;

  setSelectedCountryCode: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCityId: React.Dispatch<React.SetStateAction<string>>;
}

export const LocationSelector: React.FC<Props> = ({
  setCoordinates,
  setSelectedCountryCode,
  setSelectedCityId,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  const [city, setCity] = React.useState(""); // use it with autodetect
  const [countries, setCountries] = React.useState<IWorldCountry[]>([]);
  const [cities, setCities] = React.useState<IWorldCity[]>([]);
  const [countryCode, setCountryCode] = React.useState("");

  const [selectManuallyEnabled, setSelectManuallyEnabled] =
    React.useState(false);

  const getCity = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
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

  const countryMutation = useMutation({
    mutationFn: (name: string) => getCountries(name),
    onSuccess(data) {
      setCountries(data);
    },
  });

  const cityMutation = useMutation({
    mutationFn: (name: string) => getCities(countryCode, name),
    onSuccess(data) {
      setCities(data);
    },
  });

  const fetchCountries = (value: string) => countryMutation.mutate(value);

  const fetchCities = (value: string) => cityMutation.mutate(value);

  const onChangeCountryOption = (option: IOption) => {
    setCountryCode(option.value);
    setSelectedCountryCode(option.value);
  };

  const onChangeCityOption = (option: IOption) =>
    setSelectedCityId(option.value);

  const onChangeLocationTypeSelector = (option: IOption) => {
    if (option.value === "auto-detect") {
      getLocation();
      setSelectManuallyEnabled(false);
    }
    if (option.value === "select-manually") setSelectManuallyEnabled(true);
  };

  const handleFocus = () => {
    if (!isIOS) return;
    document.body.style.paddingBottom = "200px"; // Adjust this value as needed
  };

  const handleBlur = () => {
    document.body.style.paddingBottom = "0"; // Reset padding
  };

  React.useEffect(() => {
    // Attach event listeners
    const inputs = document.querySelectorAll("input, textarea"); // Target input fields
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    // Clean up listeners on unmount
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [selectManuallyEnabled, countryCode]);

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

      {selectManuallyEnabled ? (
        <>
          <SearchDropdown
            label={t("country")}
            options={countries?.map((country) => ({
              label: country.name,
              value: country.code,
            }))}
            onChangeInput={fetchCountries}
            onChangeOption={onChangeCountryOption}
            loading={countryMutation.isPending}
          />
        </>
      ) : null}

      {selectManuallyEnabled && countryCode !== "" ? (
        <>
          <SearchDropdown
            label={t("city")}
            options={cities?.map((city) => ({
              label: city.name,
              value: city.id.toString(),
            }))}
            onChangeInput={fetchCities}
            onChangeOption={onChangeCityOption}
            loading={cityMutation.isPending}
          />
        </>
      ) : null}
    </>
  );
};
