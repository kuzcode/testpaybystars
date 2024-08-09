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
import { IOption } from "@/shared/interfaces";
import { setAccessTokenClient } from "@/shared/lib/cookie";
import { useModal } from "@/shared/store/useModal";
import Image from "next/image";

export const AuthForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { toggleModal } = useModal();

  const [about, setAbout] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [searchGender, setSearchGender] = React.useState("");
  const [gender, setGender] = React.useState("");

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
        <div className="mb-4">
          <h3 className="text-secondary font-bold text-[16px]">
            About your soul mate
          </h3>
          <div className="mt-4 grid grid-cols-4 gap-y-2 gap-x-3">
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <div className="w-full h-[18vw] relative">
                  <Image
                    src={"/images/girl.png"}
                    fill
                    alt="profile-img"
                    className="w-full object-cover rounded-xl"
                  />
                  <Image
                    src={"/icons/cancel.svg"}
                    width={20}
                    height={20}
                    alt="remove"
                    className="absolute top-0 right-0 -translate-y-[30%] translate-x-[30%]"
                  />
                </div>
              );
            })}
            <div className="w-full h-[18vw] border border-[#C4C4C4] rounded-xl bg-[#F5F5F5] flex items-center justify-center">
              <div className="bg-white w-8 h-8 rounded-xl flex items-center justify-center">
                <Image
                  src="/icons/greyPlus.svg"
                  width={14}
                  height={14}
                  alt="add"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-secondary font-bold text-[16px]">
            About your soul mate
          </h3>
          <div className="border border-[#000000]/40 rounded-lg p-3 mt-4">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="A few words about the person who you're looking for"
              className="placeholder-[#CCCCCC] text-secondary font-medium text-[16px] outline-none resize-none w-full h-[150px] bg-transparent"
            ></textarea>
          </div>
        </div>
        <Flex className="flex-wrap gap-2 mt-4 mb-4">
          {TAGS.map((tag, index) => {
            return (
              <span key={index} className="text-primary text-[17px]">
                {tag}
              </span>
            );
          })}
        </Flex>
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
