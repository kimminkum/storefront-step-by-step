import React from "react";
import Image from "next/image";
import { CurtainRevealProps } from "@/types/showcase";
import { useIntersectionObserver } from "@/hooks/showcase/useIntersectionObserver";
import "./CurtainReveal.css";

export const CurtainReveal: React.FC<CurtainRevealProps> = ({
  imageSrc,
  imageAlt = "",
  curtainColor = "#ffffff",
  triggerOffset = 0,
  className = ""
}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: `${triggerOffset}px`,
    once: true
  });

  return (
    <div
      ref={targetRef}
      className={`curtain-reveal ${
        hasIntersected ? "revealed" : ""
      } ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="curtain-image"
        unoptimized
      />
      <div
        className="curtain curtain-left"
        style={{ background: curtainColor }}
      />
      <div
        className="curtain curtain-right"
        style={{ background: curtainColor }}
      />
    </div>
  );
};
