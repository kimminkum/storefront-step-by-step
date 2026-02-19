"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import {
  ScrollProgress,
  IntroAnimation,
  AOS,
  TextEffect,
  Parallax,
  Swiper,
  HorizontalScrollSection,
  StickyImageWithText,
  ScrollCounter,
  MagneticButton,
  Card3DHover,
  TextColorTransition
} from "@/components/showcase";

export default function Home() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [introComplete, setIntroComplete] = useState(false);

  // 포트폴리오 슬라이드
  const portfolioSlides = [
    <div
      key="1"
      className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center text-white px-4"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-16">
        E-Commerce Platform
      </h2>
      <p className="text-l md:text-2xl text-center max-w-2xl">
        Next.js 15와 React 19로 구현한 현대적인 쇼핑몰
      </p>
    </div>,
    <div
      key="2"
      className="w-full h-full bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500 flex flex-col items-center justify-center text-white px-4"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-16">Publisher Skills</h2>
      <p className="text-l md:text-2xl text-center max-w-2xl">
        23가지 인터랙티브 컴포넌트 라이브러리
      </p>
    </div>,
    <div
      key="3"
      className="w-full h-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex flex-col items-center justify-center text-white px-4"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-16">Modern UI/UX</h2>
      <p className="text-l md:text-2xl text-center max-w-2xl">
        반응형 디자인과 부드러운 애니메이션
      </p>
    </div>
  ];

  // 프로젝트 카드 데이터
  const projects = [
    {
      title: "E-Commerce Store",
      description: "완전한 기능을 갖춘 쇼핑몰 플랫폼",
      tech: ["Next.js", "React", "TypeScript", "Zustand"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Component Library",
      description: "재사용 가능한 23가지 컴포넌트",
      tech: ["React", "TypeScript", "CSS3", "GSAP"],
      gradient: "from-green-500 to-teal-600"
    },
    {
      title: "Responsive Design",
      description: "모든 디바이스에 최적화된 UI",
      tech: ["Tailwind CSS", "CSS Grid", "Flexbox"],
      gradient: "from-orange-500 to-pink-600"
    }
  ];

  // 스킬 섹션 텍스트
  const skillTextSections = [
    <div key="1" className="space-y-4">
      <h3 className="text-3xl font-bold text-gray-900">Frontend Development</h3>
      <p className="text-lg text-gray-600">
        React, Next.js, TypeScript를 활용한 현대적인 프론트엔드 개발
      </p>
      <ul className="space-y-2 text-gray-700">
        <li>• 컴포넌트 기반 아키텍처</li>
        <li>• 상태 관리 및 데이터 페칭</li>
        <li>• 서버 사이드 렌더링</li>
      </ul>
    </div>,
    <div key="2" className="space-y-4">
      <h3 className="text-3xl font-bold text-gray-900">UI/UX Design</h3>
      <p className="text-lg text-gray-600">
        사용자 경험을 중시한 직관적인 인터페이스 설계
      </p>
      <ul className="space-y-2 text-gray-700">
        <li>• 반응형 웹 디자인</li>
        <li>• 인터랙티브 애니메이션</li>
        <li>• 접근성 고려</li>
      </ul>
    </div>,
    <div key="3" className="space-y-4">
      <h3 className="text-3xl font-bold text-gray-900">Animation & Effects</h3>
      <p className="text-lg text-gray-600">
        GSAP, CSS3를 활용한 부드러운 애니메이션 구현
      </p>
      <ul className="space-y-2 text-gray-700">
        <li>• 스크롤 기반 애니메이션</li>
        <li>• 인터랙션 효과</li>
        <li>• 성능 최적화</li>
      </ul>
    </div>
  ];

  // 프로젝트 섹션 아이템
  const projectItems = projects.map((project, index) => (
    <div key={index} className="w-full min-w-0 max-w-full md:min-w-[500px]">
      <Card3DHover>
        <div
          className={`bg-gradient-to-br ${project.gradient} rounded-2xl p-8 text-white h-full shadow-xl`}
        >
          <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
          <p className="text-lg mb-6 opacity-90">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Card3DHover>
    </div>
  ));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 스크롤 진행 바 */}
      <ScrollProgress position="top" height={4} color="#3b82f6" />

      {/* 인트로 애니메이션 */}
      {!introComplete && (
        <IntroAnimation
          textLines={[
            "안녕하세요",
            "퍼블리셔 & 프론트엔드 개발자",
            "포트폴리오에 오신 것을 환영합니다"
          ]}
          onComplete={() => setIntroComplete(true)}
          textDuration={1200}
          transitionDuration={2000}
        />
      )}

      {/* 히어로 섹션 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* 배경 장식 */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 md:py-32">
          <div className="text-center">
            <AOS animation="fade-up" duration={1000} delay={0}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6">
                <TextEffect
                  text="퍼블리셔 포트폴리오"
                  effect="reveal"
                  delay={1000}
                  duration={2000}
                />
              </h1>
            </AOS>
            <AOS animation="fade-up" duration={1000} delay={200}>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto">
                현대적인 웹 기술과 창의적인 디자인으로
                <br />
                사용자 경험을 만들어갑니다
              </p>
            </AOS>
            <AOS animation="fade-up" duration={1000} delay={400}>
              <div className="flex gap-4 justify-center flex-wrap relative z-20">
                <MagneticButton>
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
                  >
                    🛍️ 쇼핑 시작하기
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/events"
                    className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg border-2 border-gray-200"
                  >
                    🎨 기술 쇼케이스
                  </Link>
                </MagneticButton>
              </div>
            </AOS>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* 포트폴리오 슬라이더 */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <AOS animation="fade-up" duration={800}>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
              <TextEffect text="주요 프로젝트" effect="word-by-word" />
            </h2>
          </AOS>
          <div className="h-[500px] md:h-[600px]">
            <Swiper
              slides={portfolioSlides}
              paginationType="gauge"
              autoplay={true}
              autoplayDelay={4000}
              navigation={true}
              paginationPosition="bottom"
            />
          </div>
        </div>
      </section>

      {/* About 섹션 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AOS animation="fade-right" duration={1000}>
              <Parallax speed={0.3}>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl shadow-2xl transform rotate-357 hover:rotate-183 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl"></div>
                </div>
              </Parallax>
            </AOS>
            <AOS animation="fade-left" duration={1000}>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  <TextEffect text="About Me" effect="typing" />
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  프론트엔드 개발과 퍼블리싱에 열정을 가진 개발자입니다.
                  <br />
                  <br />
                  사용자 경험을 최우선으로 생각하며, 현대적인 웹 기술을 활용해
                  아름답고 기능적인 웹사이트를 만듭니다.
                  <br />
                  <br />
                  React, Next.js, TypeScript를 주로 사용하며, 다양한
                  애니메이션과 인터랙션 효과를 구현하는 것을 좋아합니다.
                </p>
                <div className="flex gap-4 flex-wrap">
                  {[
                    "Next.js 15",
                    "React 19",
                    "TypeScript",
                    "Tailwind CSS",
                    "Zustand",
                    "React Query"
                  ].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-md"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* 스킬 섹션 - Sticky Image */}
      <section className="py-20 bg-white">
        <StickyImageWithText
          imageSrc="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800"
          imageAlt="Skills"
          imagePosition="right"
          textSections={skillTextSections}
        />
      </section>

      {/* 프로젝트 섹션 - Horizontal Scroll */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-12">
          <AOS animation="fade-up" duration={800}>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              <TextEffect text="프로젝트 포트폴리오" effect="reveal" />
            </h2>
            <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
              다양한 기술 스택으로 구현한 프로젝트들을 확인해보세요
            </p>
          </AOS>
        </div>
        <HorizontalScrollSection>{projectItems}</HorizontalScrollSection>
      </section>

      {/* 통계 섹션 */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <AOS animation="fade-up" duration={800}>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
              성과 지표
            </h2>
          </AOS>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AOS animation="zoom-in" duration={800} delay={0}>
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <ScrollCounter
                  end={100}
                  duration={2000}
                  suffix="+"
                  className="text-6xl font-bold text-blue-600 mb-4"
                />
                <p className="text-xl font-semibold text-gray-700">상품</p>
              </div>
            </AOS>
            <AOS animation="zoom-in" duration={800} delay={200}>
              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                <ScrollCounter
                  end={23}
                  duration={2000}
                  suffix="+"
                  className="text-6xl font-bold text-purple-600 mb-4"
                />
                <p className="text-xl font-semibold text-gray-700">컴포넌트</p>
              </div>
            </AOS>
            <AOS animation="zoom-in" duration={800} delay={400}>
              <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                <ScrollCounter
                  end={100}
                  duration={2000}
                  suffix="%"
                  className="text-6xl font-bold text-pink-600 mb-4"
                />
                <p className="text-xl font-semibold text-gray-700">만족도</p>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* Text Color Transition 섹션 */}
      <section className="relative bg-gray-900">
        <TextColorTransition
          lines={[
            "창의적인 아이디어와 기술력으로",
            "사용자 경험을 만들어갑니다"
          ]}
          startColor="#666666"
          endColor="#ffffff"
          className="text-6xl font-bold"
        />
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center text-white">
          <AOS animation="fade-up" duration={800}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              함께 일하고 싶으신가요?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {totalItems > 0
                ? `장바구니에 ${totalItems}개의 상품이 담겨있습니다`
                : "프로젝트 문의나 협업 제안을 환영합니다"}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <MagneticButton>
                <Link
                  href="/products"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
                >
                  상품 둘러보기
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/events"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
                >
                  기술 쇼케이스 보기
                </Link>
              </MagneticButton>
              {totalItems > 0 && (
                <MagneticButton>
                  <Link
                    href="/cart"
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
                  >
                    장바구니 보기 ({totalItems})
                  </Link>
                </MagneticButton>
              )}
            </div>
          </AOS>
        </div>
      </section>
    </div>
  );
}
