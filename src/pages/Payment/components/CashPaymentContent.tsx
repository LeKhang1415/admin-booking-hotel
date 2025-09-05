import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { paymentApi } from "../../../services/payment.api";
import type { Payment } from "../../../types/payment.types";
import { formatCurrency } from "../../../utils/utils";
import type { Booking } from "../../../types/booking.types";
import { useNavigate } from "react-router-dom";

type CashPaymentContentProps = {
    booking: Booking;
    close?: () => void;
};

function CashPaymentContent({ booking, close }: CashPaymentContentProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    //Tạo payment
    const createMutation = useMutation({
        mutationFn: () => paymentApi.createCashPayment(booking.bookingId),
        onSuccess: (_res) => {
            toast.success("Cash payment created!");
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            toast.error(
                axiosError.response?.data?.message ||
                    "Failed to create cash payment"
            );
        },
    });

    //Confirm payment
    const confirmMutation = useMutation({
        mutationFn: (paymentCode: string) =>
            paymentApi.confirmCashPayment(paymentCode),
        onSuccess: () => {
            toast.success("Cash payment confirmed!");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            close?.();
            navigate("/bookings");
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            toast.error(
                axiosError.response?.data?.message ||
                    "Failed to confirm cash payment"
            );
        },
    });

    const handleCreate = () => {
        createMutation.mutate();
    };

    const handleConfirm = () => {
        const payment: Payment | undefined = createMutation.data?.data.data;
        if (payment?.paymentCode) {
            confirmMutation.mutate(payment.paymentCode);
        }
    };

    const payment: Payment | undefined = createMutation.data?.data.data;

    return (
        <>
            <Modal.Header>Cash Payment</Modal.Header>
            <Modal.Body>
                {!payment ? (
                    <div className="p-4 text-center">
                        <p className="text-lg font-normal text-text">
                            Do you want to create a cash payment for this
                            booking?
                        </p>
                        <p className="text-muted mt-2">
                            Amount:
                            <span className="font-semibold text-accent">
                                {formatCurrency(booking.totalAmount)}
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="bg-gray-100 p-4 rounded-md text-left space-y-2">
                            <p className="text-lg font-semibold text-text mb-3">
                                Booking detail
                            </p>
                            <p>
                                <span className="text-muted">Booking ID: </span>
                                <span className="font-semibold">
                                    {booking.bookingId}
                                </span>
                            </p>
                            <p>
                                <span className="text-muted">Customer: </span>
                                <span className="font-semibold">
                                    {booking.customer.fullName}
                                </span>
                            </p>

                            <p>
                                <span className="text-muted">Room: </span>
                                <span className="font-semibold">
                                    {booking.room.name}
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center text-lg mb-2">
                            <span className="font-medium text-gray-700">
                                Amount:
                            </span>
                            <span className="font-bold text-blue-600">
                                {formatCurrency(payment.amount)}
                            </span>
                        </div>
                        <p className="text-sm text-muted text-center">
                            Click confirm when you have received the cash.
                        </p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={close}
                    disabled={
                        createMutation.isPending || confirmMutation.isPending
                    }
                    className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </Button>
                {!payment ? (
                    <Button
                        onClick={handleCreate}
                        isLoading={createMutation.isPending}
                    >
                        Create Cash Payment
                    </Button>
                ) : (
                    <Button
                        onClick={handleConfirm}
                        isLoading={confirmMutation.isPending}
                    >
                        Confirm Payment
                    </Button>
                )}
            </Modal.Footer>
        </>
    );
}

export default CashPaymentContent;
