import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      className={`text-white px-4 py-2 rounded text-sm sm:text-base md:px-6 md:py-3 ${className}`}
      style={{ backgroundColor: "#021A30", borderRadius: "12px" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
