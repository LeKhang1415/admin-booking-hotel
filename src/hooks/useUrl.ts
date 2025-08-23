import { useSearchParams } from "react-router-dom";

function useUrl<T>({
    field,
    defaultValue,
}: {
    field: string;
    defaultValue?: T;
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy value từ URL, nếu không có thì dùng defaultValue
    const urlValue = searchParams.get(field);
    const currentValue = urlValue !== null ? (urlValue as T) : defaultValue;

    function handler(value: T | undefined): void {
        const newParams = new URLSearchParams(searchParams);

        // Reset page nếu đổi filter
        if (searchParams.get("page")) {
            newParams.set("page", "1");
        }

        if (field === "page" && value === 1) {
            newParams.delete("page");
        }
        // Nếu value là undefined, null hoặc empty string → xóa khỏi URL
        else if (value === undefined || value === null || value === "") {
            newParams.delete(field);
        }
        // Set giá trị bình thường
        else {
            newParams.set(field, String(value));
        }

        setSearchParams(newParams);
    }

    return { currentValue, handler };
}

export default useUrl;
