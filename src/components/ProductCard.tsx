import { useState } from "react";
import type { Product } from "@/types";
import { formatKRW } from "@/lib/money";
import Image from "next/image";
import { Rating } from "@/components/Rating";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState<boolean>(false);
  const isNew = () => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return new Date(product.createdAt).getTime() > sevenDaysAgo;
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative aspect-square bg-gray-100">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {isNew() && <Badge variant="new">New</Badge>}
          {isLowStock && <Badge variant="warning">재고 부족</Badge>}
          {isOutOfStock && <Badge variant="danger">품절</Badge>}
        </div>

        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm">이미지 없음</div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500 uppercase">{product.category}</p>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <Rating
          rating={product.rating}
          reviewCount={product.reviewCount}
        ></Rating>
        <p className="text-xl font-bold text-gray-900">
          {formatKRW(product.price)}
        </p>
        <p className="text-sm text-gray-600">재고: {product.stock}개</p>
      </div>
    </div>
  );
}
