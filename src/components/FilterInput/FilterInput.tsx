type FilterInputProps = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};

export default function FilterInput({
    label,
    placeholder,
    value,
    onChange,
}: FilterInputProps) {
    return (
        <div>
            {label && (
                <label className="block mb-1 font-medium capitalize text-muted">
                    {label}
                </label>
            )}

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
                className="w-full border border-border bg-card-bg text-text rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus focus:border-accent h-[40px] min-w-64 text-sm placeholder:text-muted-2"
            />
        </div>
    );
}
