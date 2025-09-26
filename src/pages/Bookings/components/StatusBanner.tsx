import classNames from "classnames";
import { BookingStatus } from "../../../types/booking.types";
import { formatDate } from "../../../utils/utils";

const statusColors = {
    [BookingStatus.UNPAID]: {
        border: "border-yellow-300 from-yellow-50 to-yellow-50",
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        subtext: "text-yellow-600",
        badge: "text-yellow-800 bg-yellow-100",
    },
    [BookingStatus.PAID]: {
        border: "border-green-300 from-green-50 to-emerald-50",
        bg: "bg-green-200",
        text: "text-green-800",
        subtext: "text-green-600",
        badge: "text-green-800 bg-green-100",
    },
    [BookingStatus.CHECKED_IN]: {
        border: "border-purple-300 from-purple-50 to-purple-100",
        bg: "bg-purple-200",
        text: "text-purple-800",
        subtext: "text-purple-600",
        badge: "text-purple-800 bg-purple-100",
    },
    [BookingStatus.COMPLETED]: {
        border: "border-blue-300 from-blue-50 to-blue-100",
        bg: "bg-blue-200",
        text: "text-blue-800",
        subtext: "text-blue-600",
        badge: "text-blue-800 bg-blue-100",
    },
    [BookingStatus.CANCELLED]: {
        border: "border-red-300 from-red-50 to-red-100",
        bg: "bg-red-200",
        text: "text-red-800",
        subtext: "text-red-600",
        badge: "text-red-800 bg-red-100",
    },
    [BookingStatus.REJECTED]: {
        border: "border-orange-300 from-orange-50 to-orange-100",
        bg: "bg-orange-200",
        text: "text-orange-800",
        subtext: "text-orange-600",
        badge: "text-orange-800 bg-orange-100",
    },
    [BookingStatus.NO_SHOW]: {
        border: "border-gray-300 from-gray-50 to-gray-100",
        bg: "bg-gray-200",
        text: "text-gray-800",
        subtext: "text-gray-600",
        badge: "text-gray-800 bg-gray-200",
    },
};

const statusMessages = {
    [BookingStatus.UNPAID]: "Awaiting payment",
    [BookingStatus.PAID]: "Customer has paid in full",
    [BookingStatus.CHECKED_IN]: "Customer has checked in",
    [BookingStatus.COMPLETED]: "Booking has been completed",
    [BookingStatus.CANCELLED]: "Booking was cancelled",
    [BookingStatus.REJECTED]: "Booking request was rejected",
    [BookingStatus.NO_SHOW]: "Customer did not show up",
};

export default function StatusBanner({
    status,
    updatedAt,
}: {
    status: BookingStatus;
    updatedAt: string;
}) {
    const cssStatus = statusColors[status];

    return (
        <div
            className={classNames(
                "bg-gradient-to-r border rounded-xl p-6 mb-8",
                cssStatus.border
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className={classNames(
                            "p-3 rounded-full mr-4",
                            cssStatus.bg
                        )}
                    ></div>
                    <div>
                        <h3
                            className={classNames(
                                "text-lg font-semibold uppercase",
                                cssStatus.text
                            )}
                        >
                            Booking {status}
                        </h3>
                        <p className={cssStatus.subtext}>
                            {statusMessages[status]} • Last updated:{" "}
                            {formatDate(updatedAt, true)}
                        </p>
                    </div>
                </div>
                <span
                    className={classNames(
                        "px-4 py-2 rounded-full text-sm font-medium uppercase",
                        cssStatus.text,
                        cssStatus.bg
                    )}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}
