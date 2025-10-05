import Heading from "../../components/Heading";
import Main from "../../components/Main";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import ReviewOperator from "./components/ReviewOperator";
import ReviewRow from "./components/ReviewRow";
import useReviews from "./hooks/useReviews";

function Reviews() {
    const { reviews, isLoading, totalPages } = useReviews();

    return (
        <Main>
            <Heading>
                <>
                    <h1 className="text-3xl font-bold text-text">
                        Manage Reviews
                    </h1>

                    <ReviewOperator />
                </>
            </Heading>
            {isLoading && (
                <div className="h-full center">
                    <Spinner size="lg" />
                </div>
            )}
            {!isLoading && (
                <div className="flex-1 mt-4">
                    <Table columns="1.5fr 1fr 0.75fr 1.5fr 1fr 0.75fr">
                        <Table.Header>
                            <div>User</div>
                            <div>Room</div>
                            <div>Rating</div>
                            <div>Comment</div>
                            <div>Create At</div>
                            <div>Action</div>
                        </Table.Header>

                        <Table.Body
                            data={reviews}
                            render={(review) => (
                                <ReviewRow
                                    key={review.id}
                                    review={review}
                                ></ReviewRow>
                            )}
                        />
                        <Table.Footer>
                            <Pagination
                                className="flex justify-between mb-[20px] px-5 mt-2"
                                totalPages={totalPages}
                            />
                        </Table.Footer>
                    </Table>
                </div>
            )}
        </Main>
    );
}

export default Reviews;
