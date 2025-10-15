// Vite/Next 빌드타임에서 문자열 비교로 tree-shaking이 가능
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// 각각의 구현을 명시적으로 import (코드스플리팅/트리쉐이킹을 위해 분리)
import { productService as mockImpl } from "./productService.mock";
import { productService as realImpl } from "./productService.real";

// 기본 export: 현재 모드의 구현
export const productService = useMock ? mockImpl : realImpl;

// 선택: 어떤 구현이 선택됐는지 디버그 로그 (개발 모드에서만)
if (process.env.NODE_ENV !== "production") {
  console.log("[service] productService =", useMock ? "MOCK" : "REAL");
}
