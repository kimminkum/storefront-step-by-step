import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ProductSwiperProps } from "@/types/showcase";
import "./ProductSwiper.css";

export const ProductSwiper: React.FC<ProductSwiperProps> = ({
  slides,
  textPosition = "right",
  className = "",
  stickyMode = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (!stickyMode) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();

      if (rect.top <= 100 && rect.bottom >= window.innerHeight - 100) {
        const progress =
          Math.abs(rect.top) / (rect.height - window.innerHeight);
        const slideIndex = Math.min(
          Math.floor(progress * slides.length),
          slides.length - 1
        );

        if (slideIndex !== currentIndex) {
          setCurrentIndex(slideIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyMode, slides.length, currentIndex]);

  const containerHeight = stickyMode ? `${slides.length * 100}vh` : "100vh";

  return (
    <div
      ref={containerRef}
      className={`product-swiper product-text-${textPosition} ${
        stickyMode ? "sticky-mode" : ""
      } ${className}`}
      style={{ minHeight: containerHeight }}
    >
      <div className={`product-swiper-wrapper ${stickyMode ? "sticky" : ""}`}>
        <div className="product-swiper-content">
          <div className="product-image-area">
            <div className="product-image-container">
              {slides.map((slide, index) => (
                <Image
                  key={index}
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={`product-image ${
                    index === currentIndex ? "active" : ""
                  }`}
                  unoptimized
                />
              ))}
            </div>

            <div className="product-navigation">
              <button
                className="product-nav-btn product-nav-prev"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <button
                className="product-nav-btn product-nav-next"
                onClick={nextSlide}
                disabled={currentIndex === slides.length - 1}
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="product-text-area">
            <div className="product-pagination">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`product-pagination-bar ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="product-text-scroll-container">
              {currentIndex > 0 && slides[currentIndex - 1] && (
                <div className="product-text-peek product-text-peek-prev">
                  <h2>{slides[currentIndex - 1]?.title}</h2>
                  <p>{slides[currentIndex - 1]?.description}</p>
                </div>
              )}

              {slides[currentIndex] && (
                <div className="product-text-item product-text-current">
                  <h2>{slides[currentIndex]?.title}</h2>
                  <p>{slides[currentIndex]?.description}</p>
                </div>
              )}

              {currentIndex < slides.length - 1 && slides[currentIndex + 1] && (
                <div className="product-text-peek product-text-peek-next">
                  <h2>{slides[currentIndex + 1]?.title}</h2>
                  <p>{slides[currentIndex + 1]?.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
