"use client";

import React from "react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Vaul } from "@/shared/ui/modals/Vaul";
import { Dropdown } from "@/shared/ui/Dropdown";
import { useSearchParams } from "next/navigation";
import { useModal } from "@/shared/store/useModal";
import { SEARCH_PARAMS } from "@/shared/lib/searchParams";
import { GENDER, STATUSES } from "@/shared/lib/constants";
import { useSetSearchParams } from "@/shared/hooks/useSetSearchParams";
import { useTranslation } from "react-i18next";

export const FilterModal = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const setSearchParams = useSetSearchParams();
  const { isOpen, type, toggleModal } = useModal();

  const modal = isOpen && type === "search-filter";

  const status = searchParams.get(SEARCH_PARAMS.STATUS);
  const gender = searchParams.get(SEARCH_PARAMS.GENDER);

  const onClose = () => toggleModal("search-filter", null, false);

  const onChangeStatusOption = (value: string) =>
    setSearchParams(SEARCH_PARAMS.STATUS, value);

  const onChangeGenderOption = (value: string) =>
    setSearchParams(SEARCH_PARAMS.GENDER, value);

  const onSubmit = () => {
    onClose();
  };

  return (
    <Vaul isOpen={modal} onClose={onClose} className="!pb-3" height={370}>
      <div className="space-y-4">
        <Card className="space-y-4">
          <Dropdown
            label={t("status")}
            options={STATUSES}
            defultValue={STATUSES.find((item) => item.value === status)?.label}
            onChangeOption={(item) => onChangeStatusOption(item.value)}
          />
          <Dropdown
            label={t("gender")}
            options={GENDER}
            defultValue={GENDER.find((item) => item.value === gender)?.label}
            onChangeOption={(item) => onChangeGenderOption(item.value)}
          />
        </Card>
        <Button text={t("save")} onClick={onSubmit} />
      </div>
    </Vaul>
  );
};
