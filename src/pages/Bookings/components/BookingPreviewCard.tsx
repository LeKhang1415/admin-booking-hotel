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
        <article className="bg-bg rounded-2xl shadow p-6 flex flex-col gap-6 text-text min-h-full">
            <h2 className="text-lg font-semibold text-text">Booking Summary</h2>

            {/* top: image + name */}
            <div className="flex gap-4 items-start">
                <div className="w-32 h-24 rounded-lg overflow-hidden bg-bg flex-shrink-0 border border-border shadow-sm">
                    <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-text">
                        {room.name}
                    </h3>
                    <p className="text-sm text-muted mt-1">
                        {room.typeRoom?.name ?? room.interior}
                    </p>
                </div>
            </div>

            {/* booking info */}
            <div className="border-t border-border pt-4 space-y-2 text-sm text-muted-2">
                <div className="flex justify-between">
                    <span>Check-in date:</span>
                    <span className="text-text">
                        {formatDate(startDate, true)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Check-out date:</span>
                    <span className="text-text">
                        {formatDate(endDate, true)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="text-text">{numberOfPeople}</span>
                </div>
                <div className="flex justify-between">
                    <span>Stay type:</span>
                    <span className="text-text">
                        {priceType === "day" ? "Daily" : "Hourly"}
                    </span>
                </div>
            </div>

            {/* total */}
            <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-warm text-lg">
                        Total price:
                    </span>
                    <span className="text-accent font-bold text-xl">
                        {formatCurrency(totalPrice)}
                    </span>
                </div>
            </div>

            {/* facilities */}
            <div className="pt-4 bg-elevated rounded-xl p-4">
                <h4 className="font-medium text-text mb-2">Room facilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-2">
                    {facilities.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
