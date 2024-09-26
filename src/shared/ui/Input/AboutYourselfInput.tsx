import React from "react";

interface Props {
  label: string;
  about: string;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
}

export const AboutYourselfInput: React.FC<Props> = ({
  label,
  about,
  setAbout,
}) => {
  return (
    <div>
      <h3 className="text-secondary font-bold text-[16px]">{label}</h3>
      <div className="border border-[#000000]/40 rounded-lg p-3 mt-4">
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="A few words about the person who you're looking for"
          className="placeholder-[#CCCCCC] text-secondary font-medium text-[16px] outline-none resize-none w-full h-[130px] bg-transparent"
        ></textarea>
      </div>
    </div>
  );
};
