import Table from "../../components/Table";
import RoomRow from "./components/RoomRow";
import useRooms from "./hooks/useRooms";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Main from "../../components/Main";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreateRoomContent from "./components/CreateRoomContent";

function Rooms() {
    const { rooms, isLoading, totalPages } = useRooms();

    return (
        <Main>
            <Heading>
                <>
                    <div className="text-white">Filter</div>
                    <Modal>
                        <Modal.Open opens="create-tour">
                            <Button className="px-6 py-3">+ New Room</Button>
                        </Modal.Open>
                        <Modal.Content name="create-tour">
                            <CreateRoomContent />
                        </Modal.Content>
                    </Modal>
                </>
            </Heading>
            <div className="flex-1 mt-4">
                <Menus>
                    <Table columns="2fr 1fr 1fr 1fr 1fr 1fr 1fr">
                        <Table.Header>
                            <div>Room Name</div>
                            <div>Room Type</div>
                            <div>Amenities</div>
                            <div>Interior</div>
                            <div>Price/Day</div>
                            <div>Price/Hour</div>
                            <div>Status</div>
                        </Table.Header>

                        <Table.Body
                            data={rooms}
                            render={(room) => (
                                <RoomRow key={room.id} room={room} />
                            )}
                        />
                        <Table.Footer>
                            <Pagination
                                className="flex justify-between mb-[20px] px-5 mt-2"
                                totalPages={totalPages}
                            />
                        </Table.Footer>
                    </Table>
                </Menus>
            </div>
        </Main>
    );
}

export default Rooms;
