"use client";

import React from "react";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Flex } from "@/shared/ui/Flex";
import { ILoginProps, login } from "../api/login";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/shared/ui/Dropdown";
import {
  GENDER,
  SEARCH_GENDER,
  STATUSES,
  TAGS,
  TG_INIT_DATA,
} from "@/shared/lib/constants";
import { ILatLng, IOption } from "@/shared/interfaces";
import {
  setAccessTokenClient,
  setRefreshTokenClient,
} from "@/shared/lib/cookie";
import { useModal } from "@/shared/store/useModal";
import Image from "next/image";
import { ProfileImageShowcaseSection } from "./ProfileImageShowcaseSection";
import { LocationSelector } from "./LocationSelector";
import { AboutYourselfInput } from "./AboutYourselfInput";
import { AuthTags } from "./AuthTags";
import { updateUserLocation } from "@/shared/api/usersApi";

export const AuthForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { toggleModal } = useModal();

  const [about, setAbout] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [searchGender, setSearchGender] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [coordinates, setCoordinates] = React.useState<ILatLng>({
    lat: 0,
    lng: 0,
  });

  const disabled = loading || !about || !status || !searchGender || !gender;

  const onChangeStatusOption = (option: IOption) => setStatus(option.value);

  const onChangeSearchGenderOption = (option: IOption) =>
    setSearchGender(option.value);

  const onChangeGenderOption = (option: IOption) => setGender(option.value);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data: ILoginProps = {
      info: about,
      reference: "",
      tg: TG_INIT_DATA || "",
      gender: gender,
      searchGender: searchGender,
      status: status,
      // tg: typeof window !== "undefined" ? window.Telegram.WebApp.initData : "",
    };

    const response = await login(data);

    if (response.accessToken) {
      const timer = setTimeout(() => {
        toggleModal("request-geo", null);
        clearTimeout(timer);
      }, 3000);
      setAccessTokenClient(response.accessToken);
      setRefreshTokenClient(response.refreshToken);

      await updateUserLocation({ lat: coordinates.lat, lng: coordinates.lng });

      router.push("/search");
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      router.prefetch("/search");
    }
  }, [router]);

  return (
    <form onSubmit={onSubmit}>
      <Card className="!py-6">
        <ProfileImageShowcaseSection />
        <AboutYourselfInput about={about} setAbout={setAbout} />

        <AuthTags />

        <div className="space-y-2">
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
          <LocationSelector setCoordinates={setCoordinates} />
        </div>
      </Card>
      <Button
        text="Continue"
        className="mt-4"
        type="submit"
        loading={loading}
        disabled={disabled}
      />
    </form>
  );
};
