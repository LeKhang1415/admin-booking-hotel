import { formatDate } from "../../../utils/utils";
import Table from "../../../components/Table";
import { FaStar } from "react-icons/fa";
import classNames from "classnames";
import type { Review } from "../../../types/review.types";
import { BsCheck, BsX } from "react-icons/bs";
import Modal from "../../../components/Modal";
import Menus from "../../../components/Menus";
import { FiTrash2 } from "react-icons/fi";
import DeleteReviewContent from "./DeleteReviewContent";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import ToggleContentReview from "./ToggleContentReview";

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

            <div>
                <span
                    className={classNames(
                        "capitalize inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
                        review.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                    )}
                >
                    {review.isActive ? (
                        <>
                            <BsCheck className="h-3 w-3 mr-1" />
                            Active
                        </>
                    ) : (
                        <>
                            <BsX className="h-3 w-3 mr-1" />
                            Inactive
                        </>
                    )}
                </span>
            </div>

            {/* Actions */}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={review.id.toString()} />
                        <Menus.List id={review.id.toString()}>
                            <Modal.Open opens={`toggle-review-${review.id}`}>
                                <Menus.Button
                                    icon={
                                        review.isActive ? (
                                            <MdToggleOff />
                                        ) : (
                                            <MdToggleOn />
                                        )
                                    }
                                >
                                    {review.isActive
                                        ? "Set Inactive"
                                        : "Set Active"}
                                </Menus.Button>
                            </Modal.Open>
                            <Modal.Open opens={`delete-review-${review.id}`}>
                                <Menus.Button icon={<FiTrash2 />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

                    <Modal.Content name={`delete-review-${review.id}`}>
                        <DeleteReviewContent reviewId={review.id} />
                    </Modal.Content>
                    <Modal.Content name={`toggle-review-${review.id}`}>
                        <ToggleContentReview
                            reviewId={review.id}
                            isActive={review.isActive}
                        />
                    </Modal.Content>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default ReviewRow;
