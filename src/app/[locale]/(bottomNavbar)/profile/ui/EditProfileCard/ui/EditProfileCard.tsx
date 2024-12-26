"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  IUpdateUserProfileProps,
  updateUserProfile,
} from "@/shared/api/usersApi";
import { useSuccessToast } from "@/shared/hooks/useSuccessToast";
import { IOption } from "@/shared/interfaces";
import { GENDER, SEARCH_GENDER, STATUSES } from "@/shared/lib/constants";
import { isObjectEmpty } from "@/shared/lib/isObjectEmpty";
import { useProfile } from "@/shared/store/useProfile";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Dropdown } from "@/shared/ui/Dropdown";
import { AboutYourselfInput } from "@/shared/ui/Input/AboutYourselfInput";

import { Gallery } from "./Gallery";

export const EditProfileCard = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { profile } = useProfile();
  const [info, setInfo] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [searchGender, setSearchGender] = React.useState("");
  const callSuccessToast = useSuccessToast();

  const mutation = useMutation({
    mutationFn: (data: IUpdateUserProfileProps) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyProfile"] });
      callSuccessToast();
    },
  });

  const onChangeStatusOption = (option: IOption) => setStatus(option.value);

  const onChangeSearchGenderOption = (option: IOption) =>
    setSearchGender(option.value);

  const onChangeGenderOption = (option: IOption) => setGender(option.value);

  const onSubmit = () => {
    const data: IUpdateUserProfileProps = {
      gender: gender || null,
      info,
      searchGender: searchGender || null,
      status: status || null,
    };
    mutation.mutate(data);
  };

  React.useEffect(() => {
    if (isObjectEmpty(profile)) return;
    setInfo(profile.info || "");
    setStatus(profile.status || "");
    setGender(profile.gender || "");
    setSearchGender(profile.searchGender || "");
  }, [profile]);

  return (
    <Card>
      <Gallery />
      <div className="space-y-5 mt-4">
        <div className="space-y-2">
          <AboutYourselfInput
            about={info}
            setAbout={setInfo}
            label={t("editYourProfileInfo")}
            required
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
              SEARCH_GENDER.find((item) => item.value === searchGender)
                ?.label || ""
            }
            onChangeOption={onChangeSearchGenderOption}
          />
        </div>
        <Button
          onClick={onSubmit}
          text={t("save")}
          loading={mutation.isPending}
          disabled={!info}
        />
      </div>
    </Card>
  );
};
