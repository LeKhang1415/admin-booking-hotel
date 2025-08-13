import type { Room } from "../../../types/room.types";
import { formatCurrency } from "../../../utils/utils";

function RoomRow({ room }: { room: Room }) {
    return (
        <tr className="text-white text-sm">
            {/* Ảnh phòng */}
            <td className="px-4 py-3 w-fit">
                <div className="w-28 h-20 overflow-hidden rounded-lg border border-gray-700">
                    <img
                        className="w-full h-full object-cover"
                        src={room.image}
                        alt={room.name}
                    />
                </div>
            </td>

            {/* Tên phòng */}
            <td className="px-4 py-3 text-white font-semibold text-[15px]">
                {room.name}
            </td>

            <td className="px-4 py-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border border-purple-500">
                    {room.typeRoom.name}
                </span>
            </td>

            {/* Giá/ngày */}
            <td className="px-4 py-3 text-yellow-400 font-bold text-base ">
                {formatCurrency(room.pricePerDay)}
            </td>

            {/* Giá/giờ */}
            <td className="px-4 py-3 text-green-400 font-bold text-base">
                {formatCurrency(room.pricePerHour)}
            </td>

            {/* Tiện nghi */}
            <td className="px-4 py-3 text-gray-300 text-sm ">
                {room.facilities}
            </td>

            {/* Trạng thái */}
            <td className="px-4 py-3">
                <span
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                        room.roomStatus === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    {room.roomStatus}
                </span>
            </td>
        </tr>
    );
}

export default RoomRow;
