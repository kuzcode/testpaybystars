import { GENDER, SEARCH_GENDER, STATUSES } from "@/shared/lib/constants";
import { Dropdown } from "@/shared/ui/Dropdown";
import React from "react";
import { LocationSelector } from "./LocationSelector";

export const DropdownsSection = () => {
  return (
    <div className="space-y-2">
      {/* <Dropdown
        label="Статус"
        options={STATUSES}
        onChangeOption={onChangeStatusOption}
      />
      <Dropdown
        label="Пол"
        options={GENDER}
        onChangeOption={onChangeGenderOption}
      />
      <Dropdown
        label="Ищу"
        options={SEARCH_GENDER}
        onChangeOption={onChangeSearchGenderOption}
      />
      <LocationSelector /> */}
    </div>
  );
};
