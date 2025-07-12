import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
