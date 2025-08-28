import { type InputHTMLAttributes } from "react";
import { type RegisterOptions, type UseFormRegister } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    name: string;
    rules?: RegisterOptions;
    errorMessage?: string;
    register?: UseFormRegister<any>;
};

export default function Input({
    label,
    name,
    rules,
    type = "text",
    placeholder,
    register,
    errorMessage,
    ...rest // rest sẽ không bao gồm name nữa vì đã destructure
}: Props) {
    return (
        <div>
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-1 font-medium capitalize text-muted"
                >
                    {label}
                </label>
            )}

            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className="w-full border border-border bg-card-bg text-text rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus focus:border-accent h-[40px] text-sm placeholder:text-muted-2"
                // Thay đổi thứ tự: register trước, rest sau để rest không override
                {...(register ? register(name, rules) : { name })}
                {...rest}
            />

            {errorMessage && (
                <p className="text-sm text-danger mt-1">{errorMessage}</p>
            )}
        </div>
    );
}
