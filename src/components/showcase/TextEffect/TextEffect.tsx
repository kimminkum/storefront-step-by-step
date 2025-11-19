import React, { useEffect, useState } from "react";
import { TextEffectProps } from "@/types/showcase";
import { useIntersectionObserver } from "@/hooks/showcase/useIntersectionObserver";
import "./TextEffect.css";

export const TextEffect: React.FC<TextEffectProps> = ({
  text,
  effect = "reveal",
  duration = 2000,
  delay = 0,
  once = true,
  className = ""
}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    once
  });

  const [visibleChars, setVisibleChars] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!hasIntersected || isAnimating) return;

    const timeout = setTimeout(() => {
      setIsAnimating(true);

      if (effect === "character-disappear") {
        setVisibleChars(text.length);
        const charDelay = duration / text.length;

        text.split("").forEach((_, index) => {
          setTimeout(() => {
            setVisibleChars(text.length - index - 1);
          }, delay + charDelay * index);
        });
      } else if (effect === "word-by-word" || effect === "typing") {
        const charDelay = duration / text.length;

        text.split("").forEach((_, index) => {
          setTimeout(() => {
            setVisibleChars(index + 1);
          }, delay + charDelay * index);
        });
      } else {
        setVisibleChars(text.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasIntersected, effect, text, duration, delay, isAnimating]);

  const renderText = () => {
    const chars = text.split("");

    if (effect === "character-disappear") {
      return chars.map((char, index) => (
        <span
          key={index}
          className={`text-effect-char ${
            index < visibleChars ? "visible" : "hidden"
          }`}
          style={{
            transitionDelay: `${(index * duration) / text.length}ms`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    if (effect === "word-by-word" || effect === "typing") {
      return chars.map((char, index) => (
        <span
          key={index}
          className={`text-effect-char ${
            index < visibleChars ? "visible" : "hidden"
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    return <span className="text-effect-full">{text}</span>;
  };

  return (
    <div
      ref={targetRef}
      className={`text-effect text-effect-${effect} ${
        hasIntersected ? "animate" : ""
      } ${className}`}
      style={
        {
          "--text-effect-duration": `${duration}ms`,
          "--text-effect-delay": `${delay}ms`
        } as React.CSSProperties
      }
    >
      {renderText()}
    </div>
  );
};
