import classNames from "classnames";
import type { SelectOptsType } from "../../types/utils.type";

export type FilterSelectProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOptsType[];
    placeholder?: string;
    className?: string;
};

export default function FilterSelect({
    label,
    value,
    onChange,
    options,
    placeholder = "All",
    className,
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
                className={classNames(
                    "w-full border text-text border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus h-[40px] text-sm bg-card-bg hover:border-accent transition-colors",
                    className
                )}
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
