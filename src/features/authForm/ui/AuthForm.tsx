"use client";

import React from "react";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { ILoginProps, login } from "../api/login";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/shared/ui/Dropdown";
import {
  GENDER,
  SEARCH_GENDER,
  STATUSES,
  TG_INIT_DATA,
} from "@/shared/lib/constants";
import { ILatLng, IOption, IUploadImage } from "@/shared/interfaces";
import {
  setAccessTokenClient,
  setRefreshTokenClient,
} from "@/shared/lib/cookie";
import { useModal } from "@/shared/store/useModal";
import { ProfileImageShowcaseSection } from "./ProfileImageShowcaseSection";
import { LocationSelector } from "./LocationSelector";
import { updateUserLocation, uploadProfileImage } from "@/shared/api/usersApi";
import { usePrefetchSearchPage } from "../hooks/usePrefetchSearchPage";
import { AboutYourselfInput } from "@/shared/ui/Input/AboutYourselfInput";

export const AuthForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { toggleModal } = useModal();

  const [images, setImages] = React.useState<IUploadImage[]>([]);
  const [about, setAbout] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [searchGender, setSearchGender] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [coordinates, setCoordinates] = React.useState<ILatLng>({
    lat: 0,
    lng: 0,
  });

  const disabled = loading || !about || !status || !searchGender || !gender;

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const onChangeStatusOption = (option: IOption) => setStatus(option.value);

  const onChangeSearchGenderOption = (option: IOption) =>
    setSearchGender(option.value);

  const onChangeGenderOption = (option: IOption) => setGender(option.value);

  const uploadImages = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image.url);
    });
    await uploadProfileImage(formData);
  };

  const onSubmit = async () => {
    setLoading(true);
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
        toggleModal("request-geo", null, false);
        clearTimeout(timer);
      }, 3000);
      setAccessTokenClient(response.accessToken);
      setRefreshTokenClient(response.refreshToken);
      await uploadImages();
      await updateUserLocation({ lat: coordinates.lat, lng: coordinates.lng });

      router.push("/search");
    }

    setLoading(false);
  };

  usePrefetchSearchPage();

  return (
    <div>
      <Card className="!py-6">
        <ProfileImageShowcaseSection images={images} setImages={setImages} />
        <AboutYourselfInput
          about={about}
          setAbout={setAbout}
          label="About your soul mate"
        />

        {/* <AuthTags /> */}

        <div className="space-y-2 mt-4">
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
        type="button"
        onClick={onSubmit}
        loading={loading}
        disabled={disabled}
      />
    </div>
  );
};
