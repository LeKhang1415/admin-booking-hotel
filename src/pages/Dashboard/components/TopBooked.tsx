import { useQuery } from "@tanstack/react-query";
import useUrl from "../../../hooks/useUrl";
import { bookingApi } from "../../../services/booking.api";
import TopRoomCard from "./TopRoomCard";
import Spinner from "../../../components/Spinner";

function TopBooked() {
    const { currentValue: limit, handler } = useUrl({
        field: "limit",
        defaultValue: 3,
    });

    const currentYear = new Date().getFullYear();
    const limitNumber = Number(limit);

    const { data, isLoading } = useQuery({
        queryKey: ["top-booked", limit],
        queryFn: () =>
            bookingApi.getTopRooms({ year: currentYear, limit: limitNumber }),
    });
    const topBookedData = data?.data.data;
    return (
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h4 className="uppercase text-lg font-medium text-gray-700">
                    Top room booked
                </h4>
                <div className="p-2 bg-white rounded-md gap-2 flex items-center">
                    <button
                        className={`p-1 ${
                            Number(limit) === 3 ? "bg-accent text-white" : ""
                        } rounded-md min-w-[80px] uppercase font-medium`}
                        onClick={() => handler(3)}
                    >
                        Top 3
                    </button>
                    <button
                        className={`p-1 ${
                            Number(limit) === 5 ? "bg-accent text-white" : ""
                        } rounded-md min-w-[80px] uppercase font-medium`}
                        onClick={() => handler(5)}
                    >
                        top 5
                    </button>
                    <button
                        className={`p-1 ${
                            Number(limit) === 7 ? "bg-accent text-white" : ""
                        } rounded-md min-w-[80px] uppercase font-medium`}
                        onClick={() => handler(7)}
                    >
                        top 7
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-2 overflow-auto max-h-[480px]">
                {isLoading && <Spinner center />}
                {!isLoading &&
                    topBookedData?.length &&
                    topBookedData.map((topRoom) => (
                        <TopRoomCard key={topRoom.roomId} topRoom={topRoom} />
                    ))}
            </div>
        </div>
    );
}

export default TopBooked;
