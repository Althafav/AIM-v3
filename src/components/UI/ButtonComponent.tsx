import Link from "next/link";
import React from "react";

type Variant = "secondary" | "primary" | "tertiary";

interface ButtonLinkProps {
  name?: string;
  link: string;
  target?: "_blank" | "_self";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  colorCode?: string; // still works for override
  variant?: Variant; // new
}

const ButtonComponent: React.FC<ButtonLinkProps> = ({
  name,
  link,
  target = "_self",
  className = "",
  icon,
  iconPosition = "right",
  children,
  colorCode,
  variant = "secondary", // <-- default
}) => {
  const content = children ?? (
    <>
      {icon && iconPosition === "left" && (
        <span className="btn-icon me-2">{icon}</span>
      )}
      {name}
      {icon && iconPosition === "right" && (
        <span className="btn-icon ms-2">{icon}</span>
      )}
    </>
  );

  return (
    <Link
      href={link}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`aimbtn aimbtn--${variant} ${className} text-sm sm:text-md`}
      style={colorCode ? { backgroundColor: colorCode } : undefined}
    >
      {content}
    </Link>
  );
};

export default ButtonComponent;
