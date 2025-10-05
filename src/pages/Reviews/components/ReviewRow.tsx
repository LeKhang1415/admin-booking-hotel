import { formatDate } from "../../../utils/utils";
import Table from "../../../components/Table";
import { FaStar } from "react-icons/fa";
import classNames from "classnames";
import type { Review } from "../../../types/review.types";

function ReviewRow({ review }: { review: Review }) {
    return (
        <Table.Row>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full font-semibold bg-accent text-black">
                    {review.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-text">
                        {review.user.name}
                    </span>
                    <span className="text-sm text-muted">
                        {review.user.email}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <img
                    src={review.room.image}
                    alt={review.room.name}
                    className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-text">
                        {review.room.name}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        className={classNames(
                            "h-4 w-4",
                            i < review.rating
                                ? "fill-yellow-500"
                                : "fill-gray-200"
                        )}
                    />
                ))}
            </div>

            <div className="text-sm text-muted max-w-xs">
                {review.comment || "No comment"}
            </div>

            <div className="text-sm text-muted">
                {formatDate(review.createdAt, true)}
            </div>

            {/* Actions */}
            <div>Action</div>
        </Table.Row>
    );
}

export default ReviewRow;
