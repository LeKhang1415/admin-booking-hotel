import { type SelectHTMLAttributes } from "react";
import { type RegisterOptions, type UseFormRegister } from "react-hook-form";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    name: string;
    rules?: RegisterOptions;
    errorMessage?: string;
    register?: UseFormRegister<any>;
    options: { value: string | number; label: string }[];
};

export default function Select({
    label,
    name,
    rules,
    register,
    errorMessage,
    options,
    ...rest
}: Props) {
    return (
        <div>
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-1 font-medium capitalize text-text"
                >
                    {label}
                </label>
            )}

            <select
                id={name}
                className="w-full border text-text border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus h-[40px] min-w-64 text-sm bg-card-bg hover:border-accent transition-colors"
                {...(register ? register(name, rules) : {})}
                {...rest}
            >
                {options.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-card-bg text-text"
                    >
                        {opt.label}
                    </option>
                ))}
            </select>

            {errorMessage && (
                <p className="text-sm text-danger mt-1">{errorMessage}</p>
            )}
        </div>
    );
}
