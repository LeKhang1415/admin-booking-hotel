import Table from "../../components/Table";
import RoomRow from "./components/RoomRow";
import useRooms from "./hooks/useRooms";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Main from "../../components/Main";
import Heading from "../../components/Heading";
import { GoPlus } from "react-icons/go";
import Modal from "../../components/Modal";
import CreateRoomContent from "./components/CreateRoomContent";
import FilterRooms from "./components/FilterRooms";
import Spinner from "../../components/Spinner";
import { CiFilter } from "react-icons/ci";
import Search from "../../components/Search";
import useUrl from "../../hooks/useUrl";
import Select from "../../components/Select";
import { RoomStatus } from "../../types/room.types";

function Rooms() {
    const { currentValue: search, handler: setSearch } = useUrl<string>({
        field: "search",
        defaultValue: "",
    });
    const { currentValue: status, handler: setStatus } = useUrl<string>({
        field: "status",
        defaultValue: "",
    });
    const statusOptions = [
        { value: "", label: "All status" },
        { value: RoomStatus.ACTIVE, label: "Active" },
        { value: RoomStatus.INACTIVE, label: "Inactive" },
        { value: RoomStatus.MAINTENANCE, label: "Maintenance" },
    ];

    const { rooms, isLoading, totalPages } = useRooms();

    return (
        <Main>
            <Modal>
                <Heading>
                    <>
                        <div>
                            <h1 className="text-3xl font-bold text-text">
                                Manage Rooms
                            </h1>
                        </div>
                        <Modal.Open opens="create-room">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent-600 text-white rounded-xl hover:shadow-lg transition-all">
                                <GoPlus className="w-4 h-4" />
                                Add Room
                            </button>
                        </Modal.Open>
                    </>
                </Heading>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search
                                    value={search ?? ""}
                                    onChange={setSearch}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Select
                                name="status"
                                value={status}
                                onChange={setStatus}
                                options={statusOptions}
                                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <Modal.Open opens="filter-rooms">
                                <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    <CiFilter className="w-4 h-4" />
                                    Filter
                                </button>
                            </Modal.Open>
                        </div>
                    </div>
                </div>

                {isLoading && (
                    <div className="h-full center">
                        <Spinner size="lg" />
                    </div>
                )}
                {!isLoading && (
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

                        <Modal.Content name="filter-rooms">
                            <FilterRooms />
                        </Modal.Content>
                        <Modal.Content name="create-room">
                            <CreateRoomContent />
                        </Modal.Content>
                    </div>
                )}
            </Modal>
        </Main>
    );
}

export default Rooms;
