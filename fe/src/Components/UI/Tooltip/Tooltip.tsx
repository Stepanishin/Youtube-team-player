import React, { FC } from "react";
import Paragraph from "../Paragraph/Paragraph";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children }) => {
  return (
    <div className={`absolute`}>
      <Paragraph type={ParagraphTypeEnum.p1_Small}>{children}</Paragraph>
    </div>
  );
};

export default Tooltip;
