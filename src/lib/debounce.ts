"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function useDebounceValue<T>(value: T, delay = 300): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: 300
) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  return useMemo(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const debounced = (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fnRef.current(...args), delay);
    };
    debounced.cancle = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
    return debounced;
  }, [delay]) as T & { cancle: () => void };
}
