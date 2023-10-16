import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import React, { FC, useContext } from "react";

interface SearchInputProps {
  searchTerm: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  searchTerm,
  handleChange,
  placeholder,
}) => {
  const { mode } = useContext(ThemeContext);

  const themeStyles = {
    dark: {
      bg: "background-bgDark100",
      border: "accent-gray300",
      activeBorder: "focus:border-accent-gray100",
      text: "text-neutral-white font-nunitoSans text-[16px] font-normal leading-6",
    },
    light: {
      bg: "neutral-white",
      border: "accent-gray100",
      activeBorder: "focus:border-accent-gray300",
      text: "text-primary-blackPetrol font-nunitoSans text-[16px] font-normal leading-6",
    },
  };

  const currentTheme = themeStyles[mode];

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      className={`border border-${currentTheme.border} rounded-md w-full h-9 bg-${currentTheme.bg} pl-4 ${currentTheme.text} focus:outline-none ${currentTheme.activeBorder} focus:shadow-none focus:ring-0`}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
