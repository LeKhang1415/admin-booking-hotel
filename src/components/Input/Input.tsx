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
    ...rest
}: Props) {
    return (
        <div>
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-1 font-medium capitalize text-white"
                >
                    {label}
                </label>
            )}

            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className="w-full border text-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 h-[40px] min-w-64 text-sm "
                {...(register ? register(name, rules) : {})}
                {...rest}
            />

            {errorMessage && (
                <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    );
}
