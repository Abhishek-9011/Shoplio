import clsx from "clsx";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
  loading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-300 text-purple-700 hover:bg-purple-400",
};

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const defaultStyles =
  "rounded-md flex items-center justify-center font-medium transition duration-200";

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
  loading = false,
  loadingText,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(defaultStyles, variantStyles[variant], sizeStyles[size], {
        "opacity-50 cursor-not-allowed": loading || disabled,
      })}
      disabled={loading || disabled}
      aria-busy={loading}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 mr-2 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
      {loading ? loadingText || "Loading..." : text}
      {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};
