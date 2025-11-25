import React from "react";
import Image from "next/image";
import { StickyImageWithTextProps } from "@/types/showcase";
import "./StickyImageWithText.css";

export const StickyImageWithText: React.FC<StickyImageWithTextProps> = ({
  imageSrc,
  imageAlt = "",
  imagePosition = "left",
  textSections,
  className = ""
}) => {
  return (
    <div
      className={`sticky-image-with-text sticky-image-${imagePosition} ${className}`}
    >
      <div className="sticky-image-container">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="sticky-image"
          unoptimized
        />
      </div>
      <div className="sticky-text-container">
        {textSections.map((section, index) => (
          <div key={index} className="sticky-text-section">
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};
