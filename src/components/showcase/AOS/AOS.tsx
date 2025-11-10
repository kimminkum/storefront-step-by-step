import React from "react";
import { AOSProps } from "@/types/showcase";
import { useIntersectionObserver } from "@/hooks/showcase/useIntersectionObserver";
import "./AOS.css";

export const AOS: React.FC<AOSProps> = ({
  children,
  animation = "fade-up",
  duration = 600,
  delay = 0,
  once = true,
  offset = 0,
  className = ""
}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: `${offset}px`,
    once
  });

  return (
    <div
      ref={targetRef}
      className={`aos-component aos-${animation} ${
        hasIntersected ? "aos-animate" : ""
      } ${className}`}
      style={
        {
          "--aos-duration": `${duration}ms`,
          "--aos-delay": `${delay}ms`
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
