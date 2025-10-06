import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../../../services/review.api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

type ToggleContentReviewProps = {
    reviewId: string;
    isActive: boolean;
    close?: () => void;
};

function ToggleContentReview({
    reviewId,
    isActive,
    close,
}: ToggleContentReviewProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => reviewApi.toggleReviewStatus(reviewId),
    });

    const handleToggle = () => {
        mutate(undefined, {
            onSuccess: () => {
                toast.success(
                    `Review ${
                        isActive ? "deactivated" : "activated"
                    } successfully!`
                );
                queryClient.invalidateQueries({ queryKey: ["reviews"] });
                close?.();
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMessage = axiosError.response?.data?.message;
                toast.error(
                    errorMessage ||
                        "Failed to update review status. Please try again!"
                );
            },
        });
    };

    return (
        <>
            <Modal.Header>
                {isActive ? "Deactivate Review" : "Activate Review"}
            </Modal.Header>

            <Modal.Body>
                <div className="p-4 md:p-5 text-center">
                    <svg
                        className={`mx-auto mb-4 ${
                            isActive ? "text-red-500" : "text-green-500"
                        } w-12 h-12`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>

                    <h3
                        className={`mb-5 text-lg font-normal ${
                            isActive ? "text-red-500" : "text-green-600"
                        }`}
                    >
                        {isActive
                            ? "Are you sure you want to deactivate this review?"
                            : "Do you want to activate this review?"}
                    </h3>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="button"
                    onClick={close}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    onClick={handleToggle}
                    isLoading={isPending}
                    className={
                        isActive
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                    }
                >
                    {isActive ? "Deactivate" : "Activate"}
                </Button>
            </Modal.Footer>
        </>
    );
}

export default ToggleContentReview;
