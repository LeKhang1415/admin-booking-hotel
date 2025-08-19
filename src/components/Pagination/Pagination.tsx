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
                        className="flex items-center justify-center px-3 h-8 leading-tight border"
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
                        className="flex items-center justify-center px-3 h-8 leading-tight border"
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
                const pageNumber = index + 1; // số trang thực tế (vì index bắt đầu từ 0)

                // -------------------------
                // TH1: currentPage nằm gần đầu
                // (<= RANGE*2+1) → hiển thị vài trang đầu, dấu ... ở sau, rồi trang cuối
                // Ví dụ: currentPage=2, RANGE=2, totalPages=10 → [1 2 3 4 ... 9 10]
                if (
                    currentPage <= RANGE * 2 + 1 &&
                    pageNumber > currentPage + RANGE &&
                    pageNumber < totalPages - RANGE + 1
                ) {
                    return renderDotAfter(index);
                }

                // -------------------------
                // TH2: currentPage nằm ở giữa
                // (> RANGE*2+1 và < totalPages - RANGE*2)
                // → có ... ở cả trước và sau
                // Ví dụ: currentPage=5, RANGE=2, totalPages=10 → [1 ... 3 4 5 6 7 ... 10]
                else if (
                    currentPage > RANGE * 2 + 1 &&
                    currentPage < totalPages - RANGE * 2
                ) {
                    // ... ở trước (ẩn các trang cách xa currentPage bên trái)
                    if (pageNumber < currentPage - RANGE && pageNumber > RANGE)
                        return renderDotBefore(index);

                    // ... ở sau (ẩn các trang cách xa currentPage bên phải)
                    if (
                        pageNumber > currentPage + RANGE &&
                        pageNumber < totalPages - RANGE + 1
                    )
                        return renderDotAfter(index);
                }

                // -------------------------
                // TH3: currentPage nằm gần cuối
                // (>= totalPages - RANGE*2) → hiển thị vài trang cuối, dấu ... ở trước, rồi trang đầu
                // Ví dụ: currentPage=9, RANGE=2, totalPages=10 → [1 2 ... 7 8 9 10]
                else if (
                    currentPage >= totalPages - RANGE * 2 &&
                    pageNumber < currentPage - RANGE &&
                    pageNumber > RANGE
                )
                    return renderDotBefore(index);

                // -------------------------
                // Nếu không rơi vào 3 TH trên → render nút số trang bình thường
                return (
                    <button
                        key={index}
                        disabled={currentPage === pageNumber} // disable nếu là trang hiện tại
                        className={classNames(
                            "flex items-center justify-center px-4 h-10 leading-tight rounded-md",
                            {
                                // Style khác nhau giữa trang hiện tại và trang thường
                                "bg-[#135846] text-white ":
                                    currentPage === pageNumber, // trang hiện tại highlight
                                "bg-primary border-[#135846] border-2 hover:text-white hover:bg-[#135846] text-[#135846]":
                                    currentPage !== pageNumber, // trang thường
                            }
                        )}
                        onClick={() => onPageChange(pageNumber)} // đổi trang
                    >
                        {pageNumber}
                    </button>
                );
            });
    }
    return (
        <nav className={className}>
            <div className="text-white">
                <p>{`Showing page ${currentPage} of ${totalPages}`}</p>
            </div>
            <div className="flex items-center gap-3 h-8 text-sm">
                {currentPage > 1 && (
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="flex items-center justify-center px-3 h-10 leading-tight rounded-md bg-primary border-[#135846] border-2 hover:text-white hover:bg-[#135846] text-[#135846]"
                    >
                        <AiOutlineArrowLeft />
                    </button>
                )}
                {renderPagination()}
                {currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="flex items-center justify-center px-3 h-10 leading-tight rounded-md  bg-primary border-[#135846] border-2 hover:text-white hover:bg-[#135846] text-[#135846]"
                    >
                        <AiOutlineArrowRight />
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Pagination;
