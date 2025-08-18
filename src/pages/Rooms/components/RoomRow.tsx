// RoomRow.tsx
import type { Room } from "../../../types/room.types";
import { formatCurrency } from "../../../utils/utils";
import Menus from "../../../components/Menus";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/Table";

function RoomRow({ room }: { room: Room }) {
    return (
        <Table.Row>
            {/* Ảnh + tên phòng */}
            <div className="flex items-center gap-3 py-2">
                <div className="min-w-[120px] h-[80px] overflow-hidden rounded-md border border-gray-700 bg-gray-800">
                    <img
                        className="w-full h-full object-cover"
                        src={room.image || "/placeholder.jpg"}
                        alt={room.name}
                    />
                </div>

                <div>
                    <p className="text-sm font-semibold text-white">
                        {room.name}
                    </p>
                </div>
            </div>

            {/* Loại giường */}
            <div className="text-gray-200 font-semibold">
                {room.typeRoom.name}
            </div>

            {/* Tiện nghi */}
            <div className="text-gray-300 text-sm font-semibold whitespace-normal">
                {room.facilities}
            </div>

            {/* Tiện nghi */}
            <div className="text-gray-300 text-sm font-semibold whitespace-normal">
                {room.interior}
            </div>

            {/* Giá/ngày */}
            <div className="text-yellow-400 font-semibold">
                {formatCurrency(room.pricePerDay)} / đêm
            </div>

            {/* Giá/giờ */}
            <div className="text-green-400 font-semibold">
                {formatCurrency(room.pricePerHour)} / giờ
            </div>

            {/* Trạng thái */}
            <div className="flex items-center justify-between gap-2">
                <span
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md ${
                        room.roomStatus === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    {room.roomStatus === "active" ? "Available" : "Booked"}
                </span>
                {/* Hành động */}
                <div className="text-right">
                    <Menus.Menu>
                        <Menus.Toggle id={room.id.toString()} />
                        <Menus.List id={room.id.toString()}>
                            <Menus.Button
                                icon={<FiEdit />}
                                onClick={() => console.log("Edit", room.id)}
                            >
                                Sửa
                            </Menus.Button>
                            <Menus.Button
                                icon={<FiTrash2 />}
                                onClick={() => console.log("Delete", room.id)}
                            >
                                Xoá
                            </Menus.Button>
                        </Menus.List>
                    </Menus.Menu>
                </div>
            </div>
        </Table.Row>
    );
}

export default RoomRow;
