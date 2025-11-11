import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        {/* 404 숫자 */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        {/* 이모지 */}
        <div className="text-6xl mb-6 animate-bounce">🔍</div>

        {/* 메시지 */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        {/* 버튼들 */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🏠 홈으로 가기
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all hover:scale-105 shadow-lg hover:shadow-xl border-2 border-gray-200"
          >
            🛍️ 쇼핑하러 가기
          </Link>
        </div>

        {/* 추천 링크 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">다음 페이지를 둘러보세요:</p>
          <div className="flex gap-4 justify-center flex-wrap text-sm">
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              상품 목록
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/events"
              className="text-purple-600 hover:text-purple-700 hover:underline"
            >
              기술 쇼케이스
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/cart"
              className="text-pink-600 hover:text-pink-700 hover:underline"
            >
              장바구니
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
