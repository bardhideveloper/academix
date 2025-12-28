import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
};

type ButtonProps =
  | (CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
  | (CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: typeof Link; to: string });

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    className,
    ...rest
  } = props as any;

  const classes = [
    "ax-btn",
    `ax-btn--${variant}`,
    `ax-btn--${size}`,
    fullWidth ? "ax-btn--full" : "",
    loading ? "ax-btn--loading" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (props.as === Link) {
    const { to } = props as any;
    return (
      <Link to={to} className={classes} {...rest}>
        {loading && <Spinner />}
        {!loading && leftIcon && <span className="ax-btn__icon">{leftIcon}</span>}
        <span className="ax-btn__label">{children}</span>
        {!loading && rightIcon && <span className="ax-btn__icon">{rightIcon}</span>}
      </Link>
    );
  }

  const { disabled, ...btnRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={classes}
      disabled={loading || disabled}
      {...btnRest}
    >
      {loading && <Spinner />}
      {!loading && leftIcon && <span className="ax-btn__icon">{leftIcon}</span>}
      <span className="ax-btn__label">{children}</span>
      {!loading && rightIcon && <span className="ax-btn__icon">{rightIcon}</span>}
    </button>
  );
}

function Spinner() {
  return <span className="ax-btn__spinner" aria-hidden="true" />;
}
