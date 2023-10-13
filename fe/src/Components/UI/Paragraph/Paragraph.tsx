import { ThemeContext } from "@/context/ThemeContext/ThemeContext";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";
import React, { FC, useContext } from "react";

interface ParagraphProps {
  type:
    | ParagraphTypeEnum.p1_Large
    | ParagraphTypeEnum.p1_Small
    | ParagraphTypeEnum.p2_Default
    | ParagraphTypeEnum.p3_Default
    | ParagraphTypeEnum.p3_Bold;
  children: React.ReactNode;
  className?: string;
}

const textStyles = {
  p1_Large: {
    light: "text-[16px] font-normal leading-6",
    dark: "text-[16px] font-normal leading-6",
  },
  p1_Small: {
    light:
      "text-accent-gray400 font-nunitoSans text-[14px] font-normal leading-5",
    dark: "text-accent-gray100 font-nunitoSans text-[14px] font-normal leading-5",
  },
  p2_Default: {
    light: " font-nunitoSans text-[14px] font-normal leading-5",
    dark: " font-nunitoSans text-[14px] font-normal leading-5",
  },
  p3_Default: {
    light:
      "text-primary-blackPetrol font-nunitoSans text-[12px] font-normal leading-4",
    dark: "text-neutral-white font-nunitoSans text-[12px] font-normal leading-4",
  },
  p3_Bold: {
    light: "text-[12px] font-bold leading-4",
    dark: "",
  },
};

const Paragraph: FC<ParagraphProps> = ({
  type = ParagraphTypeEnum.p2_Default,
  children,
  className = "",
}) => {
  const { mode } = useContext(ThemeContext);

  const textStyle = textStyles[type][mode];

  return (
    <p className={`${textStyle} text-${type}  tracking-tighter ${className}`}>
      {children}
    </p>
  );
};

export default Paragraph;
