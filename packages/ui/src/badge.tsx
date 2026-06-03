import * as React from "react";

type BadgeVariant = "default" | "secondary" | "success" | "destructive" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-blue-100 text-blue-800",
  secondary: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-800",
  destructive: "bg-red-100 text-red-800",
  outline: "border border-gray-300 text-gray-700",
};

export function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
