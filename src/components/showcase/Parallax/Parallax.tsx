import React, { useRef, useEffect, useState } from "react";
import { ParallaxProps } from "@/types/showcase";
import "./Parallax.css";

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = "vertical",
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.pageYOffset;
      const elementTop = rect.top + scrollY;
      const windowHeight = window.innerHeight;

      // Calculate offset based on scroll position
      const relativeScroll = scrollY + windowHeight / 2 - elementTop;
      const newOffset = relativeScroll * speed;

      setOffset(newOffset);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  const transform =
    direction === "vertical"
      ? `translateY(${offset}px)`
      : `translateX(${offset}px)`;

  return (
    <div ref={containerRef} className={`parallax-container ${className}`}>
      <div className="parallax-content" style={{ transform }}>
        {children}
      </div>
    </div>
  );
};
