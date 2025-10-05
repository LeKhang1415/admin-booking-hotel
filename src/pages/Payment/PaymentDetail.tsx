import { useParams } from "react-router-dom";
import useBooking from "../Bookings/hooks/useBooking";

import { formatCurrency, formatDate } from "../../utils/utils";
import { CiCreditCard1, CiUser } from "react-icons/ci";
import { LuBanknote } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import Main from "../../components/Main";
import useVnpayPayment from "../Checkin-Checkout/hooks/useVnpayPayment";
import Modal from "../../components/Modal";
import CashPaymentContent from "../Checkin-Checkout/components/CashPaymentContent";

export default function PaymentDetail() {
    const { bookingId } = useParams();
    const { booking } = useBooking(bookingId);
    const vnpayMutation = useVnpayPayment();

    if (!booking) return;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "SUCCESS":
            case "paid":
                return "bg-success text-on-success";
            case "PENDING":
            case "unpaid":
                return "bg-info text-text-on-accent";
            case "FAILED":
                return "bg-danger text-on-danger";
            default:
                return "bg-gray-300 text-muted";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "SUCCESS":
            case "paid":
                return "Paid";
            case "PENDING":
            case "unpaid":
                return "Pending";
            case "FAILED":
                return "Failed";
            default:
                return status;
        }
    };

    const isPaid = booking.bookingStatus === "paid";

    return (
        <Main>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 bg-card-bg p-6 rounded-xl shadow shadow-card">
                    <div>
                        <h1 className="text-2xl font-bold text-text mb-2">
                            Payment Management
                        </h1>
                        <p className="text-muted">
                            Booking ID: {booking.bookingId}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className={`px-4 py-2 rounded-md font-semibold uppercase text-sm ${getStatusColor(
                                booking.bookingStatus
                            )}`}
                        >
                            {getStatusText(booking.bookingStatus)}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column - Room & Customer */}
                    <div className="lg:col-span-2 bg-card-bg rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold text-text mb-6">
                            Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Room Card */}
                            <div className="bg-card-bg p-4 rounded-xl shadow">
                                <h3 className="text-lg font-semibold text-text mb-3">
                                    Room Information
                                </h3>
                                <img
                                    src={booking.room.image}
                                    alt={booking.room.name}
                                    className="w-full h-48 object-cover rounded-md mb-3"
                                />
                                <div className="space-y-2">
                                    <h4 className="font-bold text-lg">
                                        {booking.room.name}
                                    </h4>
                                    <p className="text-accent font-semibold">
                                        {booking.room.typeRoom.name}
                                    </p>
                                    <div className="flex items-center gap-2 text-muted">
                                        <CiUser className="w-4 h-4" />
                                        <span>
                                            {booking.room.typeRoom.maxPeople}{" "}
                                            people •{" "}
                                            {booking.room.typeRoom.beds}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Card */}
                            <div className="bg-card-bg p-4 rounded-xl shadow">
                                <h3 className="text-lg font-semibold text-text mb-3">
                                    Customer Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-sky rounded-md">
                                        <p className="text-sm text-muted">
                                            Full name
                                        </p>
                                        <p className="font-semibold">
                                            {booking.customer.fullName}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-sky rounded-md">
                                        <p className="text-sm text-muted">
                                            Phone number
                                        </p>
                                        <p className="font-semibold">
                                            {booking.customer.phone}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-sky rounded-md">
                                        <p className="text-sm text-muted">
                                            Guests
                                        </p>
                                        <p className="font-semibold">
                                            {booking.numberOfGuest} people
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Payment */}
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="bg-card-bg rounded-xl shadow p-6">
                            <h2 className="text-xl font-bold text-text mb-6">
                                Payment Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted">
                                        Stay type:
                                    </span>
                                    <span className="font-semibold capitalize">
                                        {booking.stayType === "hourly"
                                            ? "Hourly"
                                            : "Daily"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted">
                                        Room price:
                                    </span>
                                    <span>
                                        {formatCurrency(
                                            booking.stayType === "hourly"
                                                ? booking.room.pricePerHour
                                                : booking.room.pricePerDay
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">
                                        Check-in:
                                    </span>
                                    <span className="font-semibold">
                                        {formatDate(booking.startTime, true)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">
                                        Check-out:
                                    </span>
                                    <span className="font-semibold">
                                        {formatDate(booking.endTime, true)}
                                    </span>
                                </div>

                                <div className="border-t mt-2 pt-2 flex justify-between items-center text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-accent">
                                        {formatCurrency(booking.totalAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Actions */}
                        {!isPaid && (
                            <div className="bg-card-bg rounded-xl shadow p-6">
                                <h2 className="text-xl font-bold text-text mb-6">
                                    Process Payment
                                </h2>

                                <div className="space-y-4">
                                    <Modal>
                                        {/* Cash Payment button */}
                                        <Modal.Open opens="cash-payment">
                                            <button className="w-full p-4 rounded-md border-2 border-success hover:bg-elevated transition-all text-left disabled:opacity-50">
                                                <div className="flex items-center gap-3">
                                                    <LuBanknote className="w-6 h-6 text-success" />
                                                    <div>
                                                        <h3 className="font-semibold text-text">
                                                            Cash Payment
                                                        </h3>
                                                        <p className="text-sm text-muted">
                                                            Confirm cash
                                                            received
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        </Modal.Open>

                                        {/* VNPAY button */}
                                        <button
                                            onClick={() => {
                                                vnpayMutation.mutate(
                                                    bookingId!
                                                );
                                            }}
                                            className="w-full p-4 rounded-md border-2 border-info hover:bg-elevated transition-all text-left disabled:opacity-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <CiCreditCard1 className="w-6 h-6 text-info" />
                                                <div>
                                                    <h3 className="font-semibold text-text">
                                                        VNPay
                                                    </h3>
                                                    <p className="text-sm text-muted">
                                                        Generate online payment
                                                        link
                                                    </p>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Modal content for cash payment */}
                                        <Modal.Content name="cash-payment">
                                            <CashPaymentContent
                                                booking={booking}
                                            />
                                        </Modal.Content>
                                    </Modal>
                                </div>
                            </div>
                        )}

                        {isPaid && (
                            <div className="bg-card-bg rounded-xl shadow p-6">
                                <div className="text-center">
                                    <FaRegCheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-text mb-2">
                                        Paid
                                    </h3>
                                    <p className="text-muted">
                                        This booking has been successfully paid
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Main>
    );
}
