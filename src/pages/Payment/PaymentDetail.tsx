import { useState } from "react";
import RoomCard from "../Rooms/components/RoomCard";
import { useParams } from "react-router-dom";
import useBooking from "../Bookings/hooks/useBooking";

export default function PaymentPage() {
    const { bookingId } = useParams();
    const { booking } = useBooking(bookingId);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "vnpay" | null>(
        null
    );

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "—";
        const date = new Date(dateStr);
        return date.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    if (!booking) return;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow">
                <div>
                    <h1 className="text-2xl font-bold">Payment</h1>
                    <p className="text-gray-600">
                        Booking ID: {booking.bookingId}
                    </p>
                </div>
                <span className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-semibold uppercase">
                    {booking.bookingStatus}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Room Info */}

                {/* Payment Summary */}
                <div className="bg-white rounded-2xl shadow p-4">
                    <h2 className="font-bold mb-3">Payment summary</h2>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Room</span>
                            <span>
                                {booking.room.pricePerDay.toLocaleString(
                                    "vi-VN"
                                )}{" "}
                                ₫ / ngày
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Number of Guest</span>
                            <span>{booking.numberOfGuest}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>
                                {booking.totalAmount.toLocaleString("vi-VN")} ₫
                            </span>
                        </div>
                    </div>

                    {/* Chọn phương thức */}
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-2">
                            Chọn phương thức:
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPaymentMethod("cash")}
                                className={`px-4 py-2 border rounded-lg ${
                                    paymentMethod === "cash"
                                        ? "bg-gray-800 text-white"
                                        : "bg-white"
                                }`}
                            >
                                Tiền mặt
                            </button>
                            <button
                                onClick={() => setPaymentMethod("vnpay")}
                                className={`px-4 py-2 border rounded-lg ${
                                    paymentMethod === "vnpay"
                                        ? "bg-gray-800 text-white"
                                        : "bg-white"
                                }`}
                            >
                                VNPAY
                            </button>
                        </div>
                    </div>

                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
                        Thanh Toán
                    </button>
                </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-2xl shadow p-4 mt-6">
                <h2 className="font-bold mb-3">Customer information</h2>
                <p>Tên: {booking.customer.fullName}</p>
                <p>SĐT: {booking.customer.phone}</p>
                <p>Email: {booking.customer.email || "—"}</p>
                <p>CCCD: {booking.customer.identityCard || "—"}</p>
                <p>
                    Thời gian:{" "}
                    {new Date(booking.startTime).toLocaleDateString("vi-VN")} -{" "}
                    {new Date(booking.endTime).toLocaleDateString("vi-VN")}
                </p>
                <p>Số khách: {booking.numberOfGuest}</p>
            </div>

            {/* Booking Info */}
            <div className="bg-white rounded-2xl shadow p-4 mt-6">
                <h2 className="font-bold mb-3">Booking information</h2>
                <p>Ngày đặt: {formatDate(booking.bookingDate)}</p>
                <p>Loại lưu trú: {booking.stayType}</p>
                <p>Loại đặt phòng: {booking.bookingType}</p>
            </div>
        </div>
    );
}
