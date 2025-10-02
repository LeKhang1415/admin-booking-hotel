import Heading from "../../components/Heading";
import Main from "../../components/Main";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import useReviews from "./hooks/useReviews";

function Reviews() {
    const { reviews, isLoading, totalPages } = useReviews();

    return (
        <Main>
            <Heading>
                <div>
                    <h1 className="text-3xl font-bold text-text">
                        Manage Reviews
                    </h1>
                </div>
            </Heading>
            {isLoading && (
                <div className="h-full center">
                    <Spinner size="lg" />
                </div>
            )}
            {!isLoading && (
                <div className="flex-1 mt-4">
                    <Table columns="1fr 1.5fr 1.5fr 0.75fr 1fr 0.75fr">
                        <Table.Header>
                            <div>Name</div>
                            <div>Introduction</div>
                            <div>Highlight</div>
                            <div>SizeRoom</div>
                            <div>Beds</div>
                            <div>Max People</div>
                        </Table.Header>

                        <Table.Body data={reviews} render={(review) => <></>} />
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
