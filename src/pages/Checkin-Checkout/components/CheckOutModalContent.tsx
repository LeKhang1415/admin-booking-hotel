import type { Booking } from "../../../types/booking.types";
import useCheckOut from "../hooks/useCheckOut";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { formatDate } from "../../../utils/utils";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

type CheckOutModalContentProps = {
    booking: Booking;
    close?: () => void;
};

function CheckOutModalContent({ booking, close }: CheckOutModalContentProps) {
    const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut();

    const handleConfirm = () => {
        checkOut(booking.bookingId, {
            onSuccess: () => {
                close?.();
            },
            onError: (error: any) => {
                const message =
                    error?.response?.data?.message ||
                    "Check-out failed. Please try again.";
                toast.error(message);
            },
        });
    };

    const now = new Date();

    return (
        <>
            <Modal.Header>Confirm Check-Out</Modal.Header>
            <Modal.Body>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="font-medium">Booking ID:</span>
                        <span>{booking.bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Room:</span>
                        <span>{booking.room?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Customer:</span>
                        <span>{booking.customer.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Phone:</span>
                        <span>{booking.customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Time:</span>
                        <span>
                            {formatDate(booking.startTime, true, true)} –{" "}
                            {formatDate(booking.endTime, true, true)}
                        </span>
                    </div>
                    {/* Notification box */}
                    <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 flex items-start gap-2">
                        <FiLogOut className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <p>
                            Customer will checking out at{" "}
                            <span>{formatDate(now, true, true)}</span>
                        </p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={close}
                    disabled={isCheckingOut}
                    className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    isLoading={isCheckingOut}
                    className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-400"
                >
                    Confirm Check-Out
                </Button>
            </Modal.Footer>
        </>
    );
}

export default CheckOutModalContent;
