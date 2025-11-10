import React from "react";
import { ScrollSnapContainerProps, ScrollSnapItemProps } from "@/types/showcase";
import "./ScrollSnap.css";

export const ScrollSnapContainer: React.FC<ScrollSnapContainerProps> = ({
  children,
  type = "mandatory",
  axis = "y",
  className = ""
}) => {
  const scrollSnapType = axis === "both" ? `both ${type}` : `${axis} ${type}`;

  return (
    <div
      className={`scroll-snap-container ${className}`}
      style={{ scrollSnapType }}
    >
      {children}
    </div>
  );
};

export const ScrollSnapItem: React.FC<ScrollSnapItemProps> = ({
  children,
  align = "start",
  className = ""
}) => {
  return (
    <div
      className={`scroll-snap-item ${className}`}
      style={{ scrollSnapAlign: align }}
    >
      {children}
    </div>
  );
};

