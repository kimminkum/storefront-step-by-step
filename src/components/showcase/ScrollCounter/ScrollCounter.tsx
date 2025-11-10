import React, { useState, useEffect } from "react";
import { ScrollCounterProps } from "@/types/showcase";
import { useIntersectionObserver } from "@/hooks/showcase/useIntersectionObserver";
import "./ScrollCounter.css";

export const ScrollCounter: React.FC<ScrollCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = ""
}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.5,
    once: true
  });

  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!hasIntersected) return;

    const increment = (end - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasIntersected, start, end, duration]);

  return (
    <div ref={targetRef} className={`scroll-counter ${className}`}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};
