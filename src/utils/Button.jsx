import React from "react";
import { Loader2 } from "lucide-react"; // optional spinner icon

/**
 * Reusable Button component
 *
 * Props:
 * - variant: "primary" | "secondary" | "outline" | "danger"
 * - isLoading: boolean (optional)
 * - fullWidth: boolean (optional)
 * - children: ReactNode (button text or JSX)
 * - onClick: function
 * - type: "button" | "submit" | "reset"
 */
export default function Button({
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  children,
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90 focus:ring-orange-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  const sizeStyles = fullWidth ? "w-full py-3 text-base" : "px-5 py-2.5 text-sm";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}