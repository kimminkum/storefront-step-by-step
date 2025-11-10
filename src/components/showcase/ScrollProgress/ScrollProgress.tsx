import React from "react";
import { ScrollProgressProps } from "@/types/showcase";
import { useScrollProgress } from "@/hooks/showcase/useScrollProgress";
import "./ScrollProgress.css";

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = "top",
  height = 4,
  color = "#007aff",
  backgroundColor = "rgba(0, 0, 0, 0.1)",
  className = ""
}) => {
  const progress = useScrollProgress();

  return (
    <div
      className={`scroll-progress scroll-progress-${position} ${className}`}
      style={{
        height: `${height}px`,
        backgroundColor
      }}
    >
      <div
        className="scroll-progress-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};
