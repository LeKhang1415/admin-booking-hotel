import useUrl from "../../hooks/useUrl";
import { useSearchParams } from "react-router-dom";
import type { SelectOptsType } from "../../types/utils.type";

export type FilterSelectProps = {
    label: string;
    field: string;
    operator?: "gte" | "lte";
    options: SelectOptsType[];
};

export default function FilterSelect({
    label,
    field,
    operator,
    options,
}: FilterSelectProps) {
    const fieldOperator = operator ? `${field}_${operator}` : field;
    const { currentValue, handler } = useUrl<string | undefined>({
        field: fieldOperator,
        defaultValue: "",
    });
    const [searchParams, setSearchParams] = useSearchParams();

    function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        if (value === "all") {
            // Tạo bản sao để tránh mutate trực tiếp nếu cần
            const next = new URLSearchParams(searchParams.toString());
            next.delete(fieldOperator);
            setSearchParams(next);
            return;
        }
        handler(value);
    }

    return (
        <div>
            {label && (
                <label
                    htmlFor={fieldOperator}
                    className="block mb-1 font-medium capitalize text-text"
                >
                    {label}
                </label>
            )}

            <select
                id={fieldOperator}
                value={currentValue}
                onChange={handleOnChange}
                className="w-full border text-text border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus h-[40px] min-w-64 text-sm bg-card-bg hover:border-accent transition-colors"
            >
                <option key="all" value="all" className="bg-card-bg text-text">
                    All
                </option>
                {options?.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-card-bg text-text"
                    >
                        {option.label.replace(/-/g, " ")}
                    </option>
                ))}
            </select>
        </div>
    );
}
