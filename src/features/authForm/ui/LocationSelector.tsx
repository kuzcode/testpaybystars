import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";

import { getCities, getCountries } from "@/shared/api/worldApi";
import { useInputFocusListener } from "@/shared/hooks/useInputFocusListener";
import {
  ILatLng,
  IOption,
  IWorldCity,
  IWorldCountry,
} from "@/shared/interfaces";
import { SELECT_LOCATION_TYPES } from "@/shared/lib/constants";
import { Dropdown } from "@/shared/ui/Dropdown";
import { SearchDropdown } from "@/shared/ui/SearchDropdown";

import { useAutoDetectLocation } from "../hooks/useAutoDetectLocation";

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

  const dropdownLabel = loading
    ? `${t("searchingLocation")}..`
    : !selectManuallyEnabled
      ? `${t("location")}: ${city}`
      : t("location");

  const getLocation = useAutoDetectLocation();

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
      getLocation({ setCity, setCoordinates, setLoading });
      setSelectManuallyEnabled(false);
    }
    if (option.value === "select-manually") {
      setSelectManuallyEnabled(true);
      setCity("");
    }
  };

  useInputFocusListener();

  return (
    <>
      <Dropdown
        label={dropdownLabel}
        options={SELECT_LOCATION_TYPES}
        onChangeOption={onChangeLocationTypeSelector}
      />

      {selectManuallyEnabled && (
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
      )}

      {selectManuallyEnabled && countryCode !== "" && (
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
      )}
    </>
  );
};
