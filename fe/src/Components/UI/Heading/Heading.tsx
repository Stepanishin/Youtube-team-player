import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import React, { FC, useContext } from "react";

interface HeadingProps {
  type:
    | HeadingTypeEnum.h1_Large
    | HeadingTypeEnum.h1_Small
    | HeadingTypeEnum.h2_Large
    | HeadingTypeEnum.h2_Small
    | HeadingTypeEnum.h3_Default
    | HeadingTypeEnum.h4_Default;
  children: React.ReactNode;
  className?: string;
}

const textStyles = {
  h1_Large: {
    light: "text-primary-blackPetrol",
    dark: "text-neutral-white",
  },
  h1_Small: {
    light: "text-primary-blackPetrol",
    dark: "text-neutral-white",
  },
  h2_Large: {
    light: "text-primary-blackPetrol",
    dark: "text-neutral-white",
  },
  h2_Small: {
    light: "text-primary-blackPetrol",
    dark: "text-neutral-white",
  },
  h3_Default: {
    light: "text-primary-blackPetrol",
    dark: "text-neutral-white",
  },
  h4_Default: {
    light: "",
    dark: "",
  },
};

const Heading: FC<HeadingProps> = ({
  type = HeadingTypeEnum.h3_Default,
  children,
  className = "",
}) => {
  const { mode } = useContext(ThemeContext);

  const textStyle = textStyles[type][mode];

  return (
    <p className={`${textStyle} text-${type} font-montserrat ${className}`}>
      {children}
    </p>
  );
};

export default Heading;
