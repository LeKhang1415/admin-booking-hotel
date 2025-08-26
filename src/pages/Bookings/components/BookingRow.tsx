import { formatDate, capitalizeFirst } from "../../../utils/utils";
import Menus from "../../../components/Menus";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import { StayType, type Booking } from "../../../types/booking.types";
import { MdCalendarToday } from "react-icons/md";
import { TbClockHour10 } from "react-icons/tb";

const statusColor: Record<string, string> = {
    unpaid: "bg-red-500 text-white",
    paid: "bg-green-500 text-white",
    checked_in: "bg-blue-500 text-white",
    checked_out: "bg-purple-500 text-white",
};

function BookingRow({ booking }: { booking: Booking }) {
    const { customer, room } = booking;

    return (
        <Table.Row>
            {/* User */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-[#135846] font-semibold">
                    {customer.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-white">
                        {customer.fullName}
                    </span>
                    <span className="text-sm text-gray-400">
                        {customer.phone}
                    </span>
                </div>
            </div>

            {/* Room */}
            <div className="flex flex-col">
                <p className="font-semibold text-white">{room.name}</p>
                <p className="text-sm text-gray-400">{room.typeRoom.name}</p>
            </div>

            {/* Booking date */}
            <div className="text-gray-300 text-sm">
                {formatDate(booking.bookingDate, true)}
            </div>

            {/* Check-in/out */}
            <div className=" flex flex-col">
                <p className="font-semibold text-white">
                    {formatDate(booking.startTime, true)}
                </p>
                <p className="text-sm text-gray-400">
                    {formatDate(booking.endTime, true)}
                </p>
            </div>

            {/* Stay type */}
            <div className="flex items-center gap-2">
                {booking.stayType === StayType.DAILY ? (
                    <MdCalendarToday className="w-4 h-4 text-gray-300" />
                ) : (
                    <TbClockHour10 className="w-4 h-4 text-gray-300" />
                )}
                <div className="uppercase font-semibold text-gray-400">
                    {booking.stayType}
                </div>
            </div>

            {/* Status */}
            <div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-md ${
                        statusColor[booking.bookingStatus] ||
                        "bg-gray-500 text-white"
                    }`}
                >
                    {capitalizeFirst(booking.bookingStatus)}
                </span>
            </div>

            {/* Guests */}
            <div className="text-gray-300 text-sm">
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
