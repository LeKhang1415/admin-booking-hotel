import Button from "../../components/Button";
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

function Bookings() {
    const { bookings, isLoading, totalPages } = useBookings();

    return (
        <Main>
            <Heading>
                <>
                    <Modal>
                        <Modal.Open opens="filter-rooms">
                            <Button variant="outline" className="px-4 py-2">
                                Filter Bookings
                            </Button>
                        </Modal.Open>

                        <Modal.Open opens="available-rooms">
                            <Button className="px-6 py-3">
                                Find Available Rooms
                            </Button>
                        </Modal.Open>
                        <Modal.Content name="available-rooms">
                            <FindAvailableRoomsModal />
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
                        <Table columns="2fr 1.5fr 1.25fr 2fr 1fr 1fr 1fr 0.75fr">
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
