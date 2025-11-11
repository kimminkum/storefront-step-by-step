export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* 이미지 스켈레톤 */}
      <div className="relative w-full h-64 bg-gray-200" />

      {/* 콘텐츠 스켈레톤 */}
      <div className="p-4 space-y-3">
        {/* 카테고리 */}
        <div className="h-4 bg-gray-200 rounded w-20" />

        {/* 제목 */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </div>

        {/* 평점 */}
        <div className="h-4 bg-gray-200 rounded w-24" />

        {/* 가격 */}
        <div className="h-6 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );
};
