import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUrl from "../../../hooks/useUrl";
import useQueryParams from "../../../hooks/useQueryParams";

import { isUndefined, omitBy } from "lodash";
import type { User, UserListQuery } from "../../../types/user.type";
import { userApi } from "../../../services/user.api";

function useUsers() {
    const { currentValue } = useUrl<number>({ field: "page", defaultValue: 1 });
    const page = Number(currentValue);
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<UserListQuery>();

    const queryConfig: UserListQuery = omitBy(
        {
            limit: Number(queryParams.limit) || 10,
            page: Number(queryParams.page) || 1,
            search: queryParams.search || "",
        },
        isUndefined
    );

    const { data, isLoading } = useQuery({
        queryKey: ["users", queryConfig],
        queryFn: () => userApi.getAllUser(queryConfig),
    });

    const users: User[] = data?.data?.data.data || [];
    const totalPages = data?.data?.data.meta.totalPages ?? 0;

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["users", { ...queryConfig, page: page + 1 }],
            queryFn: () =>
                userApi.getAllUser({ ...queryConfig, page: page + 1 }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["users", { ...queryConfig, page: page - 1 }],
            queryFn: () =>
                userApi.getAllUser({ ...queryConfig, page: page - 1 }),
        });
    }

    return { users, isLoading, totalPages };
}

export default useUsers;
