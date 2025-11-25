"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper } from "@/components/showcase/Swiper";
import { ScrollProgress } from "@/components/showcase/ScrollProgress";
import { AOS } from "@/components/showcase/AOS";
import { Parallax } from "@/components/showcase/Parallax";
import { Card3DHover } from "@/components/showcase/Card3DHover";
import { MagneticButton } from "@/components/showcase/MagneticButton";
import { ScrollCounter } from "@/components/showcase/ScrollCounter";
import { ImageComparison } from "@/components/showcase/ImageComparison";
import { Tabs } from "@/components/showcase/Tabs";
import { InfiniteCarousel } from "@/components/showcase/InfiniteCarousel";
import { TextEffect } from "@/components/showcase/TextEffect";
import { ImageZoomScroll } from "@/components/showcase/ImageZoomScroll";
import { StickyImageZoom } from "@/components/showcase/StickyImageZoom";
import { SectionStacking } from "@/components/showcase/SectionStacking";
import { HorizontalScrollSection } from "@/components/showcase/HorizontalScrollSection";
import { ProductSwiper } from "@/components/showcase/ProductSwiper";
import { TextColorTransition } from "@/components/showcase/TextColorTransition";
import { CurtainReveal } from "@/components/showcase/CurtainReveal";
import { SectionNavigation } from "@/components/showcase/SectionNavigation";

interface PageProps {
  params: Promise<{ skill: string }>;
}

export default function SkillDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const skillName = decodeURIComponent(resolvedParams.skill);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const swiperSlides = [
    <div
      key="1"
      className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center text-white px-4"
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
        Slide 1
      </h2>
      <p className="text-sm sm:text-base md:text-xl text-center">
        Gauge Pagination으로 진행도를 확인하세요
      </p>
    </div>,
    <div
      key="2"
      className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center text-white px-4"
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
        Slide 2
      </h2>
      <p className="text-sm sm:text-base md:text-xl text-center">
        자동으로 슬라이드가 전환됩니다
      </p>
    </div>,
    <div
      key="3"
      className="w-full h-full bg-gradient-to-r from-pink-500 to-red-500 flex flex-col items-center justify-center text-white px-4"
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
        Slide 3
      </h2>
      <p className="text-sm sm:text-base md:text-xl text-center">
        다양한 Pagination 타입을 지원합니다
      </p>
    </div>,
    <div
      key="4"
      className="w-full h-full bg-gradient-to-r from-red-500 to-orange-500 flex flex-col items-center justify-center text-white px-4"
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
        Slide 4
      </h2>
      <p className="text-sm sm:text-base md:text-xl text-center">
        커스터마이징이 가능합니다
      </p>
    </div>
  ];

  const skillDemos: Record<string, React.ReactElement> = {
    Swiper: (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">
            Swiper 데모 - Gauge Pagination + Remote Control
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            게이지가 채워지면서 자동으로 다음 슬라이드로 전환됩니다
          </p>
          <div className="h-64 sm:h-80 md:h-96">
            <Swiper
              slides={swiperSlides}
              paginationType="gauge"
              autoplay={true}
              autoplayDelay={3000}
              navigation={true}
              showRemoteControl={true}
              paginationPosition="bottom"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">
            Swiper 데모 - Dots
          </h2>
          <div className="h-64 sm:h-80 md:h-96">
            <Swiper
              slides={swiperSlides}
              paginationType="dots"
              autoplay={false}
              navigation={true}
              paginationPosition="bottom"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">
            Swiper 데모 - Progressbar
          </h2>
          <div className="h-64 sm:h-80 md:h-96">
            <Swiper
              slides={swiperSlides}
              paginationType="progressbar"
              autoplay={false}
              navigation={true}
              paginationPosition="bottom"
            />
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
            Swiper 데모 - 커스텀 마우스 커서
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
            마우스를 올려보세요! 따라다니는 커스텀 커서가 나타납니다
          </p>
          <div className="h-64 sm:h-80 md:h-96">
            <Swiper
              slides={swiperSlides}
              paginationType="dots"
              autoplay={true}
              autoplayDelay={3000}
              navigation={true}
              customCursor={true}
              paginationPosition="bottom"
            />
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              • 다양한 Pagination 타입 (dots, progressbar, fraction, gauge)
            </li>
            <li>• 자동 재생 및 속도 조절</li>
            <li>• 무한 루프 지원</li>
            <li>• 커스텀 네비게이션 버튼</li>
            <li>• 리모트 컨트롤 (재생/일시정지/이전/다음)</li>
            <li>• 커스텀 마우스 커서</li>
            <li>• 완전한 커스터마이징 가능</li>
          </ul>
        </div>
      </div>
    ),

    AOS: (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            AOS (Animate On Scroll) 데모
          </h2>
          <p className="text-gray-600 mb-6">
            스크롤하면 다양한 애니메이션이 실행됩니다
          </p>
          <div className="space-y-12">
            <AOS animation="fade-up">
              <div className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-center text-2xl font-bold">
                FADE-UP
              </div>
            </AOS>
            <AOS animation="fade-left" delay={100}>
              <div className="p-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white text-center text-2xl font-bold">
                FADE-LEFT
              </div>
            </AOS>
            <AOS animation="fade-right" delay={200}>
              <div className="p-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white text-center text-2xl font-bold">
                FADE-RIGHT
              </div>
            </AOS>
            <AOS animation="zoom-in" delay={300}>
              <div className="p-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-center text-2xl font-bold">
                ZOOM-IN
              </div>
            </AOS>
            <AOS animation="flip-left" delay={400}>
              <div className="p-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white text-center text-2xl font-bold">
                FLIP-LEFT
              </div>
            </AOS>
            <AOS animation="slide-up">
              <div className="p-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg text-white text-center text-2xl font-bold">
                SLIDE-UP
              </div>
            </AOS>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Intersection Observer API 활용</li>
            <li>• 다양한 애니메이션 효과 (fade, slide, zoom, flip)</li>
            <li>• 애니메이션 지연 및 지속 시간 설정</li>
            <li>• 한 번만 실행 또는 반복 실행 옵션</li>
            <li>• 모바일 최적화</li>
          </ul>
        </div>
      </div>
    ),

    "Text Effects": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Text Effects 데모</h2>
          <div className="space-y-12">
            <div className="p-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Reveal Effect</h3>
              <TextEffect
                text="텍스트가 드러나는 효과"
                effect="reveal"
                duration={1500}
                className="text-4xl font-bold"
              />
            </div>
            <div className="p-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Typing Effect</h3>
              <TextEffect
                text="한 글자씩 타이핑되는 효과"
                effect="typing"
                duration={2000}
                className="text-4xl font-bold"
              />
            </div>
            <div className="p-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Word by Word</h3>
              <TextEffect
                text="단어별로 나타나는 효과입니다"
                effect="word-by-word"
                duration={2000}
                className="text-4xl font-bold"
              />
            </div>
            <div className="p-8 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Glitch Effect
              </h3>
              <TextEffect
                text="글리치 효과"
                effect="glitch"
                duration={2000}
                className="text-4xl font-bold text-white"
              />
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 5가지 텍스트 애니메이션 효과</li>
            <li>• 커스텀 지속 시간 및 지연</li>
            <li>• 한 번만 실행 옵션</li>
            <li>• 완전한 커스터마이징</li>
          </ul>
        </div>
      </div>
    ),

    "Image Zoom": (
      <div className="space-y-8">
        <div className="h-20" />
        <ImageZoomScroll
          imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
          imageAlt="Mountain landscape"
          initialScale={0.6}
          finalScale={1}
          showDimOverlay={true}
          overlayContent={
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold mb-4">
                스크롤하면 이미지가 확대됩니다
              </h2>
              <p className="text-2xl">딤 처리와 함께 텍스트가 나타납니다</p>
            </div>
          }
        />
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 스크롤에 따른 이미지 확대</li>
            <li>• 딤 오버레이 효과</li>
            <li>• 텍스트 오버레이 지원</li>
            <li>• 초기/최종 스케일 설정</li>
          </ul>
        </div>
      </div>
    ),

    "Sticky Image Zoom": (
      <div className="space-y-8">
        <div className="h-20" />
        <StickyImageZoom
          imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
          imageAlt="Mountain landscape"
          initialScale={0.3}
          finalScale={1}
          showDimOverlay={true}
          dimOpacity={0.7}
          overlayContent={
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold mb-4">섹션 고정 이미지 확대</h2>
              <p className="text-2xl">
                스크롤하면 이미지가 점점 커지고 텍스트가 순차적으로 나타납니다
              </p>
            </div>
          }
        />
        <div className="h-20" />
        <StickyImageZoom
          imageSrc="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920"
          imageAlt="Starry night"
          initialScale={0.5}
          finalScale={1}
          showDimOverlay={true}
          dimOpacity={0.6}
          overlayContent={
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold mb-4">별이 가득한 밤하늘</h2>
              <p className="text-2xl">초기 스케일 값을 조절할 수 있습니다</p>
            </div>
          }
        />
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 섹션 고정 + 이미지 확대</li>
            <li>• 텍스트 순차 등장</li>
            <li>• 딤 오버레이 투명도 조절</li>
            <li>• 스크롤 진행도 기반 애니메이션</li>
          </ul>
        </div>
      </div>
    ),

    Parallax: (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Parallax 데모</h2>
          <p className="text-gray-600 mb-4">
            스크롤하면 레이어별로 다른 속도로 움직입니다
          </p>
          <div className="space-y-12">
            <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-b from-blue-400 to-blue-600">
              <Parallax speed={0.3}>
                <div className="text-white text-center py-12">
                  <h3 className="text-3xl font-bold mb-2">레이어 1</h3>
                  <p className="text-lg">느리게 움직입니다 (30% 속도)</p>
                </div>
              </Parallax>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-b from-purple-400 to-purple-600">
              <Parallax speed={0.7}>
                <div className="text-white text-center py-12">
                  <h3 className="text-3xl font-bold mb-2">레이어 2</h3>
                  <p className="text-lg">중간 속도로 움직입니다 (70% 속도)</p>
                </div>
              </Parallax>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-b from-pink-400 to-pink-600">
              <Parallax speed={1.2}>
                <div className="text-white text-center py-12">
                  <h3 className="text-3xl font-bold mb-2">레이어 3</h3>
                  <p className="text-lg">빠르게 움직입니다 (120% 속도)</p>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 레이어별 다른 속도로 스크롤</li>
            <li>• 깊이감 있는 시각 효과</li>
            <li>• 성능 최적화 (requestAnimationFrame)</li>
            <li>• 다양한 방향 지원 (수직, 수평)</li>
            <li>• 커스텀 속도 설정</li>
          </ul>
        </div>
      </div>
    ),

    "Section Stacking": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Section Stacking 데모</h2>
          <p className="text-gray-600 mb-4">섹션이 쌓이면서 스크롤됩니다</p>
          <SectionStacking
            sections={[
              <div
                key="1"
                className="h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold"
              >
                Section 1
              </div>,
              <div
                key="2"
                className="h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold"
              >
                Section 2
              </div>,
              <div
                key="3"
                className="h-96 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold"
              >
                Section 3
              </div>,
              <div
                key="4"
                className="h-96 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold"
              >
                Section 4
              </div>
            ]}
          />
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 섹션이 쌓이는 효과</li>
            <li>• 스크롤 진행도 기반</li>
            <li>• 커스텀 높이 및 간격</li>
            <li>• 투명도 옵션</li>
          </ul>
        </div>
      </div>
    ),

    "Horizontal Scroll": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Horizontal Scroll 데모</h2>
          <p className="text-gray-600 mb-4">
            세로 스크롤이 가로 스크롤로 전환됩니다
          </p>
          <HorizontalScrollSection>
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="min-w-[80vw] h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-6xl font-bold"
              >
                Panel {num}
              </div>
            ))}
          </HorizontalScrollSection>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 세로 스크롤 → 가로 스크롤 전환</li>
            <li>• GSAP ScrollTrigger 활용</li>
            <li>• 부드러운 애니메이션</li>
            <li>• 반응형 지원</li>
          </ul>
        </div>
      </div>
    ),

    "Sticky Image": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Sticky Image 데모</h2>
          <p className="text-gray-600 mb-4">
            이미지는 고정되고 텍스트만 스크롤됩니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="sticky top-8 h-96 relative">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
                alt="Mountain"
                fill
                className="object-cover rounded-xl shadow-lg"
                unoptimized
              />
            </div>
            <div className="space-y-12">
              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">첫 번째 섹션</h3>
                <p className="text-lg text-gray-700">
                  이미지는 고정되고 텍스트만 스크롤됩니다
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">두 번째 섹션</h3>
                <p className="text-lg text-gray-700">
                  다양한 콘텐츠를 표시할 수 있습니다
                </p>
              </div>
              <div className="p-6 bg-pink-50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">세 번째 섹션</h3>
                <p className="text-lg text-gray-700">
                  이미지 위치를 좌우로 변경 가능합니다
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">네 번째 섹션</h3>
                <p className="text-lg text-gray-700">
                  스크롤해도 이미지는 고정됩니다
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 이미지 고정 + 텍스트 스크롤</li>
            <li>• 이미지 위치 선택 (좌/우)</li>
            <li>• 여러 텍스트 섹션 지원</li>
            <li>• 반응형 디자인</li>
          </ul>
        </div>
      </div>
    ),

    "Product Swiper": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Product Swiper 데모</h2>
          <ProductSwiper
            slides={[
              {
                image:
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
                title: "제품 1",
                description:
                  "멋진 제품입니다. 이미지와 텍스트가 함께 전환됩니다."
              },
              {
                image:
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
                title: "제품 2",
                description: "고급스러운 디자인의 제품입니다."
              },
              {
                image:
                  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
                title: "제품 3",
                description: "최신 트렌드를 반영한 제품입니다."
              }
            ]}
            textPosition="right"
          />
        </div>
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 제품 이미지 + 설명 동시 전환</li>
            <li>• 텍스트 위치 선택 (좌/우)</li>
            <li>• 부드러운 전환 효과</li>
            <li>• 자동 재생 지원</li>
          </ul>
        </div>
      </div>
    ),

    "Text Color Transition": (
      <div className="space-y-8">
        <div className="h-20" />
        <TextColorTransition
          lines={["스크롤하면", "텍스트 색상이", "부드럽게 전환됩니다"]}
          startColor="#cccccc"
          endColor="#000000"
          className="text-6xl font-bold"
        />
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 스크롤 진행도에 따른 색상 전환</li>
            <li>• 여러 줄 텍스트 지원</li>
            <li>• 커스텀 시작/종료 색상</li>
            <li>• 부드러운 그라데이션</li>
            <li>• 메인 페이지 스크롤과 연동</li>
          </ul>
        </div>
      </div>
    ),

    "Curtain Reveal": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Curtain Reveal 데모</h2>
          <p className="text-gray-600 mb-4">
            스크롤하면 커튼이 열리면서 이미지가 나타납니다
          </p>
          <div className="space-y-12">
            <div className="h-96 rounded-xl overflow-hidden">
              <CurtainReveal
                imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
                imageAlt="Mountain"
                curtainColor="#000000"
              />
            </div>
            <div className="h-96 rounded-xl overflow-hidden">
              <CurtainReveal
                imageSrc="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200"
                imageAlt="Stars"
                curtainColor="#1a1a2e"
              />
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 커튼이 열리는 효과</li>
            <li>• 스크롤 제어 모드</li>
            <li>• 커스텀 커튼 색상</li>
            <li>• 트리거 오프셋 설정</li>
          </ul>
        </div>
      </div>
    ),

    "Section Navigation": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Section Navigation 데모</h2>
          <SectionNavigation
            sections={[
              { id: "section1", label: "섹션 1" },
              { id: "section2", label: "섹션 2" },
              { id: "section3", label: "섹션 3" },
              { id: "section4", label: "섹션 4" }
            ]}
          />
          <div
            id="section1"
            className="h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold mt-8"
          >
            Section 1
          </div>
          <div
            id="section2"
            className="h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold mt-8"
          >
            Section 2
          </div>
          <div
            id="section3"
            className="h-96 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold mt-8"
          >
            Section 3
          </div>
          <div
            id="section4"
            className="h-96 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold mt-8"
          >
            Section 4
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 섹션별 네비게이션</li>
            <li>• 현재 섹션 하이라이트</li>
            <li>• 부드러운 스크롤</li>
            <li>• 고정 네비게이션 바</li>
          </ul>
        </div>
      </div>
    ),

    "3D Effects": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">3D Effects 데모</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card3DHover intensity={20}>
              <div className="h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl flex flex-col items-center justify-center text-white text-2xl font-bold">
                <span>3D Card Hover</span>
                <span className="text-sm mt-2">마우스를 올려보세요</span>
              </div>
            </Card3DHover>
            <MagneticButton strength={0.3}>
              <div className="h-64 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-xl flex flex-col items-center justify-center text-white text-2xl font-bold cursor-pointer">
                <span>Magnetic Button</span>
                <span className="text-sm mt-2">마우스를 가까이 대보세요</span>
              </div>
            </MagneticButton>
          </div>
        </div>
        <div className="bg-indigo-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• CSS 3D Transform 활용</li>
            <li>• 마우스 위치 추적</li>
            <li>• 자석 효과 (Magnetic Effect)</li>
            <li>• 깊이감 있는 그림자</li>
            <li>• 부드러운 애니메이션</li>
          </ul>
        </div>
      </div>
    ),

    "Image Comparison": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Image Comparison 데모</h2>
          <p className="text-gray-600 mb-4">
            슬라이더를 좌우로 드래그하여 이미지를 비교해보세요
          </p>
          <ImageComparison
            beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            afterImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&sat=-100"
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 드래그 앤 드롭으로 이미지 비교</li>
            <li>• 터치 제스처 지원</li>
            <li>• 커스텀 라벨</li>
            <li>• 반응형 디자인</li>
            <li>• 부드러운 애니메이션</li>
          </ul>
        </div>
      </div>
    ),

    Carousel: (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Infinite Carousel 데모</h2>
          <p className="text-gray-600 mb-4">
            무한으로 반복되는 캐러셀입니다. hover 시 일시정지됩니다.
          </p>
          <InfiniteCarousel
            items={[
              <div key="1" className="px-4">
                <div className="h-40 w-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  1
                </div>
              </div>,
              <div key="2" className="px-4">
                <div className="h-40 w-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  2
                </div>
              </div>,
              <div key="3" className="px-4">
                <div className="h-40 w-40 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  3
                </div>
              </div>,
              <div key="4" className="px-4">
                <div className="h-40 w-40 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  4
                </div>
              </div>,
              <div key="5" className="px-4">
                <div className="h-40 w-40 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  5
                </div>
              </div>,
              <div key="6" className="px-4">
                <div className="h-40 w-40 bg-gradient-to-br from-yellow-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  6
                </div>
              </div>
            ]}
            speed={30}
            direction="left"
            pauseOnHover={true}
          />
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 무한 루프 캐러셀</li>
            <li>• 좌우 방향 선택</li>
            <li>• 속도 조절</li>
            <li>• hover 시 일시정지</li>
            <li>• 부드러운 애니메이션</li>
          </ul>
        </div>
      </div>
    ),

    Tabs: (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Tabs 데모 - Underline</h2>
          <Tabs
            tabs={[
              {
                label: "탭 1",
                content: (
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">첫 번째 탭</h3>
                    <p>Underline 스타일의 탭입니다</p>
                  </div>
                )
              },
              {
                label: "탭 2",
                content: (
                  <div className="p-6 bg-purple-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">두 번째 탭</h3>
                    <p>부드러운 전환 효과가 적용됩니다</p>
                  </div>
                )
              },
              {
                label: "탭 3",
                content: (
                  <div className="p-6 bg-pink-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">세 번째 탭</h3>
                    <p>다양한 스타일을 지원합니다</p>
                  </div>
                )
              }
            ]}
            variant="underline"
            animated={true}
          />
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Tabs 데모 - Pill</h2>
          <Tabs
            tabs={[
              {
                label: "홈",
                icon: "🏠",
                content: (
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">홈 화면</h3>
                    <p>아이콘과 함께 사용할 수 있습니다</p>
                  </div>
                )
              },
              {
                label: "프로필",
                icon: "👤",
                content: (
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">프로필</h3>
                    <p>사용자 정보를 표시합니다</p>
                  </div>
                )
              },
              {
                label: "설정",
                icon: "⚙️",
                content: (
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">설정</h3>
                    <p>앱 설정을 관리합니다</p>
                  </div>
                )
              }
            ]}
            variant="pill"
            animated={true}
          />
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Tabs 데모 - Card</h2>
          <Tabs
            tabs={[
              {
                label: "개요",
                content: (
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">프로젝트 개요</h3>
                    <p>카드 스타일의 탭 컴포넌트입니다</p>
                  </div>
                )
              },
              {
                label: "기능",
                badge: "New",
                content: (
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">주요 기능</h3>
                    <p>배지를 표시할 수 있습니다</p>
                  </div>
                )
              },
              {
                label: "문의",
                content: (
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">문의하기</h3>
                    <p>10가지 이상의 스타일을 지원합니다</p>
                  </div>
                )
              }
            ]}
            variant="card"
            animated={true}
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              • 10가지 이상의 스타일 (underline, box, pill, card, gradient 등)
            </li>
            <li>• 아이콘 및 배지 지원</li>
            <li>• 수평/수직 레이아웃</li>
            <li>• 부드러운 전환 애니메이션</li>
            <li>• 완전한 커스터마이징</li>
          </ul>
        </div>
      </div>
    ),

    "Scroll Counter": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Scroll Counter 데모</h2>
          <p className="text-gray-600 mb-6">스크롤하면 숫자가 카운팅됩니다</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <ScrollCounter
                end={1000}
                suffix="+"
                duration={2000}
                className="text-5xl font-bold text-blue-600"
              />
              <p className="text-gray-700 mt-4 font-semibold">프로젝트</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <ScrollCounter
                end={500}
                suffix="K"
                duration={2000}
                className="text-5xl font-bold text-purple-600"
              />
              <p className="text-gray-700 mt-4 font-semibold">사용자</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
              <ScrollCounter
                end={99}
                suffix="%"
                duration={2000}
                className="text-5xl font-bold text-pink-600"
              />
              <p className="text-gray-700 mt-4 font-semibold">만족도</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 스크롤 시 숫자 카운팅 애니메이션</li>
            <li>• Intersection Observer 활용</li>
            <li>• 커스텀 지속 시간</li>
            <li>• prefix/suffix 지원</li>
            <li>• 한 번만 실행 옵션</li>
          </ul>
        </div>
      </div>
    ),

    "Scroll Progress": (
      <div className="space-y-8">
        <ScrollProgress position="top" height={4} color="#3b82f6" />
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Scroll Progress 데모</h2>
          <div className="space-y-6">
            <div className="text-center text-6xl font-bold text-blue-600">
              {Math.round(scrollProgress)}%
            </div>
            <p className="text-gray-600 text-center">
              페이지를 스크롤하면 상단의 진행 바가 업데이트됩니다
            </p>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700"
              >
                Section {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 실시간 스크롤 진행률 표시</li>
            <li>• 다양한 스타일 (선형, 원형)</li>
            <li>• 부드러운 애니메이션</li>
            <li>• 커스터마이징 가능</li>
            <li>• 성능 최적화</li>
          </ul>
        </div>
      </div>
    ),

    "Scroll Snap": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Scroll Snap 데모</h2>
          <p className="text-gray-600 mb-4">
            스크롤 시 자동으로 섹션에 스냅됩니다 (아래 박스 안에서
            스크롤해보세요)
          </p>
          <div
            className="h-[600px] overflow-y-scroll border-4 border-gray-300 rounded-xl"
            style={{ scrollSnapType: "y mandatory" }}
          >
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="h-[600px] flex items-center justify-center text-white text-6xl font-bold"
                style={{
                  scrollSnapAlign: "start",
                  background: `linear-gradient(135deg, hsl(${
                    num * 60
                  }, 70%, 60%), hsl(${num * 60 + 40}, 70%, 60%))`
                }}
              >
                Snap Section {num}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• CSS Scroll Snap 활용</li>
            <li>• mandatory/proximity 모드</li>
            <li>• 수직/수평/양방향 지원</li>
            <li>• 정렬 옵션 (start, center, end)</li>
          </ul>
        </div>
      </div>
    ),

    "Magnetic Button": (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Magnetic Button 데모</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center p-12 bg-gray-50 rounded-xl">
              <MagneticButton strength={0.5}>
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg">
                  Hover Me!
                </button>
              </MagneticButton>
            </div>
            <div className="flex items-center justify-center p-12 bg-gray-50 rounded-xl">
              <MagneticButton strength={0.8}>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg">
                  Strong Magnet
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 마우스를 끌어당기는 자석 효과</li>
            <li>• 강도 조절 가능</li>
            <li>• 부드러운 애니메이션</li>
            <li>• 다양한 버튼 스타일 적용 가능</li>
            <li>• 인터랙티브한 사용자 경험</li>
          </ul>
        </div>
      </div>
    )
  };

  const defaultDemo = (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">{skillName} 데모</h2>
        <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-xl text-gray-600">데모 준비 중입니다</p>
            <p className="text-sm text-gray-500 mt-2">
              실제 프로젝트에서는 완전한 구현이 가능합니다
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-3">기술 설명</h3>
        <p className="text-gray-700">
          {skillName}은(는) 현대적인 웹 인터랙션을 구현하는 핵심 기술입니다.
          React, TypeScript, CSS3를 활용하여 구현되며, 다양한 프로젝트에 적용
          가능합니다.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8">
        {/* 뒤로가기 */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <span className="text-2xl">←</span>
          <span>기술 쇼케이스로 돌아가기</span>
        </Link>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{skillName}</h1>
          <p className="text-gray-600">실제 동작하는 데모를 확인해보세요</p>
        </div>

        {/* 데모 */}
        {skillDemos[skillName] || defaultDemo}

        {/* 기술 스택 */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6">사용 기술</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
              React
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-semibold">
              TypeScript
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
              CSS3
            </span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold">
              Animation
            </span>
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-semibold">
              Intersection Observer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
