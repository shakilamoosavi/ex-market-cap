import React from "react";

type ButtonType = "submit" | "cancel" | "info" | "link";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: ButtonType;
  children: React.ReactNode;
}

const typeStyles: Record<ButtonType, string> = {
  submit: "bg-[#AC479] hover:bg-[#2ea865] text-white",
  cancel: "bg-red-500 hover:bg-red-600 text-white",
  info:   "bg-blue-500 hover:bg-blue-600 text-white",
  link:   "bg-transparent hover:underline text-[#AC479] shadow-none px-0",
};

const baseStyles = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration -200 cursor-pointer w-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

export default function Logo() {
  return (
    <div>
        <span className="text-[#835ef5] text-2xl font-bold">E</span>
        <span className="text-[#835ef5] text-2xl font-bold">X</span>
        <span className="text-[#676d7] text-xl font-bold">-</span>
        <span className="text-[#0e75f1] text-xl font-bold">M</span>
        <span className="text-[#5d85b4] text-xl font-bold">A</span>
        <span className="text-[#6cafff] text-xl font-bold">R</span>
        <span className="text-[#5490d7] text-xl font-bold">K</span>
        <span className="text-[#2865adab] text-xl font-bold">E</span>
        <span className="text-[#835ef5] text-xl font-bold">T</span>
    </div>
  );
}
