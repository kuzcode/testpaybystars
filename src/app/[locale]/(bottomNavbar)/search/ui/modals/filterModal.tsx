"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

import { useSetSearchParams } from "@/shared/hooks/useSetSearchParams";
import { GENDER, STATUSES } from "@/shared/lib/constants";
import { SEARCH_PARAMS } from "@/shared/lib/searchParams";
import { useModal } from "@/shared/store/useModal";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Dropdown } from "@/shared/ui/Dropdown";
import { Vaul } from "@/shared/ui/modals/Vaul";

import { useShowcase } from "../store/useShowcase";

interface Props {
  handleSubmit?: () => void;
}

export const FilterModal: React.FC<Props> = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const setSearchParams = useSetSearchParams();
  const { isOpen, type, toggleModal } = useModal();

  const modal = isOpen && type === "search-filter";

  const status = searchParams.get(SEARCH_PARAMS.STATUS);
  const gender = searchParams.get(SEARCH_PARAMS.GENDER);

  const { reset } = useShowcase();

  const onClose = () => toggleModal("search-filter", null, false);

  const onChangeStatusOption = (value: string) =>
    setSearchParams(SEARCH_PARAMS.STATUS, value);

  const onChangeGenderOption = (value: string) =>
    setSearchParams(SEARCH_PARAMS.GENDER, value);

  const onSubmit = () => {
    reset();
    handleSubmit && handleSubmit(); // refetch function
    onClose();
  };

  return (
    <Vaul isOpen={modal} onClose={onClose} className="!pb-3" height={370}>
      <div className="space-y-4 overflow-y-scroll">
        <Card className="space-y-4">
          <Dropdown
            label={t("status")}
            options={STATUSES}
            defultValue={STATUSES.find((item) => item.value === status)?.label}
            onChangeOption={(item) => onChangeStatusOption(item.value)}
          />
          <Dropdown
            label={t("isearch")}
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
