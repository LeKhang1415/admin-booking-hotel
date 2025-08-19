import { useSearchParams } from "react-router-dom";

function useUrl<T>({
    field,
    defaultValue,
}: {
    field: string;
    defaultValue?: T;
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentValue = searchParams.get(field) || defaultValue;

    function handler(value: T): void {
        const newParams = new URLSearchParams(searchParams);
        // reset page nếu đổi filter
        if (searchParams.get("page")) newParams.set("page", "1");

        // nếu field là page và value = 1 → xóa khỏi URL
        if (field === "page" && value === 1) {
            newParams.delete("page");
        } else {
            newParams.set(field, `${value}`);
        }

        setSearchParams(newParams);
        newParams.set(field, `${value}`);
        setSearchParams(newParams);
    }
    return { currentValue, handler };
}

export default useUrl;
