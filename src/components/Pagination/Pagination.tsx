import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import useUrl from "../../hooks/useUrl";
import classNames from "classnames";

type PropsType = {
    className?: string;
    totalPages: number;
};

const RANGE = 2;

function Pagination({ className, totalPages }: PropsType) {
    const { currentValue, handler: onPageChange } = useUrl<number>({
        field: "page",
        defaultValue: 1,
    });

    const currentPage = Number(currentValue);

    function renderPagination() {
        let dotBefore = false;
        let dotAfter = false;

        function renderDotBefore(index: number) {
            if (!dotBefore) {
                dotBefore = true;
                return (
                    <button
                        key={index}
                        className="flex items-center justify-center px-3 h-8 leading-tight border border-border bg-card-bg text-muted"
                    >
                        ...
                    </button>
                );
            }
            return null;
        }

        function renderDotAfter(index: number) {
            if (!dotAfter) {
                dotAfter = true;
                return (
                    <button
                        key={index}
                        className="flex items-center justify-center px-3 h-8 leading-tight border border-border bg-card-bg text-muted"
                    >
                        ...
                    </button>
                );
            }
            return null;
        }

        return Array(totalPages)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1;

                if (
                    currentPage <= RANGE * 2 + 1 &&
                    pageNumber > currentPage + RANGE &&
                    pageNumber < totalPages - RANGE + 1
                ) {
                    return renderDotAfter(index);
                } else if (
                    currentPage > RANGE * 2 + 1 &&
                    currentPage < totalPages - RANGE * 2
                ) {
                    if (pageNumber < currentPage - RANGE && pageNumber > RANGE)
                        return renderDotBefore(index);

                    if (
                        pageNumber > currentPage + RANGE &&
                        pageNumber < totalPages - RANGE + 1
                    )
                        return renderDotAfter(index);
                } else if (
                    currentPage >= totalPages - RANGE * 2 &&
                    pageNumber < currentPage - RANGE &&
                    pageNumber > RANGE
                )
                    return renderDotBefore(index);

                return (
                    <button
                        key={index}
                        disabled={currentPage === pageNumber}
                        className={classNames(
                            "flex items-center justify-center px-4 h-10 leading-tight rounded-md transition-all duration-200",
                            {
                                "bg-accent text-black font-semibold":
                                    currentPage === pageNumber,
                                "bg-card-bg border-accent border-2 hover:text-black hover:bg-accent text-accent":
                                    currentPage !== pageNumber,
                            }
                        )}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            });
    }
    return (
        <nav className={className}>
            <div className="text-text">
                <p>{`Showing page ${currentPage} of ${totalPages}`}</p>
            </div>
            <div className="flex items-center gap-3 h-8 text-sm">
                {currentPage > 1 && (
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="flex items-center justify-center px-3 h-10 leading-tight rounded-md bg-card-bg border-accent border-2 hover:text-black hover:bg-accent text-accent transition-all duration-200"
                    >
                        <AiOutlineArrowLeft />
                    </button>
                )}
                {renderPagination()}
                {currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="flex items-center justify-center px-3 h-10 leading-tight rounded-md bg-card-bg border-accent border-2 hover:text-black hover:bg-accent text-accent transition-all duration-200"
                    >
                        <AiOutlineArrowRight />
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Pagination;
