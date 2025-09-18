import { useState, useEffect } from "react";
import useTypeRoom from "../hooks/useTypeRoom";
import { RoomStatus } from "../../../types/room.types";
import FilterSelect from "../../../components/FilterSelect";
import FilterInput from "../../../components/FilterInput";
import FilterRadio from "../../../components/FilterRadio";
import Modal from "../../../components/Modal";
import { useSearchParams } from "react-router-dom";
import Button from "../../../components/Button";
import { capitalizeFirst } from "../../../utils/utils";

export default function FilterRooms({ close }: { close?: () => void }) {
    const { typeRoom } = useTypeRoom();
    const [searchParams, setSearchParams] = useSearchParams();

    // State tạm thời để lưu filter values
    const [tempFilters, setTempFilters] = useState<Record<string, string>>({});

    // Initialize tempFilters từ current searchParams
    useEffect(() => {
        const currentFilters = Object.fromEntries(searchParams.entries());
        setTempFilters(currentFilters);
    }, [searchParams]);

    // Options cho status
    const statusOpts = Object.values(RoomStatus).map((s) => ({
        label: capitalizeFirst(s),
        value: s,
    }));

    // Options cho typeRoom (lấy từ API)
    const typeRoomOpts =
        typeRoom?.map((tr) => ({ label: tr.name, value: tr.id })) || [];

    const priceTypeOpts = [
        { label: "Hour", value: "hour" },
        { label: "Day", value: "day" },
    ];

    // Handle thay đổi filter value
    const handleFilterChange = (field: string, value: string) => {
        setTempFilters((prev) => {
            if (!value || value === "") {
                const newFilters = { ...prev };
                delete newFilters[field];
                return newFilters;
            }
            return { ...prev, [field]: value };
        });
    };

    // Reset toàn bộ filter
    const handleReset = () => {
        setTempFilters({});
        close?.();
    };

    // Apply filters khi nhấn OK
    const handleOk = () => {
        console.log("Applying filters:", tempFilters);
        setSearchParams(tempFilters);
        close?.();
    };

    return (
        <>
            <Modal.Header>Filter Rooms</Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Status dùng radio */}
                    <FilterRadio
                        label="Status"
                        options={statusOpts}
                        value={tempFilters.status || ""}
                        onChange={(value) =>
                            handleFilterChange("status", value)
                        }
                    />

                    {/* Room type vẫn dùng select */}
                    <FilterSelect
                        label="Room Type"
                        options={typeRoomOpts}
                        value={tempFilters.typeRoomId || ""}
                        onChange={(value) =>
                            handleFilterChange("typeRoomId", value)
                        }
                    />

                    <FilterInput
                        label="Number of People"
                        value={tempFilters.numberOfPeople || ""}
                        onChange={(value) =>
                            handleFilterChange("numberOfPeople", value)
                        }
                    />

                    {/* PriceType dùng radio */}
                    <FilterRadio
                        label="Price Type"
                        options={priceTypeOpts}
                        value={tempFilters.priceType || ""}
                        onChange={(value) =>
                            handleFilterChange("priceType", value)
                        }
                    />

                    {/* Input filter */}
                    <FilterInput
                        label="Min Price"
                        value={tempFilters.minPrice || ""}
                        onChange={(value) =>
                            handleFilterChange("minPrice", value)
                        }
                    />

                    <FilterInput
                        label="Max Price"
                        value={tempFilters.maxPrice || ""}
                        onChange={(value) =>
                            handleFilterChange("maxPrice", value)
                        }
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* Reset button */}
                <Button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Reset All
                </Button>

                {/* OK button để apply filters */}
                <Button type="button" onClick={handleOk}>
                    Apply Filters
                </Button>
            </Modal.Footer>
        </>
    );
}
