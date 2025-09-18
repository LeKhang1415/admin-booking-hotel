import type { SelectOptsType } from "../../types/utils.type";

export type FilterSelectProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOptsType[];
    placeholder?: string;
};

export default function FilterSelect({
    label,
    value,
    onChange,
    options,
    placeholder = "All",
}: FilterSelectProps) {
    return (
        <div>
            {label && (
                <label className="block mb-1 font-medium capitalize text-text">
                    {label}
                </label>
            )}

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border text-text border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus h-[40px] min-w-64 text-sm bg-card-bg hover:border-accent transition-colors"
            >
                <option key="all" value="">
                    {placeholder}
                </option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label.replace(/-/g, " ")}
                    </option>
                ))}
            </select>
        </div>
    );
}
