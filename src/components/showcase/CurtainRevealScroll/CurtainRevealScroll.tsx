import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { CurtainRevealProps } from "@/types/showcase";
import "./CurtainRevealScroll.css";

export const CurtainRevealScroll: React.FC<CurtainRevealProps> = ({
  imageSrc,
  imageAlt = "",
  curtainColor = "#ffffff",
  className = "",
  openThreshold = 0.75
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openProgress, setOpenProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const scrollProgress = 1 - rect.top / windowHeight;
        const progress = Math.max(
          0,
          Math.min(1, scrollProgress / openThreshold)
        );
        setOpenProgress(progress);
      } else if (rect.top > windowHeight) {
        setOpenProgress(0);
      } else {
        setOpenProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [openThreshold]);

  return (
    <div ref={containerRef} className={`curtain-reveal-scroll ${className}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="curtain-image"
        unoptimized
      />
      <div
        className="curtain curtain-left"
        style={{
          background: curtainColor,
          transform: `translateX(-${openProgress * 100}%)`
        }}
      />
      <div
        className="curtain curtain-right"
        style={{
          background: curtainColor,
          transform: `translateX(${openProgress * 100}%)`
        }}
      />
    </div>
  );
};
