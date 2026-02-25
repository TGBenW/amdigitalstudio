"use client";

type SharedProps = {
  text: string | React.ReactNode;
  className?: string;
  ariaLabel?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

type ButtonProps = SharedProps;

export default function Button(props: ButtonProps) {
  const {
    text,
    className = "",
    ariaLabel,
    href,
    onClick,
    type = "button",
    disabled = false,
    target,
    rel,
  } = props;
  const classes = `btn ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
}
