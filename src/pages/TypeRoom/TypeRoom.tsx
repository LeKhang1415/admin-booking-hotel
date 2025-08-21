import Table from "../../components/Table";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Main from "../../components/Main";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useTypeRooms from "./hooks/useTypeRooms";
import TypeRoomRow from "./components/TypeRoomRow";
import CreateTypeRoomContent from "./components/CreateTypeRoomContent";

function TypeRoom() {
    const { typeRooms, isLoading, totalPages } = useTypeRooms();
    return (
        <Main>
            <Heading>
                <>
                    <div className="text-white">Filter</div>
                    <Modal>
                        <Modal.Open opens="create-type-room">
                            <Button className="px-6 py-3">
                                + New Type Room
                            </Button>
                        </Modal.Open>
                        <Modal.Content name="create-type-room">
                            <CreateTypeRoomContent />
                        </Modal.Content>
                    </Modal>
                </>
            </Heading>
            <div className="flex-1 mt-4">
                <Menus>
                    <Table columns="1fr 1.5fr 1.5fr 0.75fr 1fr 0.75fr">
                        <Table.Header>
                            <div>Name</div>
                            <div>Introduction</div>
                            <div>Highlight</div>
                            <div>SizeRoom</div>
                            <div>Beds</div>
                            <div>Max People</div>
                        </Table.Header>

                        <Table.Body
                            data={typeRooms}
                            render={(typeRoom) => (
                                <TypeRoomRow
                                    key={typeRoom.id}
                                    typeRoom={typeRoom}
                                />
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

export default TypeRoom;
