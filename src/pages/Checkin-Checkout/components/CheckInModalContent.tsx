import type { Booking } from "../../../types/booking.types";
import useCheckIn from "../hooks/useCheckIn";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { formatDate } from "../../../utils/utils";
import { FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

type CheckInModalContentProps = {
    booking: Booking;
    close?: () => void;
};

function CheckInModalContent({ booking, close }: CheckInModalContentProps) {
    const { mutate: checkIn, isPending: isCheckingIn } = useCheckIn();

    const handleConfirm = () => {
        checkIn(booking.bookingId, {
            onSuccess: () => {
                toast.success("Check-in successful!");
                close?.();
            },
            onError: (error: any) => {
                const message =
                    error?.response?.data?.message ||
                    "Check-in failed. Please try again.";
                toast.error(message);
            },
        });
    };

    const now = new Date();

    return (
        <>
            <Modal.Header>Confirm Check-In</Modal.Header>
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

                    <div className="rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-700 flex items-start gap-2">
                        <FiCheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <p>
                            Customer will be able to check in at{" "}
                            <span>{formatDate(now, true, true)}</span>
                        </p>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={close}
                    disabled={isCheckingIn}
                    className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    isLoading={isCheckingIn}
                    className="w-full py-2 rounded-md bg-green-600 hover:bg-green-500"
                >
                    Confirm Check-In
                </Button>
            </Modal.Footer>
        </>
    );
}

export default CheckInModalContent;
