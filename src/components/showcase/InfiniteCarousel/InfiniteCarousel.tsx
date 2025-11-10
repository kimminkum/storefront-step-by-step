import React, { useEffect, useRef } from "react";
import { InfiniteCarouselProps } from "@/types/showcase";
import "./InfiniteCarousel.css";

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  items,
  speed = 30,
  direction = "left",
  gap = 20,
  pauseOnHover = true,
  className = ""
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 원본 + 복제본으로 무한 루프 구현
    const originalItems = Array.from(track.children).slice(0, items.length);
    const totalWidth = originalItems.reduce((sum, item) => {
      return sum + (item as HTMLElement).offsetWidth + gap;
    }, 0);

    // CSS 변수 설정
    track.style.setProperty("--scroll-width", `${totalWidth}px`);
    track.style.setProperty("--scroll-speed", `${speed}s`);
    track.style.setProperty(
      "--scroll-direction",
      direction === "left" ? "normal" : "reverse"
    );
  }, [items.length, speed, direction, gap]);

  return (
    <div className={`infinite-carousel ${className}`}>
      <div
        className={`infinite-carousel-track ${
          pauseOnHover ? "pause-on-hover" : ""
        }`}
        ref={trackRef}
        style={{ gap: `${gap}px` }}
      >
        {/* 원본 아이템 */}
        {items.map((item, index) => (
          <div key={`original-${index}`} className="infinite-carousel-item">
            {item}
          </div>
        ))}
        {/* 복제본 아이템 (무한 루프용) */}
        {items.map((item, index) => (
          <div key={`clone-${index}`} className="infinite-carousel-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
