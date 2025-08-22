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
            searchParams.delete(fieldOperator);
            setSearchParams(searchParams);
            return;
        }
        handler(value);
    }

    return (
        <div>
            {label && (
                <label
                    htmlFor={fieldOperator}
                    className="block mb-1 font-medium capitalize text-white"
                >
                    {label}
                </label>
            )}

            <select
                id={fieldOperator}
                value={currentValue}
                onChange={handleOnChange}
                className="w-full border text-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none h-[40px] min-w-64 text-sm bg-[#2a2a2a]"
            >
                <option
                    key="all"
                    value="all"
                    className="bg-[#2a2a2a] text-white"
                >
                    All
                </option>
                {options?.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#2a2a2a] text-white"
                    >
                        {option.label.replace(/-/g, " ")}
                    </option>
                ))}
            </select>
        </div>
    );
}
