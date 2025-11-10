"use client";

import Link from "next/link";

export default function EventsPage() {
  const skills = [
    { name: "Swiper", desc: "다양한 Pagination 타입", icon: "🎠" },
    { name: "AOS", desc: "스크롤 애니메이션", icon: "✨" },
    { name: "Text Effects", desc: "텍스트 애니메이션", icon: "📝" },
    { name: "Image Zoom", desc: "이미지 확대 스크롤", icon: "🔍" },
    { name: "Sticky Image Zoom", desc: "섹션 고정 이미지 확대", icon: "📌" },
    { name: "Parallax", desc: "패럴랙스 효과", icon: "🌊" },
    { name: "Section Stacking", desc: "섹션 쌓기", icon: "📚" },
    { name: "Horizontal Scroll", desc: "좌우 스크롤", icon: "↔️" },
    { name: "Sticky Image", desc: "이미지 고정 + 텍스트", icon: "🖼️" },
    { name: "Product Swiper", desc: "제품 스와이퍼", icon: "🛍️" },
    { name: "Text Color Transition", desc: "텍스트 색상 전환", icon: "🎨" },
    { name: "Curtain Reveal", desc: "커튼 열림 효과", icon: "🎭" },
    { name: "Section Navigation", desc: "구역별 네비게이션", icon: "🧭" },
    { name: "3D Effects", desc: "3D 카드 & 버튼", icon: "🎲" },
    { name: "Image Comparison", desc: "이미지 비교", icon: "⚖️" },
    { name: "Carousel", desc: "캐러셀 슬라이더 (무한 포함)", icon: "🎡" },
    { name: "Tabs", desc: "탭 컴포넌트 (10+ 스타일)", icon: "📑" },
    { name: "Magnetic Button", desc: "마그네틱 버튼 효과", icon: "🧲" },
    { name: "Scroll Counter", desc: "스크롤 카운터", icon: "🔢" },
    { name: "Scroll Progress", desc: "스크롤 진행 바", icon: "📊" },
    { name: "Scroll Snap", desc: "스크롤 스냅", icon: "📍" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎨 Publisher Skills Showcase
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            퍼블리셔를 위한 재사용 가능한 컴포넌트 라이브러리
          </p>
          <p className="text-gray-500">
            다양한 인터랙션 효과와 애니메이션 기술을 구현할 수 있습니다
          </p>
        </div>

        {/* 기술 스택 배지 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            React
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
            TypeScript
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            CSS3 Animation
          </span>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
            GSAP
          </span>
          <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
            Intersection Observer
          </span>
          <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
            Scroll Effects
          </span>
        </div>

        {/* 스킬 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {skills.map((skill, index) => (
            <Link
              key={skill.name}
              href={`/events/${encodeURIComponent(skill.name)}`}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 group cursor-pointer animate-slide-up block"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-600">{skill.desc}</p>
              <div className="mt-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
                데모 보기 →
              </div>
            </Link>
          ))}
        </div>

        {/* 하이라이트 섹션 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            ✨ 주요 구현 기술
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                🎬 스크롤 애니메이션
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Intersection Observer API</li>
                <li>• GSAP ScrollTrigger</li>
                <li>• CSS Transform & Transition</li>
                <li>• Parallax Effects</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                🎨 인터랙션 효과
              </h3>
              <ul className="text-sm text-purple-800 space-y-2">
                <li>• Hover & Click Effects</li>
                <li>• Magnetic Button</li>
                <li>• 3D Card Hover</li>
                <li>• Smooth Transitions</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                🎡 슬라이더 & 캐러셀
              </h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• Swiper.js Integration</li>
                <li>• Custom Carousel</li>
                <li>• Infinite Loop</li>
                <li>• Touch Gestures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white animate-scale-in">
          <h2 className="text-3xl font-bold mb-4">
            이 모든 기술을 활용할 수 있습니다
          </h2>
          <p className="text-lg mb-6 opacity-90">
            각 컴포넌트는 독립적으로 사용 가능하며, 프로젝트에 맞게
            커스터마이징할 수 있습니다
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              GitHub 보기
            </a>
            <a
              href="mailto:your@email.com"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
