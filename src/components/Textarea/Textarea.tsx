import { type UseFormRegister } from "react-hook-form";

type PropsType = {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    errorMessage?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
};

export default function Textarea({
    className,
    name,
    placeholder,
    label,
    errorMessage,
    register,
}: PropsType) {
    const registerResult = name && register ? register(name) : null;

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-1 font-medium capitalize text-white"
                >
                    {label}
                </label>
            )}

            <textarea
                id={name}
                {...registerResult}
                rows={4}
                className="resize-none w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                placeholder={placeholder}
            ></textarea>

            {errorMessage && (
                <span className="text-xs text-red-500 mt-2">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
