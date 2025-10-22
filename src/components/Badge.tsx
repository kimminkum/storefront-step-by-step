interface BadgeProps {
  children: React.ReactNode;
  variant?: "new" | "danger" | "warning";
}

export function Badge({ children, variant = "new" }: BadgeProps) {
  const styles = {
    new: "bg-blue-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-orange-500 text-white"
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
