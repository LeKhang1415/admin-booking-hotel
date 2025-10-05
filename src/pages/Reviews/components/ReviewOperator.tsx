import FilterSelect from "../../../components/FilterSelect";
import useUrl from "../../../hooks/useUrl";

function ReviewOperator() {
    const { currentValue: sort, handler: setSort } = useUrl<string>({
        field: "sort",
        defaultValue: "",
    });

    const { currentValue: rating, handler: setRating } = useUrl<string>({
        field: "rating",
        defaultValue: "",
    });
    return (
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
                <span className="font-medium text-md text-text/70">
                    Sort by:
                </span>
                <FilterSelect
                    value={sort ?? ""}
                    onChange={(value) => setSort(value || undefined)}
                    options={[
                        { label: "Most recent", value: "-createdAt" },
                        { label: "Oldest", value: "createdAt" },
                        { label: "Highest rating", value: "-rating" },
                        { label: "Lowest rating", value: "rating" },
                    ]}
                    placeholder="All"
                    className="w-48"
                />
            </div>

            <div className="flex items-center gap-4">
                <span className="font-medium text-md text-text/70">
                    Sort by:
                </span>
                <FilterSelect
                    value={rating ?? ""}
                    onChange={(value) => setRating(value || undefined)}
                    options={[
                        { label: "⭐ 5 stars", value: "5" },
                        { label: "⭐ 4 stars and above", value: "4" },
                        { label: "⭐ 3 stars and above", value: "3" },
                        { label: "⭐ 2 stars and above", value: "2" },
                        { label: "⭐ 1 stars and above", value: "1" },
                    ]}
                    placeholder="All ratings"
                />
            </div>
        </div>
    );
}

export default ReviewOperator;
