import type { Room } from "../../../types/room.types";
import { formatCurrency, formatDate, parseString } from "../../../utils/utils";

type Props = {
    room: Room;
    startDate: Date;
    endDate: Date;
    numberOfPeople: number;
    priceType: "day" | "hour";
    totalPrice: number;
};

export default function BookingPreviewCard({
    room,
    startDate,
    endDate,
    numberOfPeople,
    priceType,
    totalPrice,
}: Props) {
    const facilities = parseString(room.facilities);

    return (
        <article className="bg-primary rounded-2xl shadow p-6 flex flex-col gap-6 text-white min-h-full">
            <h2 className="text-lg font-semibold">Booking Summary</h2>

            {/* top: image + name */}
            <div className="flex gap-4 items-start">
                <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-white">
                        {room.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        {room.typeRoom?.name ?? room.interior}
                    </p>
                </div>
            </div>

            {/* booking info */}
            <div className="border-t border-gray-700 pt-4 space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                    <span>Check-in date:</span>
                    <span className="text-gray-200">
                        {formatDate(startDate, true)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Check-out date:</span>
                    <span className="text-gray-200">
                        {formatDate(endDate, true)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="text-gray-200">{numberOfPeople}</span>
                </div>
                <div className="flex justify-between">
                    <span>Stay type:</span>
                    <span className="text-gray-200">
                        {priceType === "day" ? "Daily" : "Hourly"}
                    </span>
                </div>
            </div>

            {/* total */}
            <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-sky-400 text-lg">
                        Total price:
                    </span>
                    <span className="text-sky-400 font-bold text-xl">
                        {formatCurrency(totalPrice)}
                    </span>
                </div>
            </div>

            {/* facilities */}
            <div className=" pt-4 bg-sky-700/40 rounded-xl p-4">
                <h4 className="font-medium text-gray-200 mb-2">
                    Room facilities:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    {facilities.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
