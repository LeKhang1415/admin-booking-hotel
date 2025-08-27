import useUrl from "../../hooks/useUrl";

type FilterInputProps = {
    label?: string;
    field: string;
    placeholder?: string;
};

export default function FilterInput({
    label,
    field,
    placeholder,
}: FilterInputProps) {
    const { currentValue, handler } = useUrl<string | undefined>({
        field,
        defaultValue: undefined,
    });

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim();
        handler(value === "" ? undefined : value);
    }

    // Đảm bảo value luôn là string, không bao giờ undefined
    const displayValue = currentValue || "";

    return (
        <div>
            {label && (
                <label
                    htmlFor={field}
                    className="block mb-1 font-medium capitalize text-muted"
                >
                    {label}
                </label>
            )}

            <input
                id={field}
                type="text"
                value={displayValue}
                onChange={handleOnChange}
                placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
                className="w-full border border-border bg-card-bg text-text rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus focus:border-accent h-[40px] min-w-64 text-sm placeholder:text-muted-2"
            />
        </div>
    );
}
