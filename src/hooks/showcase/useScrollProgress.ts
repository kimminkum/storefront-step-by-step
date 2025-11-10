import { useEffect, useState } from "react";

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const totalScroll = documentHeight - windowHeight;
      const currentProgress = (scrollTop / totalScroll) * 100;

      setProgress(Math.min(Math.max(currentProgress, 0), 100));
    };

    calculateProgress();
    window.addEventListener("scroll", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
    };
  }, []);

  return progress;
};
