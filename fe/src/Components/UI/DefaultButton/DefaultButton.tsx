import React, { FC, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext";

interface DefaultButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const stylesByType = {
  light: "text-button_Default bg-button-btnLight",
  dark: "text-button_Default bg-button-btnDark",
};

const DefaultButton: FC<DefaultButtonProps> = ({
  label,
  className = "",
  onClick,
  disabled = false,
}) => {
  const { mode } = useContext(ThemeContext);
  return (
    <button
      type="submit"
      className={`${stylesByType[mode]} w-full px-3 py-2 text-neutral-white rounded-[5px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label.toLocaleUpperCase()}
    </button>
  );
};

export default DefaultButton;
