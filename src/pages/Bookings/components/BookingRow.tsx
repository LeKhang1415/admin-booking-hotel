import { formatDate, capitalizeFirst } from "../../../utils/utils";
import Menus from "../../../components/Menus";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import { StayType, type Booking } from "../../../types/booking.types";
import { MdCalendarToday } from "react-icons/md";
import { TbClockHour10 } from "react-icons/tb";

const statusColor: Record<string, string> = {
    unpaid: "bg-danger text-white",
    paid: "bg-success text-white",
    checked_in: "bg-accent text-black",
    checked_out: "bg-warm text-white",
};

function BookingRow({ booking }: { booking: Booking }) {
    const { customer, room } = booking;

    return (
        <Table.Row>
            {/* User */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full font-semibold bg-accent text-black">
                    {customer.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-text">
                        {customer.fullName}
                    </span>
                    <span className="text-sm text-muted">{customer.phone}</span>
                </div>
            </div>

            {/* Room */}
            <div className="flex flex-col">
                <p className="font-semibold text-text">{room.name}</p>
                <p className="text-sm text-muted">{room.typeRoom.name}</p>
            </div>

            {/* Booking date */}
            <div className="text-muted text-sm">
                {formatDate(booking.bookingDate, true)}
            </div>

            {/* Check-in/out */}
            <div className="flex flex-col">
                <p className="font-semibold text-text">
                    {formatDate(booking.startTime, true)}
                </p>
                <p className="text-sm text-muted">
                    {formatDate(booking.endTime, true)}
                </p>
            </div>

            {/* Stay type */}
            <div className="flex items-center gap-2">
                {booking.stayType === StayType.DAILY ? (
                    <MdCalendarToday className="w-4 h-4 text-muted-2" />
                ) : (
                    <TbClockHour10 className="w-4 h-4 text-muted-2" />
                )}
                <div className="uppercase font-semibold text-muted">
                    {booking.stayType}
                </div>
            </div>

            {/* Status */}
            <div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-md ${
                        statusColor[booking.bookingStatus] ||
                        "bg-elevated text-text"
                    }`}
                >
                    {capitalizeFirst(booking.bookingStatus)}
                </span>
            </div>

            {/* Guests */}
            <div className="text-muted text-sm">
                {booking.numberOfGuest} khách
            </div>

            {/* Action */}
            <div className="text-right">
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={booking.bookingId} />
                        <Menus.List id={booking.bookingId}>
                            <Modal.Open opens="update-booking">
                                <Menus.Button icon={<FiEdit />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens="delete-booking">
                                <Menus.Button icon={<FiTrash2 />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

                    {/* Modal update */}
                    <Modal.Content name="update-booking">
                        <div>Update booking {booking.bookingId}</div>
                    </Modal.Content>

                    {/* Modal delete */}
                    <Modal.Content name="delete-booking">
                        <div>Delete booking {booking.bookingId}</div>
                    </Modal.Content>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default BookingRow;
