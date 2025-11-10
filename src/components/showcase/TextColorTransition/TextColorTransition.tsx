import React, { useRef, useEffect, useState } from "react";
import { TextColorTransitionProps } from "@/types/showcase";
import "./TextColorTransition.css";

export const TextColorTransition: React.FC<TextColorTransitionProps> = ({
  lines,
  startColor = "#cccccc",
  endColor = "#000000",
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const sectionHeight = rect.height - windowHeight;
        const scrolled = Math.abs(rect.top);
        const prog = Math.min(scrolled / sectionHeight, 1);
        setProgress(prog);
      } else if (rect.top > 0) {
        setProgress(0);
      } else if (rect.bottom < windowHeight) {
        setProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCharProgress = (
    lineIndex: number,
    charIndex: number,
    totalChars: number
  ) => {
    const lineProgress = progress * lines.length;
    const currentLine = Math.floor(lineProgress);

    if (lineIndex < currentLine) return 1;
    if (lineIndex > currentLine) return 0;

    const lineOffset = lineProgress - currentLine;
    const charProgress = lineOffset * totalChars;

    return charIndex < charProgress ? Math.min(charProgress - charIndex, 1) : 0;
  };

  return (
    <div
      ref={containerRef}
      className={`text-color-transition ${className}`}
      style={{ height: "300vh" }}
    >
      <div className="text-color-sticky">
        <div className="text-color-content">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="text-color-line">
              {line.split("").map((char, charIndex) => {
                const charProg = getCharProgress(
                  lineIndex,
                  charIndex,
                  line.length
                );

                const r1 = parseInt(startColor.slice(1, 3), 16);
                const g1 = parseInt(startColor.slice(3, 5), 16);
                const b1 = parseInt(startColor.slice(5, 7), 16);

                const r2 = parseInt(endColor.slice(1, 3), 16);
                const g2 = parseInt(endColor.slice(3, 5), 16);
                const b2 = parseInt(endColor.slice(5, 7), 16);

                const r = Math.round(r1 + (r2 - r1) * charProg);
                const g = Math.round(g1 + (g2 - g1) * charProg);
                const b = Math.round(b1 + (b2 - b1) * charProg);

                const color = `rgb(${r}, ${g}, ${b})`;

                return (
                  <span
                    key={charIndex}
                    className="text-color-char"
                    style={{ color }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
