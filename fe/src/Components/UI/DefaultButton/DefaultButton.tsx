import React, { FC, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext";

interface DefaultButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const stylesByType = {
  light: {
    default: "text-button_Default bg-button-btnLight",
    hover: "hover:bg-button-btnLightHover",
    focus: "focus:ring-offset-2 focus:ring-4 focus:ring-button-btnLight",
  },
  dark: {
    default: "text-button_Default bg-button-btnDark",
    hover: "hover:bg-button-btnDarkHover",
    focus: "focus:ring-offset-2 focus:ring-2 focus:ring-button-btnDark",
  },
};

const DefaultButton: FC<DefaultButtonProps> = ({
  className = "",
  onClick,
  disabled = false,
  children,
}) => {
  const { mode } = useContext(ThemeContext);
  return (
    <button
      type="submit"
      className={`${stylesByType[mode].default} ${stylesByType[mode].hover} ${stylesByType[mode].focus} flex justify-center items-center font-nunitoSans w-full px-3 py-2 text-neutral-white rounded-[5px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
