import Main from "../../components/Main";
import { CiCalendar } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import useTodayBooking from "../Bookings/hooks/useTodayBooking";
import useTodaySummary from "../Bookings/hooks/useTodaySummary";
import StatCard from "./components/StatCard";
import { BookingList } from "./components/BookingList";
import Pagination from "../../components/Pagination";
import { useCallback } from "react";
import { useBookingSocket } from "./hooks/useBookingSocket";
import type { Booking } from "../../types/booking.types";

function CheckinCheckout() {
    const {
        todayBookings,
        isLoading,
        totalPages,
        refetch: refetchBookings,
    } = useTodayBooking();
    const { todaySummary, refetch: refetchSummary } = useTodaySummary();

    // socket callbacks
    const handleNoShow = useCallback(
        (_booking: Booking) => {
            refetchBookings();
            refetchSummary();
        },
        [refetchBookings, refetchSummary]
    );

    const handleCheckedOut = useCallback(
        (_booking: Booking) => {
            refetchBookings();
            refetchSummary();
        },
        [refetchBookings, refetchSummary]
    );

    // kết nối socket
    useBookingSocket(handleNoShow, handleCheckedOut);

    return (
        <Main>
            <div className="max-w-6xl bg-card-bg p-6 rounded-xl shadow shadow-card w-full mx-auto mb-5">
                <h2 className="text-2xl text-black font-bold mb-1">
                    Check In / Check Out
                </h2>
            </div>

            {/* Stats */}
            <div className="max-w-6xl w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
                    <StatCard
                        icon={<CiCalendar className="w-6 h-6 text-blue-600" />}
                        title="Today"
                        value={todaySummary?.total}
                        bg="bg-blue-100"
                    />
                    <StatCard
                        icon={
                            <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-600" />
                        }
                        title="Check In"
                        value={todaySummary?.checkedIn}
                        bg="bg-green-100"
                    />
                    <StatCard
                        icon={
                            <FaRegClock className="w-6 h-6 text-purple-600" />
                        }
                        title="Waiting"
                        value={todaySummary?.waiting}
                        bg="bg-purple-100"
                    />
                    <StatCard
                        icon={<FiXCircle className="w-6 h-6 text-gray-600" />}
                        title="Completed"
                        value={todaySummary?.completed}
                        bg="bg-gray-100"
                    />
                </div>
            </div>

            {/* Booking list */}
            <div className="max-w-6xl w-full mx-auto mt-6">
                <BookingList
                    bookings={todayBookings || []}
                    loading={isLoading}
                />
            </div>

            {/* Pagination */}
            <div className="max-w-6xl w-full mx-auto">
                <Pagination
                    className="flex justify-between mb-5 mt-4"
                    totalPages={totalPages}
                />
            </div>
        </Main>
    );
}

export default CheckinCheckout;
