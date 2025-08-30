import type { Booking } from "../../../types/booking.types";
import BookingCard from "./BookingCard";

interface BookingListProps {
    bookings: Booking[];
    loading: boolean;
    handleCheckIn: (booking: Booking) => void;
    handleCheckOut: (booking: Booking) => void;
}

export function BookingList({
    bookings,
    loading,
    handleCheckIn,
    handleCheckOut,
}: BookingListProps) {
    return (
        <div className="bg-blue-100 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                    Booking Today ({bookings.length})
                </h2>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Không tìm thấy booking nào</p>
                </div>
            ) : (
                <div className="divide-gray-200">
                    {bookings.map((booking) => (
                        <BookingCard
                            key={booking.bookingId}
                            booking={booking}
                            loading={loading}
                            handleCheckIn={handleCheckIn}
                            handleCheckOut={handleCheckOut}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
