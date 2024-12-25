"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { updateUserLocation, uploadProfileImage } from "@/shared/api/usersApi";
import { ILatLng, IOption, IUploadImage } from "@/shared/interfaces";
import { GENDER, SEARCH_GENDER, STATUSES } from "@/shared/lib/constants";
import {
  setAccessTokenClient,
  setRefreshTokenClient,
} from "@/shared/lib/cookie";
import { getTelegramInitData } from "@/shared/lib/getTelegramInitData";
import { useModal } from "@/shared/store/useModal";
import { useProfile } from "@/shared/store/useProfile";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Dropdown } from "@/shared/ui/Dropdown";
import { AboutYourselfInput } from "@/shared/ui/Input/AboutYourselfInput";

import { LocationSelector } from "./LocationSelector";
import ProfileImageShowcaseSection from "./ProfileImageShowcaseSection";
import { ILoginProps, login } from "../api/login";
import { usePrefetchSearchPage } from "../hooks/usePrefetchSearchPage";
import { useTokenSetter } from "../hooks/useTokenSetter";

export const AuthForm = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { toggleModal } = useModal();
  const { setPendingProfileImages } = useProfile();
  const tokenSetter = useTokenSetter();

  const [images, setImages] = React.useState<IUploadImage[]>([]);
  const [about, setAbout] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [searchGender, setSearchGender] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [coordinates, setCoordinates] = React.useState<ILatLng>({
    lat: 0,
    lng: 0,
  });

  const [selectedCountryCode, setSelectedCountryCode] = React.useState("");
  const [selectedCityId, setSelectedCityId] = React.useState("");

  const disabled =
    loading || !about || (selectedCityId === "" && coordinates.lat === 0);

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const onChangeStatusOption = (option: IOption) => setStatus(option.value);

  const onChangeSearchGenderOption = (option: IOption) =>
    setSearchGender(option.value);

  const onChangeGenderOption = (option: IOption) => setGender(option.value);

  const uploadImages = async () => {
    if (!images.length) return;

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image.url);
    });
    try {
      await uploadProfileImage(formData);
      queryClient.refetchQueries({ queryKey: ["fetchMyProfile"] });
    } catch (error) {
      // toast.error("Uploading profile image error");
      toast.error("Uploading profile image error");
    } finally {
      setPendingProfileImages(0);
    }
  };

  const createLoginData = () => {
    const telegramInitData = getTelegramInitData();
    const data: ILoginProps = {
      info: about,
      reference: "",
      tg: telegramInitData,
      ...(gender && { gender }),
      ...(searchGender && { searchGender }),
      ...(status && { status }),
      ...(selectedCityId && {
        cityId: selectedCityId,
        countryCode: selectedCountryCode,
      }),
    };
    return data;
  };

  const handleSuccessLogin = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    const timer = setTimeout(() => {
      toggleModal("request-geo", null, false);
      clearTimeout(timer);
    }, 3000);

    tokenSetter({
      accessToken,
      refreshToken,
    });

    setAccessTokenClient(accessToken);
    setRefreshTokenClient(refreshToken);

    uploadImages();

    await updateUserLocation({ lat: coordinates.lat, lng: coordinates.lng });

    router.push("/search");
  };

  const onSubmit = async () => {
    setLoading(true);
    const data = createLoginData();
    const response = await login(data);
    if (response.accessToken) {
      const { accessToken, refreshToken } = response;
      await handleSuccessLogin(accessToken, refreshToken);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setPendingProfileImages(images.length);
  }, [images]);

  usePrefetchSearchPage();

  return (
    <div id="form">
      <Card className="!py-6">
        <ProfileImageShowcaseSection
          images={images}
          setImages={setImages}
          className="!mt-0"
        />
        <AboutYourselfInput
          about={about}
          setAbout={setAbout}
          label={t("aboutYourSoulmate")}
          required
        />

        {/* <AuthTags /> */}

        <div className="space-y-2 mt-4">
          <LocationSelector
            setCoordinates={setCoordinates}
            setSelectedCityId={setSelectedCityId}
            setSelectedCountryCode={setSelectedCountryCode}
          />
          <Dropdown
            label={t("status")}
            options={STATUSES}
            onChangeOption={onChangeStatusOption}
          />
          <Dropdown
            label={t("myGender")}
            options={GENDER}
            onChangeOption={onChangeGenderOption}
          />
          <Dropdown
            label={t("isearch")}
            options={SEARCH_GENDER}
            onChangeOption={onChangeSearchGenderOption}
          />
        </div>
      </Card>
      <Button
        text={t("continue")}
        className="mt-4"
        type="button"
        onClick={onSubmit}
        loading={loading}
        disabled={disabled}
      />
    </div>
  );
};
