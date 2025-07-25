import * as React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`bg-white shadow rounded-xl p-6 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};
