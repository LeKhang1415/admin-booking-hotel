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
                    className="block mb-1 font-medium capitalize text-white"
                >
                    {label}
                </label>
            )}

            <select
                id={name}
                className="w-full border text-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none h-[40px] min-w-64 text-sm bg-[#2a2a2a]"
                {...(register ? register(name, rules) : {})}
                {...rest}
            >
                {options.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-[#2a2a2a] text-white"
                    >
                        {opt.label}
                    </option>
                ))}
            </select>

            {errorMessage && (
                <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    );
}
