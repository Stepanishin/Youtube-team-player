import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import logoLight from "@/assets/img/logoLight.png";
import logoDark from "@/assets/img/logoDark.png";

const Logo = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <img
      width="151"
      height="27"
      src={mode === "dark" ? logoDark : logoLight}
      alt="Logo of Company"
    />
  );
};

export default Logo;
