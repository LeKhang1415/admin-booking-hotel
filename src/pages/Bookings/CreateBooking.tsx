import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";

function CreateBooking() {
    const booking = useSelector((state: RootState) => state.booking);
    const navigate = useNavigate();

    // Nếu chưa có phòng hoặc startTime/endTime
    useEffect(() => {
        if (!booking.room || !booking.startTime || !booking.endTime) {
            navigate("/available-rooms", { replace: true });
        }
    }, [booking, navigate]);

    if (!booking.room) return null; // chờ redirect

    return (
        <div className="text-white">
            <h2>Trang thanh toán</h2>
            <p>Phòng: {booking.room.name}</p>
            <p>Giá theo: {booking.priceType}</p>
            <p>Số người: {booking.numberOfPeople}</p>
            <p>
                Thời gian: {booking.startTime?.toLocaleString()} -{" "}
                {booking.endTime?.toLocaleString()}
            </p>
        </div>
    );
}

export default CreateBooking;
