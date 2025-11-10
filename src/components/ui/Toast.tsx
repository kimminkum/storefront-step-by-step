"use client";

import { useEffect } from "react";
import type { Toast as ToastType } from "@/stores/toastStore";

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export const Toast = ({ toast, onRemove }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ"
  };

  return (
    <div
      className={`${
        colors[toast.type]
      } text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in`}
    >
      <span className="text-xl font-bold">{icons[toast.type]}</span>
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-white hover:text-gray-200 font-bold text-xl"
      >
        ×
      </button>
    </div>
  );
};
