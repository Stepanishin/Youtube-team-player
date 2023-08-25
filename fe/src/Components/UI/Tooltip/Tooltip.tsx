import React, { FC } from "react";
import "./Tooltip.css";

const Tooltip: FC<any> = ({ children }) => {
  return <div className="tooltip">{children}</div>;
};

export default Tooltip;
