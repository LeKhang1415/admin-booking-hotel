import Heading from "../../components/Heading";
import Main from "../../components/Main";
import Menus from "../../components/Menus";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import FindAvailableRoomsModal from "./components/FindAvailableRoomsModal";
import BookingRow from "./components/BookingRow";
import useBookings from "./hooks/useBookings";
import Search from "../../components/Search";
import Select from "../../components/Select";
import useUrl from "../../hooks/useUrl";
import { BookingStatus } from "../../types/booking.types";
import { GoPlus } from "react-icons/go";

function Bookings() {
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
        { value: BookingStatus.UNPAID, label: "Unpaid" },
        { value: BookingStatus.PAID, label: "Paid" },
        { value: BookingStatus.CHECKED_IN, label: "Checked In" },
        { value: BookingStatus.COMPLETED, label: "Completed" },
        { value: BookingStatus.CANCELLED, label: "Cancelled" },
        { value: BookingStatus.REJECTED, label: "Rejected" },
    ];

    const { bookings, isLoading, totalPages } = useBookings();

    return (
        <Main>
            <Heading>
                <>
                    <div>
                        <h1 className="text-3xl font-bold text-text">
                            Manage Bookings
                        </h1>
                    </div>
                    <Modal>
                        <Modal.Open opens="available-rooms">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent-600 text-white rounded-xl hover:shadow-lg transition-all">
                                <GoPlus className="w-4 h-4" />
                                Find Available Rooms
                            </button>
                        </Modal.Open>
                        <Modal.Content name="available-rooms">
                            <FindAvailableRoomsModal />
                        </Modal.Content>
                    </Modal>
                </>
            </Heading>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search value={search ?? ""} onChange={setSearch} />
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
                        <Table columns="2fr 1.5fr 1.25fr 2fr 1fr 1fr 1.25fr 0.75fr">
                            <Table.Header>
                                <div>User</div>
                                <div>Room</div>
                                <div>Booking Date</div>
                                <div>Check-in / Check-out</div>
                                <div>Stay Type</div>
                                <div>Guests</div>
                                <div>Status</div>
                                <div>Actions</div>
                            </Table.Header>

                            <Table.Body
                                data={bookings}
                                render={(booking) => (
                                    <BookingRow
                                        key={booking.bookingId}
                                        booking={booking}
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

export default Bookings;
