import React from "react";
import { StickyProps } from "@/types/showcase";
import "./Sticky.css";

export const Sticky: React.FC<StickyProps> = ({
  children,
  top,
  bottom,
  zIndex = 100,
  className = ""
}) => {
  const stickyStyle: React.CSSProperties = {
    position: "sticky",
    zIndex,
    ...(top !== undefined && { top: `${top}px` }),
    ...(bottom !== undefined && { bottom: `${bottom}px` })
  };

  return (
    <div className={`sticky-component ${className}`} style={stickyStyle}>
      {children}
    </div>
  );
};

