import type { ReviewListQuery, ReviewResponse } from "../types/review.types";
import type { SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const reviewApi = {
    getAllReviews: (params: ReviewListQuery) =>
        http.get<SuccessResponseApi<ReviewResponse>>("/reviews", {
            params,
        }),
};
