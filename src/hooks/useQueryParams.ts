import { useSearchParams } from "react-router-dom";

function useQueryParams<T>() {
    const [searchParams] = useSearchParams();
    const queryParams: T = Object.fromEntries(searchParams) as T;
    return queryParams;
}

export default useQueryParams;
