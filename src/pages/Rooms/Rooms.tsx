import Modal from "../../components/Modal";
import Table from "../../components/Table";
import type { Room } from "../../types/room.types";
import RoomRow from "./components/RoomRow";
import useRooms from "./hooks/useRooms";
import Menus from "../../components/Menus";

function Rooms() {
    const { rooms, isLoading, totalPages } = useRooms();
    console.log(rooms);
    return (
        <div className="overflow-x-auto flex-1">
            <Menus>
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
                            "Hành động"
                        ]}
                    />
                    <Table.Body
                        bodyData={rooms}
                        render={(room: Room) => (
                            <RoomRow room={room} key={room.id} />
                        )}
                    />
                </Table>
            </Menus>

            <Modal>
                <Modal.Open opens="example">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Open Modal
                    </button>
                </Modal.Open>

                <Modal.Content name="example">
                    <div>
                        <Modal.Header>Modal title</Modal.Header>
                        <Modal.Body>
                            <p>
                                Cras mattis consectetur purus sit amet
                                fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="px-4 py-2 bg-red-700 rounded text-white">
                                Close
                            </button>
                            <button className="px-4 py-2 bg-green-700 rounded text-white">
                                Save changes
                            </button>
                        </Modal.Footer>
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default Rooms;
