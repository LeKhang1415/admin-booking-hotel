import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { bookingApi } from "../../../services/booking.api";
import { useNavigate } from "react-router-dom";

type MarkAsPaidContentProps = {
    bookingId: string;
    close?: () => void;
};

function MarkAsPaidContent({ bookingId, close }: MarkAsPaidContentProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => bookingApi.markAsPaid(bookingId),
    });

    const handleConfirm = () => {
        mutate(undefined, {
            onSuccess: () => {
                toast.success("Booking marked as paid!");
                queryClient.invalidateQueries({ queryKey: ["bookings"] });
                close?.();
                navigate("/bookings");
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMessage = axiosError.response?.data?.message;
                toast.error(
                    errorMessage || "Failed to mark as paid. Try again!"
                );
            },
        });
    };

    return (
        <>
            <Modal.Header>Mark Booking as Paid</Modal.Header>
            <Modal.Body>
                <div className="p-4 text-center">
                    <p className="text-lg font-normal">
                        Are you sure you want to mark this booking as paid?
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={close}
                    disabled={isPending}
                    className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    isLoading={isPending}
                    variant="success"
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </>
    );
}

export default MarkAsPaidContent;
