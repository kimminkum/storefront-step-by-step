import React, { useState, useEffect } from "react";
import { SectionNavigationProps } from "@/types/showcase";
import "./SectionNavigation.css";

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  sections,
  className = ""
}) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionData = sections[i];
        if (!sectionData) continue;
        
        const section = document.getElementById(sectionData.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            setActiveSection(sectionData.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`section-navigation ${className}`}>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`section-nav-btn ${
            section.id === activeSection ? "active" : ""
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};
