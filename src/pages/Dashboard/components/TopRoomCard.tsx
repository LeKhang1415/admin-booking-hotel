import type { TopRoom } from "../../../types/booking.types";
import { formatCurrency } from "../../../utils/utils";

function TopRoomCard({ topRoom }: { topRoom: TopRoom }) {
    console.log(topRoom);
    return (
        <div className="p-2 bg-white flex flex-col items-center border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100">
            <img
                className="mr-3 object-cover w-[200px] rounded-lg h-32"
                src={topRoom.roomImage}
                alt={topRoom.roomName}
            />
            <div className="flex flex-col justify-between leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-wide text-gray-500">
                    {topRoom.roomName}
                </h5>
                <span className="mb-3 font-bold text-green-600 capitalize">
                    {topRoom.totalBookings} booked
                </span>
                <span className="mb-3 font-bold text-gray-700 capitalize">
                    {formatCurrency(topRoom.totalRevenue)}
                </span>
            </div>
        </div>
    );
}

export default TopRoomCard;
