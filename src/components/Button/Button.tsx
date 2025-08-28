import classNames from "classnames";
import { type ButtonHTMLAttributes } from "react";
import Spinner from "../Spinner";

type ButtonSize = "lg" | "sm" | "md";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    size?: ButtonSize;
    variant?: string | null;
    disabled?: boolean;
    isLoading?: boolean;
};

export default function Button(props: PropsType) {
    const {
        children,
        className = "",
        icon,
        variant = "primary",
        size = "lg",
        isLoading,
        disabled,
        onClick,
        ...rest
    } = props;

    return (
        <button
            className={classNames(
                "relative center min-w-[108px] px-3 rounded-md text-center capitalize cursor-pointer font-bold text-sm bg-accent text-black hover:bg-accent-600  transition-all duration-200 shadow-card",
                className,
                {
                    "h-[45px]": size === "lg",
                    "h-[28px] text-sm font-semibold": size === "md",
                    "h-[20px] text-xs font-normal": size === "sm",
                    "opacity-50 cursor-not-allowed": disabled,
                }
            )}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {isLoading && <Spinner />}
            {!isLoading && (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    );
}
