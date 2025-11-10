import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    once = false
  } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
          if (once) {
            observer.unobserve(target);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, root, rootMargin, once, hasIntersected]);

  return { targetRef, isIntersecting, hasIntersected };
};
