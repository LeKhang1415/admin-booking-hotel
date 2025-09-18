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
import Heading from "../../components/Heading";
import Select from "../../components/Select";
import { BookingStatus } from "../../types/booking.types";
import useUrl from "../../hooks/useUrl";
import Search from "../../components/Search";

function CheckinCheckout() {
    const {
        todayBookings,
        isLoading,
        totalPages,
        refetch: refetchBookings,
    } = useTodayBooking();

    const { currentValue: search, handler: setSearch } = useUrl<string>({
        field: "search",
        defaultValue: "",
    });

    const { currentValue: status, handler: setStatus } = useUrl<string>({
        field: "status",
        defaultValue: "",
    });

    const statusOptions = [
        { value: "", label: "All status" },
        { value: BookingStatus.UNPAID, label: "Unpaid" },
        { value: BookingStatus.PAID, label: "Paid" },
        { value: BookingStatus.CHECKED_IN, label: "Checked In" },
        { value: BookingStatus.COMPLETED, label: "Completed" },
    ];

    const { todaySummary, refetch: refetchSummary } = useTodaySummary();

    // socket callbacks
    const handleNoShow = useCallback(() => {
        refetchBookings();
        refetchSummary();
    }, [refetchBookings, refetchSummary]);

    const handleCheckedOut = useCallback(() => {
        refetchBookings();
        refetchSummary();
    }, [refetchBookings, refetchSummary]);

    // kết nối socket
    useBookingSocket(handleNoShow, handleCheckedOut);

    return (
        <Main>
            <Heading>
                <h1 className="text-3xl font-bold text-text">
                    Check In - Check Out
                </h1>
            </Heading>

            {/* Stats */}
            <div className="w-full mx-auto">
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

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search value={search ?? ""} onChange={setSearch} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select
                            name="status"
                            value={status}
                            onChange={setStatus}
                            options={statusOptions}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Booking list */}
            <div className="w-full mx-auto mt-6">
                <BookingList
                    bookings={todayBookings || []}
                    loading={isLoading}
                />
            </div>

            {/* Pagination */}
            <div className="w-full mx-auto">
                <Pagination
                    className="flex justify-between mb-5 mt-4"
                    totalPages={totalPages}
                />
            </div>
        </Main>
    );
}

export default CheckinCheckout;
