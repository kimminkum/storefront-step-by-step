// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // v5 권장: 클라이언트에서 1회 생성
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // UX 기본: 신선도/가비지 수명
            staleTime: 10_000, // 10s
            gcTime: 5 * 60_000, // 5m
            retry: 1,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <QueryClientProvider client={client}>
      {/* App Router에서의 스트리밍/하이드레이션 지원 */}
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
