import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay = 300) {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debounceValue;
}

export default useDebounce;
