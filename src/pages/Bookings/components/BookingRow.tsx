import { formatDate, statusColor } from "../../../utils/utils";
import Menus from "../../../components/Menus";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import { BookingStatus, type Booking } from "../../../types/booking.types";
import { useNavigate } from "react-router-dom";
import { FaEye, FaMoneyBill } from "react-icons/fa";
import classNames from "classnames";

function BookingRow({ booking }: { booking: Booking }) {
    const { customer, room } = booking;
    const bookingStatus = statusColor[booking.bookingStatus];
    const navigate = useNavigate();

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
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full capitalize">
                    {booking.stayType}
                </span>
            </div>

            {/* Guests */}
            <div className="text-muted text-sm">
                {booking.numberOfGuest} guests
            </div>

            {/* Status */}
            <div>
                <span
                    className={classNames(
                        "block px-4 py-1 text-center rounded-xl capitalize font-semibold text-sm",
                        bookingStatus?.bg,
                        bookingStatus?.text
                    )}
                >
                    {booking.bookingStatus}
                </span>
            </div>

            {/* Action */}
            <div className="text-right">
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={booking.bookingId} />
                        <Menus.List id={booking.bookingId}>
                            {/* Nếu chưa thanh toán thì thêm action Payment */}
                            {booking.bookingStatus === BookingStatus.UNPAID && (
                                <Menus.Button
                                    icon={<FaMoneyBill />}
                                    onClick={() =>
                                        navigate(
                                            `/payment/${booking.bookingId}`
                                        )
                                    }
                                >
                                    Payment
                                </Menus.Button>
                            )}
                            {/* View */}
                            <Menus.Button
                                icon={<FaEye />}
                                onClick={() =>
                                    navigate(`/bookings/${booking.bookingId}`)
                                }
                            >
                                Detail
                            </Menus.Button>
                            {/* Edit */}
                            <Menus.Button
                                icon={<FiEdit />}
                                onClick={() =>
                                    navigate(
                                        `/bookings/update/${booking.bookingId}`
                                    )
                                }
                            >
                                Edit
                            </Menus.Button>

                            <Modal.Open opens="delete-booking">
                                <Menus.Button icon={<FiTrash2 />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

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
