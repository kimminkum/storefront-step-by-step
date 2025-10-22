interface RatingProps {
  rating: number;
  reviewCount?: number;
}

export function Rating({ rating, reviewCount }: RatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ⭐
        </span>
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ⭐
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300">
          ☆
        </span>
      );
    }
  }
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center">{stars}</span>
      <span className="text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>

      {reviewCount !== undefined && reviewCount > 0 && (
        <span className="text-sm text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
}
