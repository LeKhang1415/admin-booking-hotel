import Table from "../../components/Table";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Main from "../../components/Main";
import Heading from "../../components/Heading";
import Modal from "../../components/Modal";
import useTypeRooms from "./hooks/useTypeRooms";
import TypeRoomRow from "./components/TypeRoomRow";
import CreateTypeRoomContent from "./components/CreateTypeRoomContent";
import Spinner from "../../components/Spinner";
import { GoPlus } from "react-icons/go";

function TypeRoom() {
    const { typeRooms, isLoading, totalPages } = useTypeRooms();
    return (
        <Main>
            <Heading>
                <>
                    <div>
                        <h1 className="text-3xl font-bold text-text">
                            Manage Type Room
                        </h1>
                    </div>
                    <Modal>
                        <Modal.Open opens="create-type-room">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent-600 text-white rounded-xl hover:shadow-lg transition-all">
                                <GoPlus className="w-4 h-4" />
                                Add Type Room
                            </button>
                        </Modal.Open>
                        <Modal.Content name="create-type-room">
                            <CreateTypeRoomContent />
                        </Modal.Content>
                    </Modal>
                </>
            </Heading>
            {isLoading && (
                <div className="h-full center">
                    <Spinner size="lg" />
                </div>
            )}
            {!isLoading && (
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
            )}
        </Main>
    );
}

export default TypeRoom;
