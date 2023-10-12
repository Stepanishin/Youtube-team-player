import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext";
import themeLight from "@/assets/svg/themeLight.svg";
import themeDark from "@/assets/svg/themeDark.svg";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);
  return (
    <div
      className="bg-button-btnDark relative cursor-pointer flex justify-between items-center gap-4 h-8 py-[2px] pl-2 pr-3 rounded-[50px]"
      onClick={toggle}
    >
      <img className="w-4 h-4" src={themeLight} alt="" />
      <img className="w-4 h-4" src={themeDark} alt="" />
      <div
        className="w-7 h-7 rounded-full bg-neutral-white absolute transition-all duration-300"
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      />
    </div>
  );
};

export default DarkModeToggle;
