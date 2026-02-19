import React, { useState, useEffect, useRef, useCallback } from "react";
import { SwiperProps } from "@/types/showcase";
import "./Swiper.css";

export const Swiper: React.FC<SwiperProps> = ({
  slides = [],
  paginationType = "dots",
  autoplay = false,
  autoplayDelay = 3000,
  loop = true,
  speed = 300,
  navigation = true,
  className = "",
  onSlideChange,
  showRemoteControl = false,
  paginationPosition = "bottom",
  customCursor = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gaugeProgress, setGaugeProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gaugeTimerRef = useRef<number | null>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      let newIndex = index;
      if (loop) {
        if (index < 0) newIndex = totalSlides - 1;
        if (index >= totalSlides) newIndex = 0;
      } else {
        if (index < 0 || index >= totalSlides) return;
      }

      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      setGaugeProgress(0);

      if (onSlideChange) {
        onSlideChange(newIndex);
      }

      setTimeout(() => setIsTransitioning(false), speed);
    },
    [isTransitioning, loop, totalSlides, speed, onSlideChange]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Autoplay logic
  useEffect(() => {
    if (!isPlaying) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, autoplayDelay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, autoplayDelay, currentIndex, nextSlide]);

  // Gauge animation
  useEffect(() => {
    if (paginationType !== "gauge" || !isPlaying) return;

    setGaugeProgress(0);
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / autoplayDelay) * 100, 100);
      setGaugeProgress(progress);

      if (progress < 100) {
        gaugeTimerRef.current = requestAnimationFrame(animate);
      }
    };

    gaugeTimerRef.current = requestAnimationFrame(animate);

    return () => {
      if (gaugeTimerRef.current) {
        cancelAnimationFrame(gaugeTimerRef.current);
      }
    };
  }, [paginationType, isPlaying, autoplayDelay, currentIndex]);

  // Custom cursor
  useEffect(() => {
    if (!customCursor || !swiperRef.current || !cursorRef.current) return;

    const swiper = swiperRef.current;
    const cursor = cursorRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = swiper.getBoundingClientRect();
      cursor.style.left = `${e.clientX - rect.left}px`;
      cursor.style.top = `${e.clientY - rect.top}px`;
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    swiper.addEventListener("mousemove", handleMouseMove);
    swiper.addEventListener("mouseenter", handleMouseEnter);
    swiper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      swiper.removeEventListener("mousemove", handleMouseMove);
      swiper.removeEventListener("mouseenter", handleMouseEnter);
      swiper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [customCursor]);

  const renderPagination = () => {
    if (paginationType === "none") return null;

    const paginationContent = (() => {
      switch (paginationType) {
        case "dots":
          return (
            <div className="swiper-pagination swiper-pagination-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`swiper-pagination-dot ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          );

        case "progressbar":
          const progress = ((currentIndex + 1) / totalSlides) * 100;
          return (
            <div className="swiper-pagination swiper-pagination-progressbar">
              <div
                className="swiper-pagination-progressbar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          );

        case "fraction":
          return (
            <div className="swiper-pagination swiper-pagination-fraction">
              <span className="current">{currentIndex + 1}</span>
              <span className="separator">/</span>
              <span className="total">{totalSlides}</span>
            </div>
          );

        case "gauge":
          return (
            <div className="swiper-pagination swiper-pagination-gauge">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`swiper-pagination-gauge-item ${
                    index === currentIndex ? "active" : ""
                  } ${index < currentIndex ? "completed" : ""}`}
                  onClick={() => goToSlide(index)}
                >
                  {index === currentIndex && (
                    <div
                      className="swiper-pagination-gauge-fill"
                      style={{ width: `${gaugeProgress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>
          );

        default:
          return null;
      }
    })();

    return (
      <div className={`pagination-wrapper pagination-${paginationPosition}`}>
        {paginationContent}
      </div>
    );
  };

  return (
    <div
      ref={swiperRef}
      className={`swiper-container ${
        customCursor ? "custom-cursor" : ""
      } ${className}`}
    >
      {customCursor && (
        <div ref={cursorRef} className="swiper-custom-cursor">
          <div className="cursor-dot"></div>
        </div>
      )}
      <div className="swiper-wrapper">
        <div
          className="swiper-slides"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? `transform ${speed}ms ease-in-out`
              : "none"
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="swiper-slide">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {navigation && (
        <>
          <button
            className="swiper-button-prev"
            onClick={prevSlide}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button
            className="swiper-button-next"
            onClick={nextSlide}
            disabled={!loop && currentIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </>
      )}

      {renderPagination()}

      {showRemoteControl && (
        <div className="swiper-remote-control">
          <button
            className="remote-btn"
            onClick={prevSlide}
            disabled={!loop && currentIndex === 0}
            title="이전"
          >
            ⏮
          </button>
          <button
            className="remote-btn remote-play-pause"
            onClick={togglePlayPause}
            title={isPlaying ? "일시정지" : "재생"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            className="remote-btn"
            onClick={nextSlide}
            disabled={!loop && currentIndex === totalSlides - 1}
            title="다음"
          >
            ⏭
          </button>
          <div className="remote-counter whitespace-nowrap">
            {currentIndex + 1} / {totalSlides}
          </div>
        </div>
      )}
    </div>
  );
};
