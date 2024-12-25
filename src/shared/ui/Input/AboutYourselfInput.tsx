import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  label: string;
  about: string;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
}

export const AboutYourselfInput: React.FC<Props> = ({
  label,
  about,
  setAbout,
  required,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="text-secondary font-bold text-[18px]">{label}</h3>
      <div className="relative border border-[#000000]/40 rounded-lg p-3 mt-4">
        {required && (
          <h3 className="text-red-600 absolute top-[2px] right-[5px] text-base">
            *
          </h3>
        )}
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder={t("aFewWordsAboutYourSoulmate")}
          className="placeholder-[#CCCCCC] text-secondary font-medium text-[16px] outline-none resize-none w-full h-[130px] bg-transparent"
        ></textarea>
      </div>
    </div>
  );
};
