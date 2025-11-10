import React, { useRef, useEffect, useState } from "react";
import { ImageZoomScrollProps } from "@/types/showcase";
import "./StickyImageZoom.css";

export const StickyImageZoom: React.FC<ImageZoomScrollProps> = ({
  imageSrc,
  imageAlt = "",
  initialScale = 0.1,
  finalScale = 1,
  overlayContent,
  showDimOverlay = true,
  dimOpacity = 0.6,
  className = "",
  textRevealDelay = 500
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(initialScale);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const sectionHeight = rect.height - windowHeight;
        const scrolled = Math.abs(rect.top);
        const progress = Math.min(scrolled / sectionHeight, 1);

        if (progress <= 0.7) {
          const scaleProgress = progress / 0.7;
          const newScale =
            initialScale + (finalScale - initialScale) * scaleProgress;
          setScale(newScale);
          setShowText(false);
          setIsComplete(false);
        } else if (progress <= 0.85) {
          setScale(finalScale);
          const dimProgress = (progress - 0.7) / 0.15;
          if (showDimOverlay) {
            setOverlayOpacity(dimProgress * dimOpacity);
          }
          if (!showText && dimProgress > 0.3) {
            setShowText(true);
          }
        } else {
          setScale(finalScale);
          if (showDimOverlay) {
            setOverlayOpacity(dimOpacity);
          }
          setShowText(true);
          setIsComplete(true);
        }
      } else if (rect.top > 0) {
        setScale(initialScale);
        setOverlayOpacity(0);
        setShowText(false);
        setIsComplete(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialScale, finalScale, showDimOverlay, dimOpacity, showText]);

  return (
    <div
      ref={containerRef}
      className={`sticky-image-zoom ${className}`}
      style={{ height: "300vh" }}
    >
      <div className="sticky-image-zoom-wrapper">
        <div
          className="sticky-image-zoom-image"
          style={{
            backgroundImage: `url(${imageSrc})`,
            transform: `scale(${scale})`
          }}
          role="img"
          aria-label={imageAlt}
        />

        {showDimOverlay && (
          <div
            className="sticky-image-zoom-overlay"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {overlayContent && showText && (
          <div
            className={`sticky-image-zoom-content ${showText ? "reveal" : ""}`}
          >
            {overlayContent}
          </div>
        )}
      </div>
    </div>
  );
};
