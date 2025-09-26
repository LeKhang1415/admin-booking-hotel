import { StayType, type Booking } from "../../../types/booking.types";
import { formatCurrency, formatDate } from "../../../utils/utils";

export default function BookingInfo({ booking }: { booking: Booking }) {
    const { room } = booking;

    const price =
        booking.stayType === StayType.DAILY
            ? room.pricePerDay
            : room.pricePerHour;

    const startDate = booking.actualCheckIn
        ? new Date(booking.actualCheckIn)
        : new Date(booking.startTime);
    const endDate = booking.actualCheckOut
        ? new Date(booking.actualCheckOut)
        : new Date(booking.endTime);

    return (
        <div className="flex items-start space-x-4">
            <img
                src={room.image}
                alt={room.name}
                className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {room.name}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-500">Stay type:</span>
                        <span className="font-medium ml-2">
                            {booking.stayType === StayType.DAILY
                                ? "Day"
                                : "Hour"}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Number of people:</span>
                        <span className="font-medium ml-2">
                            {booking.numberOfGuest}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Start date:</span>
                        <span className="font-medium ml-2">
                            {formatDate(startDate, true)}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">End date:</span>
                        <span className="font-medium ml-2">
                            {formatDate(endDate, true)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                    {formatCurrency(price)}/{" "}
                    {booking.stayType === StayType.DAILY ? "day" : "hour"}
                </div>
            </div>
        </div>
    );
}
