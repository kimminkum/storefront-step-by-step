import { productService as mockImpl } from "./productService.mock";
import { productService as realImpl } from "./productService.real";

const raw = process.env.NEXT_PUBLICK_USE_MOCK;

const useMock = raw == null ? true : ["true", "1"].includes(raw.toLowerCase());

export const productService = useMock ? mockImpl : realImpl;

if (process.env.NODE_ENV !== "production") {
  console.log("[service] productService = ", useMock ? "MOCK" : "Real");
}
