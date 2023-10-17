import React, { FC } from "react";
import Paragraph from "../Paragraph/Paragraph";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children }) => {
  return (
    <Paragraph className="absolute" type={ParagraphTypeEnum.p1_Small}>
      {children}
    </Paragraph>
  );
};

export default Tooltip;
