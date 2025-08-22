import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

type Props = {
    label: string;
    field: string;
    options: { label: string; value: string }[];
};

export default function FilterRadio({ label, field, options }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = useCallback(
        (value: string) => {
            if (value) {
                searchParams.set(field, value);
            } else {
                searchParams.delete(field);
            }
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams, field]
    );

    const selected = searchParams.get(field);

    return (
        <div className="space-y-2">
            <p className="font-medium text-white">{label}</p>
            <div className="flex flex-col gap-2">
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className="inline-flex items-center gap-2 text-white"
                    >
                        <input
                            type="radio"
                            name={field}
                            value={opt.value}
                            checked={selected === opt.value}
                            onChange={() => handleChange(opt.value)}
                            className="accent-blue-500 w-4 h-4"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
}
