import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUrl from "../../../hooks/useUrl";
import useQueryParams from "../../../hooks/useQueryParams";
import { isUndefined, omitBy } from "lodash";
import type { ReviewListQuery, Review } from "../../../types/review.types";
import { reviewApi } from "../../../services/review.api";

function useReviews() {
    const { currentValue } = useUrl<number>({ field: "page", defaultValue: 1 });
    const page = Number(currentValue);
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<ReviewListQuery & { sort?: string }>();

    let sortBy: "createdAt" | "rating" = "createdAt";
    let sortOrder: "ASC" | "DESC" = "DESC";

    if (queryParams.sort) {
        if (queryParams.sort.startsWith("-")) {
            sortBy = queryParams.sort.substring(1) as "createdAt" | "rating";
            sortOrder = "DESC";
        } else {
            sortBy = queryParams.sort as "createdAt" | "rating";
            sortOrder = "ASC";
        }
    }

    const queryConfig: ReviewListQuery = omitBy(
        {
            limit: Number(queryParams.limit) || 10,
            page: Number(queryParams.page) || 1,
            roomId: queryParams.roomId,
            userId: queryParams.userId,
            rating: queryParams.rating ? Number(queryParams.rating) : undefined,
            sortBy,
            sortOrder,
        },
        isUndefined
    );

    const { data, isLoading } = useQuery({
        queryKey: ["reviews", queryConfig],
        queryFn: () => reviewApi.getAllReviews(queryConfig),
    });

    const reviews: Review[] = data?.data?.data.data || [];
    const totalPages = data?.data?.data.meta.totalPages ?? 0;

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", { ...queryConfig, page: page + 1 }],
            queryFn: () =>
                reviewApi.getAllReviews({ ...queryConfig, page: page + 1 }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", { ...queryConfig, page: page - 1 }],
            queryFn: () =>
                reviewApi.getAllReviews({ ...queryConfig, page: page - 1 }),
        });
    }

    return { reviews, isLoading, totalPages };
}

export default useReviews;
