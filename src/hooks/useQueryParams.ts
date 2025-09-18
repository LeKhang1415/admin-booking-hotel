import { useSearchParams } from "react-router-dom";

function useQueryParams<T>() {
    const [searchParams] = useSearchParams();
    const queryParams = Object.fromEntries(searchParams) as Partial<T>;
    return queryParams;
}

export default useQueryParams;
