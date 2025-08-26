// RoomCard.tsx
import Button from "../../../components/Button";
import type { Room } from "../../../types/room.types";
import { formatCurrency, parseString } from "../../../utils/utils";
import { CiUser } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";

type Props = {
    room: Room;
    priceType?: "day" | "hour";
    onChoose?: (room: Room) => void;
};

export default function RoomCard({ room, priceType = "day", onChoose }: Props) {
    const facilities = parseString(room.facilities);
    const price = priceType === "hour" ? room.pricePerHour : room.pricePerDay;

    return (
        <article className="bg-card-bg rounded-2xl shadow-card p-6 flex flex-col md:flex-row gap-6 md:gap-8">
            {/* left: image */}
            <div className="w-full md:w-56 h-44 md:h-44 rounded-lg overflow-hidden bg-card-bg flex-shrink-0 border border-border">
                <img
                    src={room.image || "/placeholder.jpg"}
                    alt={room.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* middle: info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-text">
                        {room.name}
                    </h3>
                    <p className="text-sm text-muted mt-2">
                        {room.typeRoom?.introduction || room.interior}
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-2">
                            {/* size icon */}
                            <SlSizeFullscreen className="w-4 h-4" />
                            <span>{room.typeRoom?.sizeRoom ?? "-"}m²</span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-2">
                            {/* user icon */}
                            <CiUser className="w-4 h-4" />
                            <span>{room.typeRoom?.maxPeople ?? "-"} khách</span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-2">
                            {/* bed icon */}
                            <FaBed className="w-4 h-4" />
                            <span>{room.typeRoom?.beds ?? "-"}</span>
                        </div>
                    </div>

                    {/* facilities */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {facilities.slice(0, 3).map((f, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 rounded-full bg-elevated text-text border border-border"
                            >
                                {f}
                            </span>
                        ))}
                        {facilities.length > 3 && (
                            <span className="text-xs px-3 py-1 rounded-full bg-elevated text-text border border-border">
                                +{facilities.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* price + button */}
                <div className="mt-6 md:mt-0 flex items-center justify-between">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-accent">
                            {formatCurrency(price)}{" "}
                            <span className="text-sm text-muted">
                                /{priceType === "day" ? "Ngày" : "Giờ"}
                            </span>
                        </div>
                    </div>

                    <div className="ml-4 w-56">
                        <Button
                            onClick={() => onChoose?.(room)}
                            className="w-full px-4 py-3 rounded-xl font-medium bg-accent text-black"
                        >
                            Select this room
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
