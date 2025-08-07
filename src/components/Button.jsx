import React from "react";
import classNames from "classnames";

const baseStyles = "px-4 py-2 rounded text-sm font-medium focus:outline-none transition";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-green-600 text-white hover:bg-green-700",
  ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
};

export default function Button({ variant = "primary", className = "", children, ...props }) {
  const combined = classNames(baseStyles, variants[variant], className);

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
