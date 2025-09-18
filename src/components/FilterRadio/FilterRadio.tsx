type Option = { label: string; value: string };

type Props = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
};

export default function FilterRadio({
    label,
    value,
    onChange,
    options,
}: Props) {
    return (
        <div className="space-y-2">
            <p className="font-medium text-text">{label}</p>
            <div className="flex flex-col gap-2">
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className="inline-flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name={label}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={() => onChange(opt.value)}
                            className="w-4 h-4 accent-accent"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
}
