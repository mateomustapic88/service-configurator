import React from "react";
import "./Button.scss";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  size?: "big" | "small" | "icon";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  size = "big",
  disabled = false,
  children,
  className,
  onClick,
}) => {
  const classNames = `button ${type} ${size} ${disabled ? "disabled" : ""} ${
    className || ""
  }`.trim();

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
};

export default Button;
