import * as React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = "" }) => {
  return <table className={`table-auto w-full text-left ${className}`}>{children}</table>;
};

export const TableHeader: React.FC<TableProps> = ({ children, className = "" }) => {
  return <thead className={`bg-gray-100 ${className}`}>{children}</thead>;
};

export const TableRow: React.FC<TableProps> = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};

export const TableCell: React.FC<TableProps> = ({ children, className = "" }) => {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
};

export const TableBody: React.FC<TableProps> = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};
