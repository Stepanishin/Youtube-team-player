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
    light:
      "text-primary-blackPetrol text-[20px] md:text-[24px] font-bold leading-7 md:leading-8",
    dark: "text-neutral-white text-[20px] md:text-[24px] font-bold leading-7 md:leading-8",
  },
  h1_Small: {
    light:
      "text-primary-blackPetrol text-[20px] md:text-[24px] font-bold leading-7 md:leading-8",
    dark: "text-neutral-white text-[20px] md:text-[24px] font-bold leading-7 md:leading-8",
  },
  h2_Large: {
    light:
      "text-primary-blackPetrol text-[16px] md:text-[20px] font-semibold leading-6 md:leading-7",
    dark: "text-neutral-white text-[16px] md:text-[20px] font-semibold leading-6 md:leading-7",
  },
  h2_Small: {
    light:
      "text-primary-blackPetrol text-[16px] md:text-[20px] font-semibold leading-6 md:leading-7",
    dark: "text-neutral-white text-[16px] md:text-[20px] font-semibold leading-6 md:leading-7",
  },
  h3_Default: {
    light: "text-primary-blackPetrol text-[16px] font-semibold leading-6",
    dark: "text-neutral-white text-[16px] font-semibold leading-6",
  },
  h4_Default: {
    light: "text-[12px] font-semibold leading-4",
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
    <p
      className={`${textStyle} text-${type} font-montserrat tracking-tighter ${className}`}
    >
      {children}
    </p>
  );
};

export default Heading;
