import Pagination from "../../components/Pagination";
import useAvailableRooms from "../Rooms/hooks/useAvailableRooms";

function AvailableRooms() {
    const { rooms, totalPages, isLoading } = useAvailableRooms();

    if (isLoading) return <p>Đang tải dữ liệu...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Danh sách phòng trống</h2>
            {rooms.length === 0 ? (
                <p>Không có phòng nào phù hợp.</p>
            ) : (
                <ul className="space-y-2">
                    {rooms.map((room) => (
                        <li
                            key={room.id}
                            className="border p-3 rounded shadow-sm hover:bg-gray-50"
                        >
                            <p>
                                <strong>{room.name}</strong>
                            </p>
                            <p>Loại: {room.typeRoom.name}</p>
                            <p>Giá: {room.pricePerDay} / ngày</p>
                        </li>
                    ))}
                </ul>
            )}
            <Pagination
                className="flex justify-between mb-[20px] px-5 mt-2"
                totalPages={totalPages}
            />
        </div>
    );
}

export default AvailableRooms;
