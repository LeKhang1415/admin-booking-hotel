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
        <article className="bg-primary rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 md:gap-8">
            {/* left: image */}
            <div className="w-full md:w-56 h-44 md:h-44 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* middle: info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-white">
                        {room.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                        {room.typeRoom?.introduction || room.interior}
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                            {/* size icon */}
                            <SlSizeFullscreen className="w-4 h-4" />
                            <span>{room.typeRoom?.sizeRoom ?? "-"}m²</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* user icon */}
                            <CiUser className="w-4 h-4" />
                            <span>{room.typeRoom?.maxPeople ?? "-"} khách</span>
                        </div>

                        <div className="flex items-center gap-2">
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
                                className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-200 border border-gray-600"
                            >
                                {f}
                            </span>
                        ))}
                        {facilities.length > 3 && (
                            <span className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-200 border border-gray-600">
                                +{facilities.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* price + button */}
                <div className="mt-6 md:mt-0 flex items-center justify-between">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-sky-600">
                            {formatCurrency(price)}{" "}
                            <span className="text-sm text-slate-400">
                                /{priceType === "day" ? "Ngày" : "Giờ"}
                            </span>
                        </div>
                    </div>

                    <div className="ml-4 w-56">
                        <Button
                            onClick={() => onChoose?.(room)}
                            className="w-full px-4 py-3 rounded-xl font-medium "
                        >
                            Select this room
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
