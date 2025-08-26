// Textarea.tsx
import { type UseFormRegister } from "react-hook-form";

type PropsType = {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    errorMessage?: string;
    defaultValue?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
};

export default function Textarea({
    className = "",
    name,
    placeholder,
    label,
    errorMessage,
    defaultValue,
    register,
}: PropsType) {
    const registerResult = name && register ? register(name) : null;

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-1 font-medium capitalize text-muted"
                >
                    {label}
                </label>
            )}

            <textarea
                id={name}
                {...registerResult}
                defaultValue={defaultValue}
                rows={4}
                placeholder={placeholder}
                className="resize-none w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus bg-card-bg text-text placeholder:text-muted-2"
            />

            {errorMessage && (
                <span className="text-xs text-danger mt-2 block">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
