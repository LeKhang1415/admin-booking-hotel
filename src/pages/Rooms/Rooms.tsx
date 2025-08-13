import Table from "../../components/Table";
import type { Room } from "../../types/room.types";
import RoomRow from "./components/RoomRow";
import useRooms from "./hooks/useRooms";

function Rooms() {
    const { rooms, isLoading, totalPages } = useRooms();
    console.log(rooms);
    return (
        <Table>
            <Table.Header
                data={[
                    "Phòng",
                    "Tên Phòng",
                    "Loại phòng",
                    "Giá/ngày",
                    "Giá/giờ",
                    "Tiện nghi",
                    "Trạng thái",
                ]}
            />
            <Table.Body
                bodyData={rooms}
                render={(room: Room) => <RoomRow room={room} key={room.id} />}
            />
        </Table>
    );
}

export default Rooms;
