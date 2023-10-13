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
    light: "",
    dark: "",
  },
  p1_Small: {
    light: "text-accent-gray400 font-nunitoSans",
    dark: "text-accent-gray100 font-nunitoSans  ",
  },
  p2_Default: {
    light: " font-nunitoSans",
    dark: " font-nunitoSans",
  },
  p3_Default: {
    light: "text-primary-blackPetrol font-nunitoSans",
    dark: "text-neutral-white font-nunitoSans",
  },
  p3_Bold: {
    light: "",
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

  return <p className={`${textStyle} text-${type} ${className}`}>{children}</p>;
};

export default Paragraph;
