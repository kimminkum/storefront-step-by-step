import React, { useState, useEffect } from "react";
import { IntroAnimationProps } from "@/types/showcase";
import "./IntroAnimation.css";

export const IntroAnimation: React.FC<IntroAnimationProps> = ({
  textLines,
  onComplete,
  textDuration = 1000,
  transitionDuration = 1500
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const totalTime = textLines.length * textDuration + transitionDuration;

    const completeTimer = setTimeout(() => {
      setVisible(false);

      if (onComplete) {
        onComplete();
      }
    }, totalTime);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [textLines.length, textDuration, transitionDuration, onComplete]);

  const handleSkip = () => {
    setVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="intro-animation">
      <div className="intro-content">
        {textLines.map((line, index) => (
          <div
            key={index}
            className="intro-line"
            style={{
              animationDelay: `${index * textDuration}ms`,
              animationDuration: `${textDuration}ms`
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <button className="intro-skip" onClick={handleSkip}>
        Skip →
      </button>
    </div>
  );
};
