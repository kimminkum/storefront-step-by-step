"use client";

import { useCategories } from "@/hooks/useCategories";

export default function DevCats() {
  const { data, isLoading, error } = useCategories();
  if (isLoading) return <div>loding...</div>;
  if (error) return <div>error...</div>;
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
