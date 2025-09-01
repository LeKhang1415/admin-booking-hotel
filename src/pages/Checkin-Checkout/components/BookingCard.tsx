import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FiUsers, FiMail, FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    BookingStatus,
    StayType,
    type Booking,
} from "../../../types/booking.types";
import { formatCurrency, formatDate } from "../../../utils/utils";
import Button from "../../../components/Button";

import Modal from "../../../components/Modal";
import CheckInModalContent from "./CheckInModalContent";
import CheckOutModalContent from "./CheckOutModalContent";

const statusStyles: Record<BookingStatus, string> = {
    [BookingStatus.UNPAID]: "bg-red-100 text-red-600 border border-red-200",
    [BookingStatus.PAID]: "bg-green-100 text-green-600 border border-green-200",
    [BookingStatus.CHECKED_IN]:
        "bg-blue-100 text-blue-600 border border-blue-200",
    [BookingStatus.COMPLETED]:
        "bg-gray-100 text-gray-600 border border-gray-200",
    [BookingStatus.CANCELLED]:
        "bg-neutral-100 text-neutral-500 border border-neutral-200",
    [BookingStatus.REJECTED]:
        "bg-neutral-100 text-neutral-500 border border-neutral-200",
};

const statusText: Record<BookingStatus, string> = {
    [BookingStatus.UNPAID]: "Unpaid",
    [BookingStatus.PAID]: "Paid",
    [BookingStatus.CHECKED_IN]: "Checked In",
    [BookingStatus.COMPLETED]: "Completed",
    [BookingStatus.CANCELLED]: "Cancelled",
    [BookingStatus.REJECTED]: "Rejected",
};

interface BookingCardProps {
    booking: Booking;
    loading?: boolean;
}

function BookingCard({ booking, loading = false }: BookingCardProps) {
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-card-bg text-text border-b border-border transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 w-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 w-full">
                        <div>
                            <h3 className="text-lg font-semibold mb-1 text-text">
                                {booking.bookingId}
                            </h3>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                                <div className="flex items-center gap-1">
                                    <CiLocationOn className="w-4 h-4" />
                                    <span>
                                        {booking.room.name} (
                                        {booking.room.typeRoom.name})
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiUsers className="w-4 h-4" />
                                    <span>
                                        {booking.numberOfGuest} guest(s)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-md text-sm font-medium border ${
                                statusStyles[booking.bookingStatus]
                            }`}
                        >
                            {statusText[booking.bookingStatus] ??
                                booking.bookingStatus}
                        </span>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Customer */}
                        <div>
                            <p className="text-sm font-medium mb-1 text-text">
                                Customer
                            </p>
                            <div className="space-y-1 text-muted">
                                <div className="flex items-center gap-2 text-sm">
                                    <FaRegUser className="w-4 h-4" />
                                    <span>{booking.customer.fullName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FiPhone className="w-4 h-4" />
                                    <span>{booking.customer.phone}</span>
                                </div>
                                {booking.customer.email && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <FiMail className="w-4 h-4" />
                                        <span>{booking.customer.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Time */}
                        <div>
                            <p className="text-sm font-medium mb-1 text-text">
                                Time
                            </p>
                            <div className="space-y-1 text-muted">
                                <div className="flex items-center gap-2 text-sm">
                                    <CiCalendar className="w-4 h-4" />
                                    <span>
                                        Check-in:{" "}
                                        {formatDate(booking.startTime, true)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CiCalendar className="w-4 h-4" />
                                    <span>
                                        Check-out:{" "}
                                        {formatDate(booking.endTime, true)}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-2">
                                    {booking.stayType === StayType.HOURLY
                                        ? "Hourly"
                                        : "Daily"}
                                </div>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div>
                            <p className="text-sm font-medium mb-1 text-text">
                                Extra Information
                            </p>
                            <div className="space-y-1 text-muted">
                                <div className="text-sm">
                                    Total:{" "}
                                    <span className="font-bold text-accent">
                                        {formatCurrency(
                                            Number(booking.totalAmount)
                                        )}
                                    </span>
                                </div>
                                {booking.actualCheckIn && (
                                    <div className="text-xs text-success font-semibold">
                                        Checked in at:{" "}
                                        {formatDate(
                                            booking.actualCheckIn,
                                            true
                                        )}
                                    </div>
                                )}
                                {booking.actualCheckOut && (
                                    <div className="text-xs text-muted-2 font-semibold">
                                        Checked out at:{" "}
                                        {formatDate(
                                            booking.actualCheckOut,
                                            true
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col justify-end">
                            <Modal>
                                {booking.bookingStatus ===
                                    BookingStatus.UNPAID && (
                                    <Button
                                        disabled={loading}
                                        className="px-4 py-2 rounded-lg bg-red-500 text-white min-w-[120px] hover:bg-red-300"
                                        onClick={() => {
                                            navigate(
                                                `/payment/${booking.bookingId}`
                                            );
                                        }}
                                    >
                                        Pay Now
                                    </Button>
                                )}

                                {booking.bookingStatus ===
                                    BookingStatus.PAID && (
                                    <Modal.Open opens="check-in">
                                        <Button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-400 text-white min-w-[120px]">
                                            Check In
                                        </Button>
                                    </Modal.Open>
                                )}

                                {booking.bookingStatus ===
                                    BookingStatus.CHECKED_IN && (
                                    <Modal.Open opens="check-out">
                                        <Button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-400 text-white min-w-[120px]">
                                            Check Out
                                        </Button>
                                    </Modal.Open>
                                )}

                                <Modal.Content name="check-in">
                                    <CheckInModalContent booking={booking} />
                                </Modal.Content>
                                <Modal.Content name="check-out">
                                    <CheckOutModalContent booking={booking} />
                                </Modal.Content>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingCard;
