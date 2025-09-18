import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    delay?: number; // debounce delay
    disabled?: boolean;
}

function Search({
    placeholder = "Search...",
    value = "",
    onChange,
    delay = 500,
    disabled = false,
}: SearchProps) {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    // debounce gọi onChange
    useEffect(() => {
        const handler = setTimeout(() => {
            onChange?.(internalValue);
        }, delay);

        return () => clearTimeout(handler);
    }, [internalValue, delay, onChange]);

    return (
        <div className="relative w-full">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                value={internalValue}
                onChange={(e) => setInternalValue(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}

export default Search;
