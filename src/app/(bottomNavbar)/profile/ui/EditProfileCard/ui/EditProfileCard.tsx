"use client";

import React from "react";
import { Card } from "@/shared/ui/Card";
import { Gallery } from "./Gallery";
import { AboutYourselfInput } from "@/shared/ui/Input/AboutYourselfInput";
import { Button } from "@/shared/ui/Button";
import { Dropdown } from "@/shared/ui/Dropdown";
import { GENDER, SEARCH_GENDER, STATUSES } from "@/shared/lib/constants";
import { IOption } from "@/shared/interfaces";

export const EditProfileCard = () => {
  const [about, setAbout] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [searchGender, setSearchGender] = React.useState("");
  const [gender, setGender] = React.useState("");

  const onChangeStatusOption = (option: IOption) => setStatus(option.value);

  const onChangeSearchGenderOption = (option: IOption) =>
    setSearchGender(option.value);

  const onChangeGenderOption = (option: IOption) => setGender(option.value);

  return (
    <Card>
      <Gallery />
      <div className="space-y-2 mt-4">
        <AboutYourselfInput
          about={about}
          setAbout={setAbout}
          label="Edit your profile info"
        />
        <Dropdown
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
        <Button text="Save Changes" className="mt-4" />
      </div>
    </Card>
  );
};
