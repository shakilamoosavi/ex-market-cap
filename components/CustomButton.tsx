import React from "react";

type ButtonType = "submit" | "cancel" | "info" | "link";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: ButtonType;
  children: React.ReactNode;
}

const typeStyles: Record<ButtonType, string> = {
  submit: "bg-green-600 hover:bg-green-700 text-white",
  cancel: "bg-orange-500 hover:bg-orange-600 text-white",
  info:   "bg-blue-500 hover:bg-blue-600 text-white",
  link:   "bg-transparent hover:underline text-blue-600 shadow-none px-0",
};

const baseStyles = "px-4 py-4 rounded text-sm font-medium transition-all duration -200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

export default function CustomButton({ btnType, children, className = "", ...props }: CustomButtonProps) {
  return (
    <button
      {...props}
      className={`${baseStyles} ${typeStyles[btnType]} ${className}`}
    >
      {children}
    </button>
  );
}
