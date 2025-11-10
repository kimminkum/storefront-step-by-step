import React, { useState, useRef, useEffect } from "react";
import { TabsProps } from "@/types/showcase";
import "./Tabs.css";

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveIndex = 0,
  onChange,
  variant = "underline",
  orientation = "horizontal",
  size = "medium",
  fullWidth = false,
  animated = true,
  className = ""
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (variant === "underline" || variant === "fill") {
      updateIndicator();
    }
  }, [activeIndex, variant]);

  const updateIndicator = () => {
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab) {
      if (orientation === "horizontal") {
        setIndicatorStyle({
          width: `${activeTab.offsetWidth}px`,
          transform: `translateX(${activeTab.offsetLeft}px)`
        });
      } else {
        setIndicatorStyle({
          height: `${activeTab.offsetHeight}px`,
          transform: `translateY(${activeTab.offsetTop}px)`
        });
      }
    }
  };

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div
      className={`tabs-container tabs-${orientation} tabs-${variant} tabs-${size} ${
        fullWidth ? "tabs-full-width" : ""
      } ${animated ? "tabs-animated" : ""} ${className}`}
    >
      <div className="tabs-header" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            className={`tab-button ${index === activeIndex ? "active" : ""} ${
              tab.disabled ? "disabled" : ""
            }`}
            onClick={() => !tab.disabled && handleTabClick(index)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`tab-panel-${index}`}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="tab-badge">{tab.badge}</span>
            )}
          </button>
        ))}

        {(variant === "underline" || variant === "fill") && animated && (
          <div className="tab-indicator" style={indicatorStyle} />
        )}
      </div>

      <div className="tabs-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            id={`tab-panel-${index}`}
            className={`tab-panel ${index === activeIndex ? "active" : ""}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
          >
            {index === activeIndex && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
