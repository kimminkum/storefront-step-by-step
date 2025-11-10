import React, { useRef, useEffect } from "react";
import { HorizontalScrollSectionProps } from "@/types/showcase";
import "./HorizontalScrollSection.css";

export const HorizontalScrollSection: React.FC<
  HorizontalScrollSectionProps
> = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!container || !scrollContainer) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = container.clientWidth;
      const maxScroll = scrollWidth - containerWidth;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const progress =
          Math.abs(rect.top) / (rect.height - window.innerHeight);
        const scrollAmount = progress * maxScroll;
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalHeight = children.length * 100;

  return (
    <div
      ref={containerRef}
      className={`horizontal-scroll-section ${className}`}
      style={{ height: `${totalHeight}vh` }}
    >
      <div className="horizontal-scroll-sticky">
        <div ref={scrollContainerRef} className="horizontal-scroll-container">
          {children.map((child, index) => (
            <div key={index} className="horizontal-scroll-item">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

