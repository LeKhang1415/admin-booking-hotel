import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import useQueryParams from "../../hooks/useQueryParams";
import useAvailableRooms from "../Rooms/hooks/useAvailableRooms";
import type { FindAvailableRoomsQuery, Room } from "../../types/room.types";
import { useDispatch } from "react-redux";
import { setBooking } from "../../store/slices/bookingSlice";
import { fromTimestamp } from "../../utils/utils";
import RoomCard from "../Rooms/components/RoomCard";
import Spinner from "../../components/Spinner";
import Main from "../../components/Main";

// Danh sách tham số bắt buộc
const requiredParams: (keyof FindAvailableRoomsQuery)[] = [
    "numberOfPeople",
    "priceType",
    "startTime",
    "endTime",
];

function AvailableRooms() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = useQueryParams<FindAvailableRoomsQuery>();

    // Check đủ params chưa
    const hasAllParams = useMemo(
        () =>
            requiredParams.every(
                (key) =>
                    queryParams[key] !== undefined && queryParams[key] !== ""
            ),
        [queryParams]
    );

    // Nếu thiếu thì redirect
    useEffect(() => {
        if (!hasAllParams) {
            navigate("/bookings", { replace: true });
        }
    }, [hasAllParams, navigate]);

    // Query rooms
    const { rooms, totalPages, isLoading } = hasAllParams
        ? useAvailableRooms()
        : { rooms: [], totalPages: 0, isLoading: false };

    if (!hasAllParams) return null; // tránh render khi redirect

    function handleChooseRoom(room: Room) {
        dispatch(
            setBooking({
                room,
                priceType: queryParams.priceType as "hour" | "day",
                numberOfPeople: Number(queryParams.numberOfPeople),
                startTime: new Date(Number(queryParams.startTime)),
                endTime: new Date(Number(queryParams.endTime)),
            })
        );
        navigate("/create-booking");
    }

    return (
        <Main>
            {/* Header */}
            <div className="max-w-6xl bg-bg p-6 rounded-xl shadow shadow-card w-full mx-auto mb-5">
                <h2 className="text-2xl text-black font-bold mb-1">
                    Choose Room
                </h2>

                <p className="text-muted text-md">
                    {queryParams.startTime && queryParams.endTime && (
                        <>
                            {fromTimestamp(queryParams.startTime, true)} -{" "}
                            {fromTimestamp(queryParams.endTime, true)}
                        </>
                    )}
                    <span className="mx-1">•</span>
                    {queryParams.numberOfPeople} guest
                </p>
            </div>

            <div className="max-w-6xl mx-auto w-full">
                {/* Loading */}
                {isLoading && (
                    <div className="h-full  flex justify-center items-center">
                        <Spinner size="lg" />
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && rooms.length === 0 && (
                    <p className="text-center text-text text-2xl font-semibold">
                        No suitable room found.
                    </p>
                )}

                {/* List rooms */}
                {!isLoading && rooms.length > 0 && (
                    <ul className="space-y-4 ">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                priceType={queryParams.priceType}
                                onChoose={handleChooseRoom}
                            />
                        ))}
                    </ul>
                )}

                {/* Pagination */}
                <Pagination
                    className="flex justify-between mb-5 px-5 mt-4"
                    totalPages={totalPages}
                />
            </div>
        </Main>
    );
}

export default AvailableRooms;
