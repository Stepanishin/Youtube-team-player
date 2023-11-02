import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import React, { FC, useContext } from "react";

interface DefaultTabProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

const stylesByType = {
  light: {
    default: "text-accent-gray300 bg-neutral-white",
    hover: "hover:bg-button-btnLightHover",
    focus: "focus:ring-offset-2 focus:ring-4 focus:ring-button-btnLight",
    active: "bg-accent-gray50 text-primary-blackPetrol",
  },
  dark: {
    default: "text-neutral-white bg-background-bgDark100",
    hover: "hover:bg-button-btnDarkHover",
    focus: "focus:ring-offset-2 focus:ring-2 focus:ring-button-btnDark",
    active: "bg-button-btnDark",
  },
};

const DefaultTab: FC<DefaultTabProps> = ({
  children,
  onClick,
  className,
  active = false,
}) => {
  const { mode } = useContext(ThemeContext);

  return (
    <button
      onClick={onClick}
      className={`${stylesByType[mode].default} ${stylesByType[mode].hover} ${
        stylesByType[mode].focus
      } ${
        active && stylesByType[mode].active
      } flex justify-center items-center font-nunitoSans font-bold w-auto px-3 py-2 rounded-[5px] ${className}`}
    >
      {children}
    </button>
  );
};

export default DefaultTab;
