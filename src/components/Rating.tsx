interface RatingProps {
  rating: number;
  reviewCount?: number;
  "aria-label"?: string;
}

export function Rating({
  rating,
  reviewCount,
  "aria-label": ariaLabel
}: RatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="text-yellow-500" aria-hidden="true">
          ⭐
        </span>
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <span key={i} className="text-yellow-500" aria-hidden="true">
          ⭐
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300" aria-hidden="true">
          ☆
        </span>
      );
    }
  }
  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={ariaLabel || `평점 ${rating.toFixed(1)}점`}
    >
      <span className="flex items-center" aria-hidden="true">
        {stars}
      </span>
      <span className="text-sm font-medium text-gray-700" aria-hidden="true">
        {rating.toFixed(1)}
      </span>

      {reviewCount !== undefined && reviewCount > 0 && (
        <span className="text-sm text-gray-500" aria-hidden="true">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
