import Main from "../../components/Main";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import BookingRow from "./components/BookingRow";
import useBookings from "./hooks/useBookings";

function Bookings() {
    const { bookings, isLoading, totalPages } = useBookings();

    return (
        <Main>
            {isLoading && (
                <div className="h-full center">
                    <Spinner size="lg" />
                </div>
            )}
            {!isLoading && (
                <div className="flex-1 mt-4">
                    <Menus>
                        <Table columns="2fr 1fr 2fr 2fr 1fr 1fr 1fr 1fr">
                            <Table.Header>
                                <div>User</div>
                                <div>Room</div>
                                <div>Booking Date</div>
                                <div>Check-in / Check-out</div>
                                <div>Stay Type</div>
                                <div>Status</div>
                                <div>Guests</div>
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
