import React from "react";
import { SectionStackingProps } from "@/types/showcase";
import "./SectionStacking.css";

export const SectionStacking: React.FC<SectionStackingProps> = ({
  sections,
  stickyHeight = 0,
  gap = 0,
  className = "",
  transparent = false
}) => {
  return (
    <div
      className={`section-stacking-container ${
        transparent ? "transparent" : ""
      } ${className}`}
    >
      {sections.map((section, index) => (
        <div
          key={index}
          className="section-stacking-item"
          style={{
            top: `${stickyHeight + index * gap}px`,
            zIndex: index + 1
          }}
        >
          {section}
        </div>
      ))}
    </div>
  );
};
