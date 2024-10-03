"use client";

import React from "react";
import { Card } from "@/shared/ui/Card";
import { Gallery } from "./Gallery";
import { AboutYourselfInput } from "@/shared/ui/Input/AboutYourselfInput";
import { Button } from "@/shared/ui/Button";
import { Dropdown } from "@/shared/ui/Dropdown";
import { GENDER, SEARCH_GENDER, STATUSES } from "@/shared/lib/constants";
import { IOption } from "@/shared/interfaces";
import { useProfile } from "@/shared/store/useProfile";
import { isObjectEmpty } from "@/shared/lib/isObjectEmpty";
import { useTranslation } from "react-i18next";

export const EditProfileCard = () => {
  const { t } = useTranslation();
  const { profile } = useProfile();
  const [about, setAbout] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [searchGender, setSearchGender] = React.useState("");

  const onChangeStatusOption = (option: IOption) => setStatus(option.value);

  const onChangeSearchGenderOption = (option: IOption) =>
    setSearchGender(option.value);

  const onChangeGenderOption = (option: IOption) => setGender(option.value);

  React.useEffect(() => {
    if (isObjectEmpty(profile)) return;
    setAbout(profile.info || "");
    setStatus(profile.status || "");
    setGender(profile.gender || "");
    setSearchGender(profile.searchGender || "");
  }, [profile]);

  return (
    <Card>
      <Gallery />
      <div className="space-y-2 mt-4">
        <AboutYourselfInput
          about={about}
          setAbout={setAbout}
          label={t("editYourProfileInfo")}
        />
        <Dropdown
          label={t("status")}
          options={STATUSES}
          defultValue={
            STATUSES.find((item) => item.value === status)?.label || ""
          }
          onChangeOption={onChangeStatusOption}
        />
        <Dropdown
          label={t("gender")}
          options={GENDER}
          defultValue={
            GENDER.find((item) => item.value === gender)?.label || ""
          }
          onChangeOption={onChangeGenderOption}
        />
        <Dropdown
          label={t("isearch")}
          options={SEARCH_GENDER}
          defultValue={
            SEARCH_GENDER.find((item) => item.value === searchGender)?.label ||
            ""
          }
          onChangeOption={onChangeSearchGenderOption}
        />
        <Button text={t("save")} className="mt-4" />
      </div>
    </Card>
  );
};
