import React, { useState, useRef, useEffect } from "react";
import { ImageComparisonProps } from "@/types/showcase";
import "./ImageComparison.css";

export const ImageComparison: React.FC<ImageComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = ""
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0]?.clientX || 0);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchend", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`image-comparison ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="comparison-image comparison-before">
        <img src={beforeImage} alt={beforeLabel} />
        <span className="comparison-label">{beforeLabel}</span>
      </div>

      <div
        className="comparison-image comparison-after"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={afterImage} alt={afterLabel} />
        <span className="comparison-label">{afterLabel}</span>
      </div>

      <div
        className="comparison-slider"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="slider-button">
          <span>&lt;</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};
